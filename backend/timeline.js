import OpenAI from "openai";
import { openai_key } from "./key.js";

const openai = new OpenAI({
  apiKey: openai_key, // Replace with your actual API key
});

export async function generatePartyEvents(description) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a party planner assistant." },
        { role: "user", content: `Generate a list of events for the following party: ${description}` },
      ],
      functions: [
        {
          name: 'generate_events',
          description: 'Generates a list of events for a party based on the given description',
          parameters: {
            type: 'object',
            properties: {
              events: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    title: { type: 'string' },
                    description: { type: 'string' },
                    startTime: { type: 'string' },
                    endTime: { type: 'string' },
                  },
                  required: ['id', 'title', 'startTime', 'endTime'],
                },
              },
            },
            required: ['events'],
          },
        },
      ],
      function_call: { name: 'generate_events' },
    });

    const functionCall = completion.choices[0].message.function_call;
    if (functionCall && functionCall.name === 'generate_events') {
      console.log('Generating events');
      console.log(completion.choices[0].message.content);
      return JSON.parse(functionCall.arguments).events;
    }

    console.error('Unexpected response format');
    return null;
  } catch (error) {
    console.error('Error generating party events:', error);
    return null;
  }
}

