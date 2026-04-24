import {
  OPENAI_SYSTEM_PROMPT,
  OPENAI_STRUCTURED_RESPONSE_SCHEMA,
  WEB_SEARCH_QUERYGEN_SCHEMA,
  PROMPT_REFUSAL_SCHEMA,
} from "@/lib/system_prompt";
import { generateResponse } from "@/lib/openai";
import { getLocationNameFromCoordinates } from "@/lib/openstreetmap_determine_coordinates";
import { exaSearch } from "@/lib/exa_search";

export const runtime = "nodejs";

type RefusalResult = {
  throw_error: boolean;
};

type PredictBody = {
  userLocation?: string;
  detectedCoordinates?: {
    latitude?: number;
    longitude?: number;
  };
};

export async function POST(request: Request) {
  try {
    let parsedBody: PredictBody = {};
    const rawBody = await request.text();
    if (rawBody) {
      try {
        parsedBody = JSON.parse(rawBody) as PredictBody;
      } catch {
        return Response.json({ error: "Invalid JSON body." }, { status: 400 });
      }
    }

    const { userLocation, detectedCoordinates } = parsedBody;

    let resolvedLocation: string | null = userLocation ?? null;
    const latitude = detectedCoordinates?.latitude;
    const longitude = detectedCoordinates?.longitude;
    const hasCoordinates =
      typeof latitude === "number" && typeof longitude === "number";

    if (hasCoordinates) {
      resolvedLocation = await getLocationNameFromCoordinates(
        latitude,
        longitude
      );
    }

    if (!resolvedLocation && hasCoordinates) {
      resolvedLocation = `Coordinates near ${latitude}, ${longitude} in the Philippines`;
    }

    if (!resolvedLocation) {
      return Response.json({ error: "Missing location input." }, { status: 400 });
    }

    if (userLocation) {
      const refusalRaw = await generateResponse(
        `Determine if the following query is a valid location within the Philippines and not a random off-topic query, any general location including just "Cebu" or "sa bulakan bulacan" is accepted: "${resolvedLocation}".`,
        undefined,
        PROMPT_REFUSAL_SCHEMA
      );

      let throwError = false;
      if (refusalRaw) {
        try {
          const refusalParsed = JSON.parse(refusalRaw) as RefusalResult;
          throwError = refusalParsed.throw_error === true;
        } catch (error) {
          console.error("Failed to parse refusal response:", error);
        }
      }

      if (throwError) {
        return Response.json(
          { error: "Invalid or off-topic location query." },
          { status: 400 }
        );
      }
    }

    const locationQueryRaw = await generateResponse(
      `Generate a concise web search query for a general location overview of "${resolvedLocation}" in the Philippines.`,
      undefined,
      WEB_SEARCH_QUERYGEN_SCHEMA
    );
    let locationQuery = `${resolvedLocation} location overview`;
    if (locationQueryRaw) {
      try {
        const parsed = JSON.parse(locationQueryRaw) as { query?: string };
        if (parsed?.query) {
          locationQuery = parsed.query;
        }
      } catch (error) {
        console.error("Failed to parse location query:", error);
      }
    }
    const userLocationInfo = await exaSearch(locationQuery);

    const incidentsQueryRaw = await generateResponse(
      `Generate a concise web search query for past incidents or disasters in "${resolvedLocation}" in the Philippines.`,
      undefined,
      WEB_SEARCH_QUERYGEN_SCHEMA
    );
    let incidentsQuery = `${resolvedLocation} past incidents`;
    if (incidentsQueryRaw) {
      try {
        const parsed = JSON.parse(incidentsQueryRaw) as { query?: string };
        if (parsed?.query) {
          incidentsQuery = parsed.query;
        }
      } catch (error) {
        console.error("Failed to parse incidents query:", error);
      }
    }
    const pastIncidents = await exaSearch(incidentsQuery);

    const weatherQueryRaw = await generateResponse(
      `Generate a concise web search query for the latest weather in "${resolvedLocation}" in the Philippines.`,
      undefined,
      WEB_SEARCH_QUERYGEN_SCHEMA
    );
    let weatherQuery = `${resolvedLocation} weather today`;
    if (weatherQueryRaw) {
      try {
        const parsed = JSON.parse(weatherQueryRaw) as { query?: string };
        if (parsed?.query) {
          weatherQuery = parsed.query;
        }
      } catch (error) {
        console.error("Failed to parse weather query:", error);
      }
    }
    const weatherCurrent = await exaSearch(weatherQuery);

    const newsQueryRaw = await generateResponse(
      `Generate a concise web search query for the latest general news about "${resolvedLocation}" in the Philippines.`,
      undefined,
      WEB_SEARCH_QUERYGEN_SCHEMA
    );
    let newsQuery = `${resolvedLocation} latest news`;
    if (newsQueryRaw) {
      try {
        const parsed = JSON.parse(newsQueryRaw) as { query?: string };
        if (parsed?.query) {
          newsQuery = parsed.query;
        }
      } catch (error) {
        console.error("Failed to parse news query:", error);
      }
    }
    const generalNewsArea = await exaSearch(newsQuery);

    const constructedPrompt = {
      resolvedLocation,
      userLocationInfo,
      pastIncidents,
      weatherCurrent,
      generalNewsArea,
    };

    const constructedPromptString = JSON.stringify(constructedPrompt);

    const synthesizedResponse = await generateResponse(
      `Synthesize the risk assessment from this JSON:\n${constructedPromptString}`,
      OPENAI_SYSTEM_PROMPT,
      OPENAI_STRUCTURED_RESPONSE_SCHEMA
    );

    return Response.json({
      constructedPrompt: constructedPromptString,
      synthesizedResponse,
    });
  } catch (error) {
    console.error("Failed to process predict request:", error);
    return Response.json({ error: "Something went wrong." }, { status: 500 });
  }
}
