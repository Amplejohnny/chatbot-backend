import express from "express";
import Content from "../models/content.schema.js";
import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
const hf = new HfInference(process.env.HF_API_KEY);

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    const contents = await Content.find();
    const match = contents.find((content) =>
      message.toLowerCase().includes(content.title.toLowerCase())
    );

    if (match) {
      res.json({ reply: match.text });
    } else {
      const aiResponse = await hf.textGeneration({
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
        inputs: message,
        max_length: 100,
      });
      if (aiResponse.error) {
        return res.status(500).json({
          error: "I don’t have a specific answer now please check back later",
        });
      }
      res.json({ reply: aiResponse.generated_text });
    }
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Failed to process chat" });
  }
});

export default router;
