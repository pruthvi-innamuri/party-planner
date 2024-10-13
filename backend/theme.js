import OpenAI from "openai";
import { openai_key } from "./key.js";

const openai = new OpenAI({ apiKey: openai_key });

export async function generateTheme(themeDescription) {
  try {
    // Generate the image from OpenAI
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: themeDescription,
    });

    // Extract the URL of the generated image
    const imageUrl = response.data[0].url;
    return imageUrl;
    console.log(imageUrl);
  } catch (error) {
    console.error('Error generating or saving the image:', error);
  }
};

