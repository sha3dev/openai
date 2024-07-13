/**
 * imports: externals
 */

import OpenAIClient from "openai";
import { encode } from "gpt-3-encoder";
import Logger from "@sha3/logger";

/**
 * imports: internals
 */

import CONFIG from "../config";

/**
 * module: initializations
 */

const logger = new Logger("openai");

/**
 * types
 */

export type CompletionMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type ProcessPromptOptions = {
  temperature?: number;
  user?: string;
  replace?: {
    valueToReplace: string;
    replaceBy?: string | null;
  }[];
};

export type ProcessPromptResponse = {
  id: string;
  createdAt: Date;
  json: any;
  usage: {
    input_tokens: number;
    output_tokens: number;
    total_tokens: number;
  };
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

  private systemPrompt: string | null = null;

  private systemPromptTokens: number | null = null;

  /**
   * constructor
   */

  constructor(
    private options: {
      apikey: string;
      systemPrompt?: string;
      model: string;
      maxNumberOfInputTokens?: number;
      maxNumberOfOutputTokens?: number;
    }
  ) {
    this.client = new OpenAIClient({ apiKey: options.apikey });
    if (options.systemPrompt) {
      this.loadSystemPrompt(options.systemPrompt);
    }
  }

  /**
   * private : methods
   */

  /**
   * public : methods
   */

  public loadSystemPrompt(prompt: string) {
    const tokensLength = encode(prompt).length;
    logger.debug(`loading system prompt (${tokensLength} tokens)`);
    if (
      this.options.maxNumberOfInputTokens &&
      tokensLength > this.options.maxNumberOfInputTokens
    ) {
      throw new Error(
        `system prompt is larger than the max number of input tokens allowed`
      );
    }
    this.systemPromptTokens = tokensLength;
    this.systemPrompt = prompt;
  }

  public async processPrompt(
    prompt: string,
    options: ProcessPromptOptions = {}
  ) {
    let systemPromptToProcess = this.systemPrompt;
    let systemPrompToProcessTokens = this.systemPromptTokens;
    if (systemPromptToProcess && options?.replace?.length) {
      options.replace.forEach((i) => {
        systemPromptToProcess = systemPromptToProcess!.replace(
          i.valueToReplace,
          i.replaceBy || ""
        );
        if (i.replaceBy) {
          const replaceTokens = encode(i.replaceBy).length;
          systemPrompToProcessTokens! += replaceTokens;
        }
      });
    }
    const tokensLength = encode(prompt).length;
    logger.debug(`loading user prompt (${tokensLength} tokens)`);
    if (this.options.maxNumberOfInputTokens) {
      if (
        (systemPrompToProcessTokens || 0) + tokensLength >
        this.options.maxNumberOfInputTokens
      ) {
        throw new Error(
          `prompt (system+user) is larger than the max number of input tokens allowed`
        );
      }
    }
    const messages: CompletionMessage[] = [];
    if (systemPromptToProcess) {
      messages.push({ role: "system", content: systemPromptToProcess });
    }
    messages.push({ role: "user", content: prompt });
    const completion = await this.client.chat.completions.create({
      messages,
      model: this.options.model || CONFIG.OPENAI_DEFAULT_MODEL,
      temperature: options.temperature || 0,
      max_tokens: this.options.maxNumberOfOutputTokens,
      user: options.user,
    });
    const choice = completion?.choices?.[0];
    if (!choice) {
      throw new Error(`choice not found in completion response`);
    }
    if (choice.finish_reason === "length") {
      throw new Error(`completion finished by limits restrictions`);
    }
    if (!choice.message.content) {
      throw new Error(`completion finished without a text response`);
    }
    let json: JSON | null = null;
    try {
      json = JSON.parse(choice.message.content);
    } catch (e: any) {
      throw new Error(`completion response not in JSON format`);
    }
    logger.debug(
      `prompt processed (${completion.usage!.total_tokens} tokens consumed)`
    );
    return {
      id: completion.id,
      createdAt: new Date(completion.created),
      json,
      usage: {
        input_tokens: completion.usage!.prompt_tokens,
        output_tokens: completion.usage!.completion_tokens,
        total_tokens: completion.usage!.total_tokens,
      },
    } as ProcessPromptResponse;
  }
}
