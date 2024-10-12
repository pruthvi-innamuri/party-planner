import OpenAI from "openai";
import { openai_key } from "./key.js";

const openai = new OpenAI({
  apiKey: openai_key, // Replace with your actual API key
});

// Define the function schema
const functions = [
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
              id: { type: 'string', description: 'Unique identifier for the event' },
              title: { type: 'string', description: 'Title of the event' },
              description: { type: 'string', description: 'Detailed description of the event' },
              startTime: { type: 'string', description: 'Start time of the event' },
              endTime: { type: 'string', description: 'End time of the event' },
            },
            required: ['id', 'title', 'startTime', 'endTime'],
          },
        },
      },
      required: ['events'],
    },
  },
];

async function generatePartyEvents(partyDescription) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { 
          role: "system", 
          content: "You are a party planner assistant."
        },
        { 
          role: "user", 
          content: `Generate a list of events for the following party: ${partyDescription}`
        },
      ],
      functions: functions,
      function_call: { name: 'generate_events' },
    });

    const message = completion.choices[0].message;

    if (message.function_call) {
      const args = message.function_call.arguments;
      const parsedArgs = JSON.parse(args);
      return parsedArgs.events;
    } else {
      console.error('No function_call in response');
      return null;
    }
  } catch (error) {
    console.error('Error generating party events:', error);
    return null;
  }
}

// Example usage
const partyDescription = "A summer beach party for 50 people, starting at 4 PM and ending at 10 PM. Include activities like volleyball, barbecue, and a bonfire. I want the volleyball portion to be twice as long as the barbequeue.";

generatePartyEvents(partyDescription)
  .then(events => {
    if (events) {
      console.log(events);
      // You can use setEvents(events) here if you're using this in a React component
    } else {
      console.error('Failed to generate events.');
    }
  })
  .catch(error => console.error('Error:', error));
