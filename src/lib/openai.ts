/**
 * imports: externals
 */

import Logger from "@sha3/logger";

import OpenAIClient from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { encoding_for_model, TiktokenModel } from "tiktoken";
import { z } from "zod";

/**
 * imports: internals
 */

import CONFIG from "../config";
import MODEL_PRICING from "./openai/model-pricing";

/**
 * module: initializations
 */

const logger = new Logger("openai");

/**
 * types
 */

export type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type StructuredJsonOptions = {
  schema: z.ZodType;
  name?: string;
};

export type ConstructorOptions = {
  apikey?: string;
  model?: string;
  systemPrompt?: string;
  maxNumberOfInputTokens?: number;
  maxNumberOfOutputTokens?: number;
};

export type ProcessOptions = {
  prompt?: string;
  temperature?: number;
  user?: string;
  model?: string;
  structuredJson: StructuredJsonOptions;
};

export type ProcessResponse<T = any> = {
  id: string;
  createdAt: Date;
  data: T;
  rawResponse: any;
  usage: {
    input_tokens: number;
    output_tokens: number;
    total_tokens: number;
    cost?: {
      input_cost: number;
      output_cost: number;
      total_cost: number;
      currency: string;
    };
  };
};

export type ModelPricing = {
  input: number;
  output: number;
  cachedInput?: number;
  batchDiscount?: number;
};

export type ModelCost = {
  input_cost: number;
  output_cost: number;
  total_cost: number;
  currency: string;
};

/**
 * consts
 */

/**
 * export
 */

export default class OpenAI {
  /**
   * private: properties
   */

  private client: OpenAIClient;
  private options: ConstructorOptions;
  private model: TiktokenModel;
  private systemPrompt?: string;
  private systemPromptTokens?: number;

  /**
   * constructor
   */

  constructor(options: ConstructorOptions) {
    const apiKey = options.apikey || process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OpenAI API key not found");
    }
    const model = options.model || CONFIG.OPENAI_DEFAULT_MODEL;
    this.client = new OpenAIClient({ apiKey });
    this.options = options;
    if (!MODEL_PRICING.models[model]) {
      throw new Error(`Model ${model} not found in pricing data`);
    }
    this.model = model as TiktokenModel;
    // Load system prompt if provided
    if (options.systemPrompt) {
      this.loadSystemPrompt(options.systemPrompt);
    }
  }

  private calculateCost(
    inputTokens: number,
    outputTokens: number,
  ): ModelCost | null {
    if (!MODEL_PRICING.models) {
      return null;
    }
    // Find the model pricing data
    const modelPricing = MODEL_PRICING.models[this.model];
    if (!modelPricing) {
      logger.warn(`No pricing data found for model: ${this.model}`);
      return null;
    }
    // Calculate costs in dollars per 1M tokens
    const inputCost = (inputTokens / 1000000) * modelPricing.input;
    const outputCost = (outputTokens / 1000000) * modelPricing.output;
    const totalCost = inputCost + outputCost;

    return {
      input_cost: parseFloat(inputCost.toFixed(6)),
      output_cost: parseFloat(outputCost.toFixed(6)),
      total_cost: parseFloat(totalCost.toFixed(6)),
      currency: "USD",
    };
  }

  /**
   * private : methods
   */

  /**
   * public : methods
   */

  public loadSystemPrompt(prompt: string) {
    const enc = encoding_for_model(this.model);
    const tokensLength = enc.encode(prompt).length;
    enc.free();
    logger.debug(`loading system prompt (${tokensLength} tokens)`);
    if (
      this.options.maxNumberOfInputTokens &&
      tokensLength > this.options.maxNumberOfInputTokens
    ) {
      throw new Error(
        `system prompt is larger than the max number of input tokens allowed`,
      );
    }
    this.systemPromptTokens = tokensLength;
    this.systemPrompt = prompt;
  }

  public async process(options: ProcessOptions) {
    let systemPromptToProcess = this.systemPrompt;
    let systemPrompToProcessTokens = this.systemPromptTokens;
    const enc = encoding_for_model(this.model);
    const tokensLength = enc.encode(options.prompt).length;
    enc.free();
    logger.debug(`loading user prompt (${tokensLength} tokens)`);
    if (this.options.maxNumberOfInputTokens) {
      if (
        (systemPrompToProcessTokens || 0) + tokensLength >
        this.options.maxNumberOfInputTokens
      ) {
        throw new Error(
          `prompt (system+user) is larger than the max number of input tokens allowed`,
        );
      }
    }

    const messages: Message[] = [];

    if (systemPromptToProcess) {
      messages.push({ role: "system", content: systemPromptToProcess });
    }
    messages.push({ role: "user", content: options.prompt });

    try {
      const schema = options.structuredJson.schema;
      const name = options.structuredJson.name || "data";

      const response = await this.client.responses.parse({
        model: this.model,
        input: messages,
        temperature: options.temperature || 0,
        max_output_tokens: this.options.maxNumberOfOutputTokens,
        user: options.user,
        text: {
          format: zodTextFormat(schema, name),
        },
      });

      logger.debug(
        `request processed successfully (${response.usage.total_tokens} tokens consumed)`,
      );

      // Calculate usage metrics based on available properties
      const totalTokens = response.usage.total_tokens;

      // Estimate output tokens if not directly available
      // This is a fallback since the exact structure may vary
      let outputTokens = 0;
      let inputTokens = totalTokens;

      // Use a safer approach to check for output_tokens
      // First convert to unknown, then to Record<string, unknown> to avoid type errors
      const usageRecord = response.usage as unknown as Record<string, unknown>;
      if (
        usageRecord &&
        "output_tokens" in usageRecord &&
        typeof usageRecord.output_tokens === "number"
      ) {
        outputTokens = usageRecord.output_tokens;
        inputTokens = totalTokens - outputTokens;
      }

      // Calculate usage data
      const usageData = {
        input_tokens: inputTokens,
        output_tokens: outputTokens,
        total_tokens: totalTokens,
      };

      // Add cost calculation if pricing data is available
      const costData = this.calculateCost(inputTokens, outputTokens);

      if (costData) {
        usageData["cost"] = costData;
      }

      return {
        id: response.id,
        createdAt: new Date(),
        data: response.output_parsed,
        usage: usageData,
        rawResponse: response,
      } as ProcessResponse;
    } catch (e: any) {
      throw new Error(`Error processing request: ${e.message}`);
    }
  }
}
