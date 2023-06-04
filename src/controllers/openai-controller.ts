import { Request, Response } from "express";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const generateIcon = async (req: Request, res: Response) => {
  const { prompt, size, iconStyle, color, iconShape } = req.body;
  const imageSize =
    size === "small" ? "256x256" : size === "medium" ? "512x512" : "1024x1024";
  const finalPrompt = `a modern ${iconShape} icon in ${color} of a ${prompt}, ${iconStyle}, high quality, trending on art station, unreal engine graphics quality`;
  try {
    const reponse = await openai.createImage({
      prompt: finalPrompt,
      n: 1,
      size: imageSize,
    });
    const imageUrl = reponse.data.data[0].url;
    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "The image could not be generated.",
    });
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
};
export const generateImage = async (req: Request, res: Response) => {
  const { prompt, imageStyle } = req.body;

  const finalPrompt = `an image of a ${prompt}, in ${imageStyle} style, high quality, trending on art station, unreal engine graphics quality`;
  try {
    const reponse = await openai.createImage({
      prompt: finalPrompt,
      n: 1,
      size: "1024x1024",
    });
    const imageUrl = reponse.data.data[0].url;
    res.status(200).json({
      success: true,
      imageUrl,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "The image could not be generated.",
    });
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
};

export const generateText = async (req: Request, res: Response) => {
  try {
    const reponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: req.body,
    });
    const chatGPTMessage = reponse.data.choices[0].message;
    res.status(200).json({
      success: true,
      text: chatGPTMessage,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "The message could not be generated.",
    });
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
};
