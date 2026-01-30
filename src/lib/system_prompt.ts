export const OPENAI_SYSTEM_PROMPT = `
You are a Philippine Location Risk Assessment and Hazard Mapping tool specialized to synthesize information based on the fetched results.
Your goal is:
- Checks vulnerability of an area
- Predict incoming disaster
- Suggest steps on what to do if ever a disaster comes in

You'll recieve one of the following data from the user context
1. User prompt - The user's input such as city or a text description of their location provided
2. Web results: Location - A general overview of the user's specified location in the Philippines.
3. Web results: Past Incidents of the location - If there is a relevant news result about past incidents in the specified location, it will be provided here.
4. Web results: Weather - The current weather conditions of the specified location.
5. Web results: General News - Latest news articles related to the specified location.

Rules when providing information:
- Score the risk level from 1 to 5, where 1 is minimal risk and 5 is extreme risk.
  score: int[1-5]
- Score description
  score_description: enum
    "MINIMAL_RISK" - No significant risk detected - this is score 1
    "LOW_RISK" - Low risk, minor precautions recommended - this is score 2
    "MODERATE_RISK" - Moderate risk, stay alert and prepare - this is score 3
    "HIGH_RISK" - High risk, take safety measures seriously - this is score 4
    "SEVERE_RISK" - Severe risk, immediate action required - this is score 5
- Location overview
  location_overview: string
- Vulnerabilities and upcoming disasters from weather results and past incidents
  vulnerabilities: string
- Suggested Precautionary Steps
  precautionary_steps: string[]
- Area is allowed to visit?
  is_area_allowed_to_visit: enum
    "YES" - Area is safe to visit
    "REROUTE" - Area has some risks, consider rerouting
    "AVOID" - Area is unsafe, avoid visiting
- Sources - List of relevant web sources
  sources: string[]
`;

export const OPENAI_STRUCTURED_RESPONSE_SCHEMA = {
  type: "json_schema",
  json_schema: {
    name: "ph_location_risk_assessment",
    strict: true,
    schema: {
      type: "object",
      additionalProperties: false,
      properties: {
        score: {
          type: "integer",
          minimum: 1,
          maximum: 5,
        },
        score_description: {
          type: "string",
          enum: [
            "MINIMAL_RISK",
            "LOW_RISK",
            "MODERATE_RISK",
            "HIGH_RISK",
            "SEVERE_RISK",
          ],
        },
        location_overview: {
          type: "string",
        },
        vulnerabilities: {
          type: "string",
        },
        precautionary_steps: {
          type: "array",
          items: { type: "string" },
        },
        is_area_allowed_to_visit: {
          type: "string",
          enum: ["YES", "REROUTE", "AVOID"],
        },
        sources: {
            type: "array",
            items: { type: "string" },
        },
      },
      required: [
        "score",
        "score_description",
        "location_overview",
        "vulnerabilities",
        "precautionary_steps",
        "is_area_allowed_to_visit",
        "sources"
      ]
    }
  },
} as const;

export const WEB_SEARCH_QUERYGEN_SCHEMA = {
  type: "json_schema",
  json_schema: {
    name: "web_search",
    strict: true,
    schema: {
      type: "object",
      additionalProperties: false,
      properties: {
        query: {
            type: "string",
        },
      },
      required: [
        "query",
      ]
    }
  },
} as const;

export const PROMPT_REFUSAL_SCHEMA = {
  type: "json_schema",
  json_schema: {
    name: "prompt_ph_location_query_requirement",
    strict: true,
    schema: {
      type: "object",
      additionalProperties: false,
      properties: {
        throw_error: {
            type: "boolean"
        }
      },
      required: [
        "throw_error",
      ]
    }
  },
} as const;

