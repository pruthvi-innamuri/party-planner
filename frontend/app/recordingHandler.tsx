import { useState, useRef } from 'react';
import { openai_key } from './keys';

type Guest = {
  name: string;
  email: string;
}

type Venue = {
  name: string;
  description: string;
}

type Event = {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
}

export const recordingHandler = (mediaRecorderRef: React.MutableRefObject<MediaRecorder | null>, streamRef: React.MutableRefObject<MediaStream | null>, chunksRef: React.MutableRefObject<Blob[]>, isAgentActive: boolean, setIsAgentActive: (value: boolean) => void, setVenues: (value: Venue[]) => void, setEvents: (value: Event[]) => void, setGuestList: (value: Guest[]) => void, setImageUrl: (value: string) => void, setSpotifyPlaylistUrl: (value: boolean) => void) => {
    if (isAgentActive) {
      // Stop recording
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        console.log('Recording stopped');
      }
    } else {
      // Start recording
      if (navigator.mediaDevices?.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(stream => {
            streamRef.current = stream; // Save the stream to stop it later
            const options = { mimeType: 'audio/webm' }; // Or 'audio/ogg' based on support
            const mediaRecorder = new MediaRecorder(stream, options);
            mediaRecorderRef.current = mediaRecorder;
            chunksRef.current = []; // Reset the chunks

            mediaRecorder.ondataavailable = (e) => {
              if (e.data.size > 0) {
                chunksRef.current.push(e.data);
              }
            };

            mediaRecorder.onstop = async () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
                setIsAgentActive(false);
              
                // Stop all tracks to release the microphone
                if (streamRef.current) {
                  streamRef.current.getTracks().forEach(track => track.stop());
                }
              
                const formData = new FormData();
                formData.append('file', blob, 'audio.webm');
                formData.append('model', 'whisper-1');
              
                try {
                  const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
                    method: 'POST',
                    headers: {
                      'Authorization': `Bearer ${openai_key}`,
                    },
                    body: formData,
                  });
              
                  if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Error from OpenAI:', errorData);
                    throw new Error('Failed to transcribe audio');
                  }
              
                  const data = await response.json();
                  // Send the transcribed text to the backend
                  try {
                    const backendResponse = await fetch('http://localhost:3001/plan-party', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ transcription: data.text }),
                    });
                    
                    const backendPayload = await backendResponse.json();
                    console.log('Backend payload:', backendPayload);
                    if (backendPayload.result.name === "search_places") {
                      const formattedVenues = backendPayload.result.result.map((venue: any) => ({
                        name: venue.name,
                        description: venue.address || 'No description available.'
                      }));
                      console.log('Formatted venues:', formattedVenues);
                      setVenues(formattedVenues);
                    } else if (backendPayload.result.name == "generateTheme") {
                      setSpotifyPlaylistUrl(true);
                      const url = backendPayload.result.result;
                      setImageUrl(url);
                    } else if (backendPayload.result.name == "generatePartyEvents") {
                      console.log('Generating events!!!!!!');
                      console.log(backendPayload.result.result);
                      const events = backendPayload.result.result;
                      setEvents(events);
                    }

            
                    console.log('Backend payload:', backendPayload);
                    if (!backendResponse.ok) {
                      throw new Error('Failed to send transcription to backend');
                    }

                  } catch (backendError) {
                    console.error('Error sending transcription to backend:', backendError);
                  }
                  console.log('Transcription:', data.text);
                } catch (error) {
                  console.error('Error transcribing audio:', error);
                }
            };

            mediaRecorder.start();
            setIsAgentActive(true);
            console.log('Recording started');
          })
          .catch(err => {
            console.error('Error accessing the microphone:', err);
          });
      } else {
        console.error('getUserMedia is not supported in this browser');
      }
    }
  };