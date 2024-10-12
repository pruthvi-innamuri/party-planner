{
    "guests_list": {
      "type": "array",
      "description": "List of guests attending the party",
      "items": {
        "type": "object",
        "properties": {
          "guestId": {
            "type": "string",
            "description": "Unique identifier for the guest"
          },
          "name": {
            "type": "string",
            "description": "Full name of the guest"
          },
          "phone": {
            "type": "string",
            "description": "Phone number of the guest"
          },
          "Invite Sent": {
            "type": "boolean",
            "description": "RSVP status of the guest"
          }
        },
        "required": ["guestId", "name"]
      }
    },
    "playlist": {
      "type": "array",
      "description": "List of songs to be played at the party",
      "items": {
        "type": "object",
        "properties": {
          "trackId": {
            "type": "string",
            "description": "Unique identifier for the track"
          },
          "title": {
            "type": "string",
            "description": "Title of the song"
          },
          "artist": {
            "type": "string",
            "description": "Artist of the song"
          },
          "album": {
            "type": "string",
            "description": "Album of the song"
          },
          "duration": {
            "type": "string",
            "description": "Duration of the song (e.g., '3:45')"
          },
          "genre": {
            "type": "string",
            "description": "Genre of the song"
          },
          "requestedBy": {
            "type": "string",
            "description": "Name of the person who requested the song"
          }
        },
        "required": ["trackId", "title", "artist", "duration"]
      }
    },
    "timeline": {
      "type": "object",
      "description": "Timeline and details of the party",
      "properties": {
        "partyType": {
          "type": "string",
          "description": "Type of the party (e.g., birthday, wedding)"
        },
        "theme": {
          "type": "string",
          "description": "Theme of the party, if any"
        },
        "date": {
          "type": "string",
          "description": "Date of the party (YYYY-MM-DD)"
        },
        "startTime": {
          "type": "string",
          "description": "Start time of the party (HH:MM AM/PM)"
        },
        "endTime": {
          "type": "string",
          "description": "End time of the party (HH:MM AM/PM)"
        },
        "numberOfGuests": {
          "type": "number",
          "description": "Approximate number of guests"
        },
        "activities": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "description": "List of planned activities"
        },
        "location": {
          "type": "string",
          "description": "Location where the party will be held"
        },
        "events": {
          "type": "array",
          "description": "Scheduled events during the party",
          "items": {
            "type": "object",
            "properties": {
              "eventId": {
                "type": "string",
                "description": "Unique identifier for the event"
              },
              "title": {
                "type": "string",
                "description": "Title of the event"
              },
              "description": {
                "type": "string",
                "description": "Detailed description of the event"
              },
              "startTime": {
                "type": "string",
                "description": "Start time of the event (HH:MM AM/PM)"
              },
              "endTime": {
                "type": "string",
                "description": "End time of the event (HH:MM AM/PM)"
              }
            },
            "required": ["eventId", "title", "startTime", "endTime"]
          }
        }
      },
      "required": ["startTime", "endTime", "numberOfGuests", "activities"]
    },
    "venues": {
      "type": "array",
      "description": "List of potential venues for the party",
      "items": {
        "type": "object",
        "properties": {
          "venueId": {
            "type": "string",
            "description": "Unique identifier for the venue"
          },
          "name": {
            "type": "string",
            "description": "Name of the venue"
          },
          "address": {
            "type": "string",
            "description": "Physical address of the venue"
          },
          "capacity": {
            "type": "number",
            "description": "Maximum capacity of the venue"
          },
          "amenities": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "Amenities provided by the venue"
          },
          "availability": {
            "type": "array",
            "items": {
              "type": "string",
              "description": "Available dates/times (YYYY-MM-DD HH:MM AM/PM)"
            },
            "description": "Venue's availability"
          },
          "contactInfo": {
            "type": "object",
            "properties": {
              "contactName": {
                "type": "string",
                "description": "Contact person's name"
              },
              "phone": {
                "type": "string",
                "description": "Contact phone number"
              },
              "email": {
                "type": "string",
                "description": "Contact email address"
              }
            },
            "required": ["contactName", "phone"]
          },
          "price": {
            "type": "number",
            "description": "Rental price of the venue"
          },
          "notes": {
            "type": "string",
            "description": "Additional notes about the venue"
          }
        },
        "required": ["venueId", "name", "address", "capacity"]
      }
    }
  }
  

