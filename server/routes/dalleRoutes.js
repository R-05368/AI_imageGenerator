import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


router.route('/').post(async (req, res) => {
  try {
    const response = await openai.createImage({
      prompt: "a white siamese cat",
      n: 1,
      size: "1024x1024",
    });
    

    const image = response.data.data[0].url;
    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res.status(500).send(error?.response.data.error.message || 'Something went wrong');
  }
});

export default router;