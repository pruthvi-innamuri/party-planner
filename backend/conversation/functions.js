const functions = [
    {
      name: 'parse_party_description',
      description: 'Parses the party description into structured data.',
      parameters: {
        type: 'object',
        properties: {
          partyType: { type: 'string', description: 'Type of the party (e.g., birthday, wedding)' },
          theme: { type: 'string', description: 'Theme of the party, if any' },
          date: { type: 'string', description: 'Date of the party' },
          startTime: { type: 'string', description: 'Start time of the party' },
          endTime: { type: 'string', description: 'End time of the party' },
          numberOfGuests: { type: 'number', description: 'Approximate number of guests' },
          activities: { 
            type: 'array', 
            items: { type: 'string' }, 
            description: 'List of desired activities' 
          },
          location: { type: 'string', description: 'Location of the party' },
        },
        required: ['startTime', 'endTime', 'numberOfGuests', 'activities'], // Specify required fields
      },
    },
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
        }
    },
    {
      "name": "search_places",
      "description": "Searches for venues relevant to a party based on a description and location.",
      "parameters": {
        "type": "object",
        "properties": {
          "latitude": {
            "type": "number",
            "description": "Latitude coordinate of the central search location."
          },
          "longitude": {
            "type": "number",
            "description": "Longitude coordinate of the central search location."
          },
          "query": {
            "type": "string",
            "description": "Search query describing the desired type of venues (e.g., 'swimming pools', 'banquet halls')."
          },
          "type": {
            "type": "string",
            "description": "Type of establishment to search for (e.g., 'establishment', 'restaurant', 'park')."
          }
        },
        "required": ["latitude", "longitude", "query", "type"]
      }
    }
    
  ];
  