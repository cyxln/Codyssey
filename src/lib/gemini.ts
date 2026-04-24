import "./load_env";
import {
  FunctionCallingConfigMode,
  GoogleGenAI,
  type FunctionCall,
  type FunctionDeclaration,
  type GenerateContentConfig,
  type GroundingMetadata,
} from "@google/genai";

export const GEMINI_FLASH_MODEL = "gemini-3-flash-preview";
export const GEMMA_GUARDRAIL_MODEL = "gemma-4-26b-a4b-it";

const geminiApiKey = process.env.GEMINI_API_KEY;

let ai: GoogleGenAI | null = null;

type GenerateGeminiContentOptions = {
  model: string;
  prompt: string;
  systemPrompt?: string;
  responseJsonSchema?: unknown;
  tools?: GenerateContentConfig["tools"];
  toolConfig?: GenerateContentConfig["toolConfig"];
  temperature?: number;
};

type GenerateGeminiFunctionCallOptions = {
  model: string;
  prompt: string;
  functionDeclaration: FunctionDeclaration;
  temperature?: number;
};

export type GeminiGenerationResult = {
  text: string;
  groundingMetadata?: GroundingMetadata;
  functionCalls?: FunctionCall[];
};

function getGeminiClient() {
  if (!geminiApiKey) {
    throw new Error("Missing GEMINI_API_KEY environment variable.");
  }

  ai ??= new GoogleGenAI({
    apiKey: geminiApiKey,
  });

  return ai;
}

export async function generateGeminiContent({
  model,
  prompt,
  systemPrompt,
  responseJsonSchema,
  tools,
  toolConfig,
  temperature,
}: GenerateGeminiContentOptions): Promise<GeminiGenerationResult> {
  const client = getGeminiClient();

  const config: GenerateContentConfig = {};

  if (typeof temperature === "number") {
    config.temperature = temperature;
  }

  if (systemPrompt) {
    config.systemInstruction = systemPrompt;
  }

  if (responseJsonSchema) {
    config.responseMimeType = "application/json";
    config.responseJsonSchema = responseJsonSchema;
  }

  if (tools) {
    config.tools = tools;
  }

  if (toolConfig) {
    config.toolConfig = toolConfig;
  }

  const response = await client.models.generateContent({
    model,
    contents: prompt,
    config,
  });

  return {
    text: response.text ?? "",
    groundingMetadata: response.candidates?.[0]?.groundingMetadata,
    functionCalls: response.functionCalls,
  };
}

export async function generateGeminiFunctionCall({
  model,
  prompt,
  functionDeclaration,
  temperature = 0,
}: GenerateGeminiFunctionCallOptions): Promise<FunctionCall | null> {
  const client = getGeminiClient();

  const response = await client.models.generateContent({
    model,
    contents: prompt,
    config: {
      temperature,
      tools: [{ functionDeclarations: [functionDeclaration] }],
      toolConfig: {
        functionCallingConfig: {
          mode: FunctionCallingConfigMode.ANY,
          allowedFunctionNames: [functionDeclaration.name ?? ""],
        },
      },
    },
  });

  return response.functionCalls?.[0] ?? null;
}

export function parseGeminiJson<T>(text: string): T | null {
  if (!text) {
    return null;
  }

  const trimmed = text.trim();

  try {
    return JSON.parse(trimmed) as T;
  } catch {
    // Some guardrail models may wrap JSON in markdown despite instructions.
  }

  const fencedJson = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i)?.[1];
  if (fencedJson) {
    try {
      return JSON.parse(fencedJson.trim()) as T;
    } catch {
      // Fall through to object extraction.
    }
  }

  const objectStart = trimmed.indexOf("{");
  const objectEnd = trimmed.lastIndexOf("}");
  if (objectStart >= 0 && objectEnd > objectStart) {
    try {
      return JSON.parse(trimmed.slice(objectStart, objectEnd + 1)) as T;
    } catch {
      // Fall through to final error.
    }
  }

  console.error("Failed to parse Gemini JSON response:", text);
    return null;
}
