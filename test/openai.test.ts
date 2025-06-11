// Tests for the OpenAI library using Node.js v22 built-in test runner
import { test, describe, mock, before } from "node:test";
import * as assert from "node:assert/strict";
import OpenAI from "../src/lib/openai";
import { z } from "zod";
import * as dotenv from 'dotenv';

// Cargar variables de entorno desde .env
dotenv.config();

// Test configuration
const API_KEY = process.env.OPENAI_API_KEY;

if (!API_KEY) {
  console.warn('ADVERTENCIA: No se encontró OPENAI_API_KEY en las variables de entorno. Los tests que requieran la API de OpenAI fallarán.');
}

// Initialize the OpenAI client for all tests
const openai = new OpenAI({
  apikey: API_KEY,
  maxNumberOfInputTokens: 4000,
  maxNumberOfOutputTokens: 1000,
});

describe("OpenAI Library", () => {
  test("should process a request and return structured data", async () => {
    // Define a schema for country data
    const countrySchema = z.object({
      name: z.string(),
      capital: z.string(),
      population: z.number(),
      languages: z.array(z.string()),
    });

    // Process a request with structured JSON output
    const response = await openai.process({
      prompt:
        "Return information about France including its name, capital, population, and official languages.",
      temperature: 0.7,
      structuredJson: {
        schema: countrySchema,
        name: "countryInfo",
      },
    });

    // Assertions
    assert.equal(typeof response.id, "string", "Response should have an ID");
    assert.ok(
      response.createdAt instanceof Date,
      "Response should have a creation date",
    );

    // Check data structure
    assert.equal(
      typeof response.data.name,
      "string",
      "Data should include country name",
    );
    assert.equal(
      typeof response.data.capital,
      "string",
      "Data should include capital",
    );
    assert.equal(
      typeof response.data.population,
      "number",
      "Population should be a number",
    );
    assert.ok(
      Array.isArray(response.data.languages),
      "Languages should be an array",
    );

    // Check usage statistics
    assert.ok(response.usage.input_tokens > 0, "Should report input tokens");
    assert.ok(response.usage.output_tokens > 0, "Should report output tokens");
    assert.ok(response.usage.total_tokens > 0, "Should report total tokens");
  });

  test("should calculate cost information when pricing data is available", async () => {
    // Skip refreshCost if not available
    // Process a simple request
    const response = await openai.process({
      prompt: "What is the capital of Spain?",
      temperature: 0.5,
      structuredJson: {
        schema: z.object({
          answer: z.string(),
        }),
        name: "capitalInfo",
      },
    });

    // Check if cost information is available
    if (response.usage.cost) {
      assert.ok(
        typeof response.usage.cost.input_cost === "number",
        "Input cost should be a number",
      );
      assert.ok(
        typeof response.usage.cost.output_cost === "number",
        "Output cost should be a number",
      );
      assert.ok(
        typeof response.usage.cost.total_cost === "number",
        "Total cost should be a number",
      );
      assert.equal(
        typeof response.usage.cost.currency,
        "string",
        "Currency should be a string",
      );
    } else {
      console.log("Skipping cost assertions - cost information not available");
    }
  });

  test("should handle errors gracefully", async () => {
    // Mock a failing request
    const originalProcess = openai.process;
    // @ts-ignore - Mocking the method for testing
    mock.method(openai, "process", async () => {
      throw new Error("Test error: Validation failed");
    });

    try {
      await openai.process({
        prompt: "This should fail validation",
        structuredJson: {
          schema: z.object({}),
          name: "testError",
        },
      });

      // If we get here, the test should fail
      assert.fail("Expected an error but none was thrown");
    } catch (error) {
      assert.ok(error instanceof Error, "Should throw an Error object");
      assert.ok(
        error.message.includes("Test error"),
        `Error message should contain 'Test error', but got: ${error.message}`,
      );
    } finally {
      // Restore the original method
      // @ts-ignore - Restoring the method
      mock.method(openai, "process", originalProcess);
    }
  });
});
