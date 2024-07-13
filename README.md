
# Project README

## Overview
This project provides a TypeScript implementation to interact with OpenAI's API. It includes configuration settings and a library for processing prompts. The key functionalities include setting system prompts, processing user prompts, and handling OpenAI API interactions.

## Modules and Public Methods

### lib/openai.ts
This module is the core component for interacting with OpenAI's API. It includes methods to load system prompts and process user prompts.

#### Public Methods
- **constructor(options: { apikey: string; systemPrompt?: string; model: string; maxNumberOfInputTokens?: number; maxNumberOfOutputTokens?: number })**
  - Initializes the OpenAI client with the provided API key, system prompt, model, and token limits.
  
- **loadSystemPrompt(prompt: string)**
  - Loads a system prompt and encodes it into tokens. Logs the process and checks for token length constraints.
  
- **async processPrompt(prompt: string, options: ProcessPromptOptions)**
  - Processes a given user prompt asynchronously. It checks the prompt length, compiles messages, calls the OpenAI API for completions, and handles the response. The method also parses the response into JSON format.

#### Types
- **CompletionMessage**
  - Represents a message in the completion process with roles like system, user, and assistant.
  
- **ProcessPromptOptions**
  - Provides options for processing prompts, including temperature, user identifier, and token replacement details.
  
- **ProcessPromptResponse**
  - Represents the response from processing a prompt, including the completion ID, creation date, JSON response, and token usage details.

### config.ts
This module provides configuration settings for the project.

#### Configuration
- **OPENAI_DEFAULT_MODEL**
  - Default model for OpenAI, configurable through environment variables.

### index.ts
This module serves as the entry point for the project.

#### Exported Components
- **OpenAI**
  - The main export from the library, allowing users to initialize and utilize the OpenAI client.

## How to Use
1. Ensure you have the required dependencies installed.
2. Import the necessary modules in your TypeScript files.
3. Utilize the public methods as per your requirements.

### Example Usage
```typescript
import OpenAI from './lib/openai';

const openai = new OpenAI({
  apikey: 'your-api-key',
  systemPrompt: 'Your system prompt here',
  model: 'gpt-4',
  maxNumberOfInputTokens: 4096,
  maxNumberOfOutputTokens: 1024
});

openai.loadSystemPrompt("Your system prompt here");
const response = await openai.processPrompt("Your user prompt here", { temperature: 0.7 });

console.log(response);
```

## Installation
To install the dependencies, run:
```sh
npm install
```

## Contributing
Feel free to contribute to this project by creating pull requests or raising issues.

## License
This project is licensed under the MIT License.
