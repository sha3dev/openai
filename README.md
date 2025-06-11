
# OpenAI TypeScript Client

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/openai.svg?style=for-the-badge)](https://www.npmjs.com/package/openai)

A modern, type-safe TypeScript client for interacting with the OpenAI API. This library provides a clean, intuitive interface for working with OpenAI's powerful language models, including GPT-4 and others.

## ✨ Features

- **Type-Safe** - Built with TypeScript for enhanced developer experience
- **Simple API** - Clean, intuitive methods for common operations
- **Flexible Configuration** - Customize model parameters and token limits
- **Promise-based** - Async/await support for all operations
- **Comprehensive Error Handling** - Clear error messages and status codes

## 🚀 Quick Start

### Installation

```bash
npm install @your-org/openai
# or
yarn add @your-org/openai
```

### Basic Usage

```typescript
import { OpenAI } from '@your-org/openai';

// Initialize the client
const openai = new OpenAI({
  apikey: 'your-api-key',
  model: 'gpt-4',
  systemPrompt: 'You are a helpful assistant.',
  maxNumberOfInputTokens: 4096,
  maxNumberOfOutputTokens: 1024
});

// Process a prompt
async function getResponse() {
  try {
    const response = await openai.processPrompt("Tell me about TypeScript", {
      temperature: 0.7,
      user: 'user-123'
    });
    
    console.log(response);
  } catch (error) {
    console.error('Error processing prompt:', error);
  }
}

getResponse();
```

## 📖 Documentation

### Initialization

```typescript
const openai = new OpenAI({
  apikey: string;                 // Required: Your OpenAI API key
  systemPrompt?: string;          // Optional: Initial system prompt
  model: string;                  // Required: Model to use (e.g., 'gpt-4')
  maxNumberOfInputTokens?: number; // Optional: Max input tokens (default: 4096)
  maxNumberOfOutputTokens?: number; // Optional: Max output tokens (default: 1024)
});
```

### Methods

#### `loadSystemPrompt(prompt: string): void`
Loads a system prompt and encodes it into tokens.

#### `processPrompt(prompt: string, options: ProcessPromptOptions): Promise<ProcessPromptResponse>`
Processes a user prompt and returns the model's response.

### Types

#### `ProcessPromptOptions`
```typescript
{
  temperature?: number;           // Controls randomness (0.0 to 1.0)
  user?: string;                  // Unique user identifier
  // Additional options...
}
```

#### `ProcessPromptResponse`
```typescript
{
  id: string;                    // Completion ID
  created: number;                // Creation timestamp
  model: string;                 // Model used
  choices: Array<{
    message: CompletionMessage;
    finish_reason: string;
    index: number;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}
```

## 🔧 Configuration

### Environment Variables

```env
OPENAI_API_KEY=your_api_key_here
OPENAI_DEFAULT_MODEL=gpt-4
```

### Runtime Configuration

All configuration options can be passed to the constructor or set via environment variables.

## 💡 Examples

### Chat Completion

```typescript
const response = await openai.processPrompt("What's the weather like?", {
  temperature: 0.8,
  max_tokens: 150
});
```

### Streaming Responses

```typescript
// Example of streaming implementation would go here
// This depends on your specific streaming requirements
```

## 📊 Pricing

Pricing is based on the official OpenAI pricing model. For the most up-to-date information, refer to:

- [OpenAI Pricing](https://openai.com/pricing)
- [Pricing Data Source](https://raw.githubusercontent.com/outl1ne/openai-pricing/refs/heads/main/pricing.json)

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for their amazing API
- The TypeScript community for their support
- All contributors who help improve this project
