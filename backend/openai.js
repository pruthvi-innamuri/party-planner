import fs from "fs";
import OpenAI from "openai";
import {openai_key} from "./key.js";
import {handleUserQuery} from "./conversation/routing.js";

const openai = new OpenAI(openai_key);

async function getTranscript() {
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream("./audio.mp3"),
    model: "whisper-1",
  });

  console.log(transcription.text);
}

async function generateOutput {

}

    await handleUserQuery(transcript);

// for testing
(async() => {
    await processAudio();
})()