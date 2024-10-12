async function handleUserQuery(userQuery) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "user", content: userQuery },
        ],
        functions: functions,
        function_call: "auto", // Let the model decide which function to call
      });
  
      const message = completion.choices[0].message;
  
      if (message.function_call) {
        const functionName = message.function_call.name;
        const args = message.function_call.arguments;
        const parsedArgs = JSON.parse(args);
  
        console.log(`Function called: ${functionName}`);
        console.log('Arguments:', parsedArgs);
  
        // Handle the function call accordingly
        if (functionName === 'parse_party_description') {
          return handleParsePartyDescription(parsedArgs);
        } else if (functionName === 'generate_events') {
          return handleGenerateEvents(parsedArgs);
        } else {
          console.error('Unknown function called.');
          return null;
        }
      } else {
        // The model didn't call any function
        console.log('Assistant response:', message.content);
        return null;
      }
    } catch (error) {
      console.error('Error handling user query:', error);
      return null;
    }
}

async function callFunctions(toolCalls) {
    const results = [];
  
    // Iterate over each tool call
    for (const toolCall of toolCalls) {
      const functionName = toolCall.function.name;
      const functionArgsString = toolCall.function.arguments;
  
      // Parse the arguments from JSON
      let functionArgs;
      try {
        functionArgs = JSON.parse(functionArgsString);
      } catch (error) {
        console.error(`Error parsing arguments for function ${functionName}:`, error);
        results.push({
          id: toolCall.id,
          error: `Error parsing arguments: ${error.message}`,
        });
        continue;
      }
  
      // Check if the function exists
      const func = functions[functionName];
      if (typeof func === 'function') {
        try {
          // Call the function with the arguments
          const result = await func(functionArgs);
          results.push({
            id: toolCall.id,
            result,
          });
        } catch (error) {
          console.error(`Error calling function ${functionName}:`, error);
          results.push({
            id: toolCall.id,
            error: `Error calling function: ${error.message}`,
          });
        }
      } else {
        console.error(`Function ${functionName} is not defined`);
        results.push({
          id: toolCall.id,
          error: `Function ${functionName} is not defined`,
        });
      }
    }
  
    // Return the results
    return results;
}
  