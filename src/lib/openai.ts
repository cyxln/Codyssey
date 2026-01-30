import "./load_env";
import OpenAI from "openai";

const openAI = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY!,
    baseURL: "https://openrouter.ai/api/v1",
})
const defaultModel = "openai/gpt-5-mini";

export async function generateResponse(
    prompt: string,
    systemPrompt?: string,
    structuredResponseSchema?: OpenAI.ResponseFormatJSONSchema,
){
    const rawResponse = await openAI.chat.completions.create({
        model: defaultModel,
        messages: [
            { role: "system", content: systemPrompt ?? "You are a helpful assistant." },
            { role: "user", content: prompt }
        ],
        response_format: structuredResponseSchema,
        reasoning_effort: "minimal"
    });
    return rawResponse.choices[0].message.content;
}
