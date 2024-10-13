export const functions = [
    {
      name: "generateTheme",
      description: "Generates a theme for a party based on the given description.",
      parameters: {
        type: "object",
        properties: {
          themeDescription: { type: "string", description: "Theme of the party" },
        },
        required: ["themeDescription"],
      },
    },
    {
      name: "addToPlaylist",
      
    },
    {
        name: 'generatePartyEvents',
        description: 'Generates a list of events and a timeline for a party based on the given description.',
        parameters: {
          type: 'object',
          properties: {
            description: {
                type: 'string',
                description: 'This should be a description of the party that we are planning. We should cover the different activities that we want at the party.'
              },
          },
          required: ['description'],
        }
    },
    {
      name: 'search_places',
      description: 'Searches for venues relevant to a party based on a description and location. ',
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Search query describing the desired type of venues (e.g., \'swimming pools\', \'banquet halls\'). this should be a simplified version of the query.'
          },
          type: {
            type: 'string',
            description: 'Type of establishment to search for (e.g., \'establishment\', \'restaurant\', \'park\').'
          }
        },
        required: ['query', 'type']
      }
    }
    
  ];
  