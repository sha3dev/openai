export default {
  models: {
    "o4-mini": {
      input: 1.1,
      cachedInput: 0.275,
      output: 4.4,
    },
    "gpt-4.1": {
      input: 2.0,
      cachedInput: 0.5,
      output: 8.0,
      batchDiscount: 0.5,
    },
    "gpt-4.1-mini": {
      input: 0.4,
      cachedInput: 0.1,
      output: 1.6,
      batchDiscount: 0.5,
    },
    "gpt-4.1-nano": {
      input: 0.1,
      cachedInput: 0.025,
      output: 0.4,
      batchDiscount: 0.5,
    },
    "gpt-4.5-preview": {
      input: 75,
      cachedInput: 37.5,
      output: 150,
      batchDiscount: 0.5,
    },
    "gpt-4o": {
      input: 2.5,
      cachedInput: 1.25,
      output: 10,
      batchDiscount: 0.5,
    },
    "gpt-4o-audio-preview": {
      input: 2.5,
      output: 10,
    },
    "gpt-4o-realtime-preview": {
      input: 5,
      cachedInput: 2.5,
      output: 20,
    },
    "gpt-4o-mini": {
      input: 0.15,
      cachedInput: 0.075,
      output: 0.6,
      batchDiscount: 0.5,
    },
    "gpt-4o-mini-audio-preview": {
      input: 0.15,
      output: 0.6,
    },
    "gpt-4o-mini-realtime-preview": {
      input: 0.6,
      cachedInput: 0.3,
      output: 2.4,
    },
    o1: {
      input: 15,
      cachedInput: 7.5,
      output: 60,
      batchDiscount: 0.5,
    },
    "o1-pro": {
      input: 150,
      output: 600,
    },
    o3: {
      input: 10,
      cachedInput: 2.5,
      output: 40,
    },
    "o3-mini": {
      input: 1.1,
      cachedInput: 0.55,
      output: 4.4,
      batchDiscount: 0.5,
    },
    "o1-mini": {
      input: 1.1,
      cachedInput: 0.55,
      output: 4.4,
      batchDiscount: 0.5,
    },
    "codex-mini-latest": {
      input: 1.5,
      cachedInput: 0.375,
      output: 6.0,
    },
    "gpt-4o-mini-search-preview": {
      input: 0.15,
      output: 0.6,
    },
    "gpt-4o-search-preview": {
      input: 2.5,
      output: 10,
    },
    "computer-use-preview": {
      input: 3,
      output: 12,
      batchDiscount: 0.5,
    },
    "gpt-image-1": {
      input: 5,
      cachedInput: 1.25,
    },
    "chatgpt-4o-latest": {
      input: 5,
      output: 15,
    },
    "gpt-4-turbo": {
      input: 10,
      output: 30,
    },
    "gpt-4": {
      input: 30,
      output: 60,
    },
    "gpt-4-32k": {
      input: 60,
      output: 120,
    },
    "gpt-3.5-turbo": {
      input: 0.5,
      output: 1.5,
    },
    "gpt-3.5-turbo-instruct": {
      input: 1.5,
      output: 2,
    },
    "gpt-3.5-turbo-16k-0613": {
      input: 3,
      output: 4,
    },
    "davinci-002": {
      input: 2,
      output: 2,
    },
    "babbage-002": {
      input: 0.4,
      output: 0.4,
    },
  },
  "flex-processing": {
    o3: {
      input: 5,
      cachedInput: 1.25,
      output: 20,
    },
    "o4-mini": {
      input: 0.55,
      cachedInput: 0.138,
      output: 2.2,
    },
  },
  "audio-tokens": {
    "gpt-4o-audio-preview": {
      input: 40,
      output: 80,
    },
    "gpt-4o-mini-audio-preview": {
      input: 10,
      output: 20,
    },
    "gpt-4o-realtime-preview": {
      input: 40,
      cachedInput: 2.5,
      output: 80,
    },
    "gpt-4o-mini-realtime-preview": {
      input: 10,
      cachedInput: 0.3,
      output: 20,
    },
  },
  "image-tokens": {
    "gpt-image-1": {
      input: 10,
      cachedInput: 2.5,
      output: 40,
    },
  },
  "fine-tuning": {
    "o4-mini-2025-04-16": {
      training: 100,
      input: 4,
      cachedInput: 1,
      output: 16,
    },
    "o4-mini-2025-04-16-data-sharing": {
      training: 100,
      input: 2,
      cachedInput: 0.5,
      output: 8,
    },
    "gpt-4.1-2025-04-14": {
      training: 25,
      input: 3,
      cachedInput: 0.75,
      output: 12,
    },
    "gpt-4.1-mini-2025-04-14": {
      training: 5,
      input: 0.8,
      cachedInput: 0.2,
      output: 3.2,
    },
    "gpt-4.1-nano-2025-04-14": {
      training: 1.5,
      input: 0.2,
      cachedInput: 0.05,
      output: 0.8,
    },
    "gpt-4o-2024-08-06": {
      training: 25,
      input: 3.75,
      cachedInput: 1.875,
      output: 15,
    },
    "gpt-4o-mini-2024-07-18": {
      training: 3,
      input: 0.3,
      cachedInput: 0.15,
      output: 1.2,
    },
    "gpt-3.5-turbo": {
      training: 8,
      input: 3,
      output: 6,
    },
    "davinci-002": {
      training: 6,
      input: 12,
      output: 12,
    },
    "babbage-002": {
      training: 0.4,
      input: 1.6,
      output: 1.6,
    },
  },
  tools: {
    "code-interpreter": {
      cost: 0.03,
    },
    "file-search-storage": {
      cost: 0.1,
    },
    "file-search-tool": {
      cost: 2.5,
    },
    "web-search": {
      "gpt-4.1": {
        low: 30,
        medium: 35,
        high: 50,
      },
      "gpt-4o": {
        low: 30,
        medium: 35,
        high: 50,
      },
      "gpt-4o-search-preview": {
        low: 30,
        medium: 35,
        high: 50,
      },
      "gpt-4.1-mini": {
        low: 25,
        medium: 27.5,
        high: 30,
      },
      "gpt-4o-mini": {
        low: 25,
        medium: 27.5,
        high: 30,
      },
      "gpt-4o-mini-search-preview": {
        low: 25,
        medium: 27.5,
        high: 30,
      },
    },
  },
  transcription_speech: {
    text_tokens: {
      "gpt-4o-mini-tts": {
        input: 0.6,
        estimated_cost_per_minute: 0.015,
      },
      "gpt-4o-transcribe": {
        input: 2.5,
        output: 10,
        estimated_cost_per_minute: 0.006,
      },
      "gpt-4o-mini-transcribe": {
        input: 1.25,
        output: 5,
        estimated_cost_per_minute: 0.003,
      },
    },
    audio_tokens: {
      "gpt-4o-mini-tts": {
        output: 12,
        estimated_cost_per_minute: 0.015,
      },
      "gpt-4o-transcribe": {
        input: 6,
        estimated_cost_per_minute: 0.006,
      },
      "gpt-4o-mini-transcribe": {
        input: 3,
        estimated_cost_per_minute: 0.003,
      },
    },
  },
  embedding: {
    "text-embedding-3-small": 0.02,
    "text-embedding-3-large": 0.13,
    "text-embedding-ada-002": 0.1,
  },
  image: {
    "gpt-image-1": {
      "low-1024-1024": 0.011,
      "low-1024-1536": 0.016,
      "low-1536-1024": 0.016,
      "medium-1024-1024": 0.042,
      "medium-1024-1536": 0.063,
      "medium-1536-1024": 0.063,
      "high-1024-1024": 0.167,
      "high-1024-1536": 0.25,
      "high-1536-1024": 0.25,
    },
    "dall-e-3": {
      "standard-1024-1024": 0.04,
      "standard-1024-1792": 0.08,
      "standard-1792-1024": 0.08,
      "hd-1024-1024": 0.08,
      "hd-1024-1792": 0.12,
      "hd-1792-1024": 0.12,
    },
    "dall-e-2": {
      "1024-1024": 0.02,
      "512-512": 0.018,
      "256-256": 0.016,
    },
  },
  audio: {
    whisper: 0.006,
    tts: 15,
    "tts-hd": 30,
  },
};
