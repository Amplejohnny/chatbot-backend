import express from "express";
import Content from "../models/content.schema.js";
import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    const contents = await Content.find();
    const match = contents.find((content) =>
      message.toLowerCase().includes(content.title.toLowerCase())
    );
    if (match) {
      return res.json({ reply: match.text });
    }
    // Fallback to OpenAI
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-o3-mini",
      messages: [{ role: "user", content: message }],
      max_tokens: 100,
    });

    const generated = aiResponse.choices[0]?.message?.content;

    if (!generated) {
      return res.status(500).json({
        error: "No response from AI model",
        reply: "AI model did not return a valid response",
      });
    }
    res.json({ reply: generated });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({
      error: "Error calling OpenAI",
      reply: "There was a problem generating a response. Please try again.",
    });
  }
});

export default router;
