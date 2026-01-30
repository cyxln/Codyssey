import "./load_env";

export async function exaSearch(query: string): Promise<any> {
    // Get environment variables
    const EXA_API_KEY = process.env.EXA_API_KEY;
    const ENDPOINT = "https://api.exa.ai/search";

    const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": EXA_API_KEY!,
        },
        body: JSON.stringify({
            query: query,
            userLocation: "PH",
            numResults: 15,
            contents: {
                text: false,
                highlights: true,
                summaries: true
            }
        }),
    });

    if (!response.ok) {
        console.error("EXA Search API error:", response.status, response.statusText);
        return "Search unavailable";
    }

    const responseData = await response.json();

    // Only grab title, url, highlights, and summary.
    const constructedResults = responseData.results.map((item: any) => ({
        title: item.title,
        url: item.url,
        highlights: item.highlights,
        summary: item.summaries,
    }));

    return JSON.stringify({ results: constructedResults });
}
