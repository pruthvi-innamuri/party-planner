// Import the axios library using ES module syntax
import axios from 'axios';
import { telnyxApiKey } from './key.js';

// Define the Telnyx API key

// Define your Telnyx phone number
const fromNumber = '+19103124147'; // Replace with your Telnyx phone number

// Define the contacts
const contacts = [
  {
    name: 'Francesco Crivelli',
    phone: '+15107017501'
  },
  {
    name: 'Joel Jaison',
    phone: '+14084761753'
  },
  {
    name: 'Pruthvi',
    phone: '+15105054274'
  }
];

// Function to send personalized messages
async function sendMessages() {
  for (const contact of contacts) {
    // Create a personalized message
    const messageText = `Hey There! How's it going? My birthday is coming up and you're invited to the party on Saturday at 7 PM at my place. Let me know if you can make it!`;

    // Define the request payload
    const messageData = {
      from: fromNumber,      // Your Telnyx phone number
      to: contact.phone,     // The recipient's phone number
      text: messageText
    };

    try {
      // Send the POST request to the Telnyx API
      const response = await axios.post('https://api.telnyx.com/v2/messages', messageData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${telnyxApiKey}`
        }
      });
      console.log(`Message sent successfully to ${contact.name}:`, response.data);
    } catch (error) {
      console.error(`Error sending message to ${contact.name}:`, error.response ? error.response.data : error.message);
    }
  }
}

// Message: ()
// Call the function to send messages
sendMessages();


