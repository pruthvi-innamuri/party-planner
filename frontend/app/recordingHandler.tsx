import { useState, useRef } from 'react';
import { openai_key } from './keys';

export const recordingHandler = (mediaRecorderRef: React.MutableRefObject<MediaRecorder | null>, streamRef: React.MutableRefObject<MediaStream | null>, chunksRef: React.MutableRefObject<Blob[]>, isAgentActive: boolean, setIsAgentActive: (value: boolean) => void) => {
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