import OpenAI from "openai";
import {openai_key} from "./key.js";

const openai = new OpenAI(openai_key);

const generateTheme = async (themeDescription) => {
  try {
    // Generate the image from OpenAI
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: themeDescription,
    });

    // Extract the URL of the generated image
    const imageUrl = response.data[0].url;
    console.log(imageUrl);
  } catch (error) {
    console.error('Error generating or saving the image:', error);
  }
};

// Generate the theme and save the image
generateTheme("Create a party invite with a tropical theme");
