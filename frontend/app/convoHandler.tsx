import { useState } from 'react';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export const useConversation = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'system', content: 'You are a helpful party planning assistant.' }
  ]);

  const sendMessage = async (userMessage: string) => {
    // Add user message to the conversation
    const updatedMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(updatedMessages);

    try {
      const response = await fetch('/api/conversation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from the server');
      }

      const data = await response.json();
      const assistantMessage = data.message;

      // Add assistant's response to the conversation
      setMessages([...updatedMessages, { role: 'assistant', content: assistantMessage }]);

      return assistantMessage;
    } catch (error) {
      console.error('Error in conversation:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return { messages, sendMessage };
};
