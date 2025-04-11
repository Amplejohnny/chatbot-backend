import express from "express";
import Content from "../models/content.schema.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    //check if title and text are not empty
    if (!data.title || !data.text)
      return res.status(400).send("Title and text are required");

    // Check if title and text are within the character limits
    if (data.title.length > 100 || data.text.length > 1000)
      return res.status(400).send("Title or text exceeds character limits");

    // Check if content with the same title already exists
    if (await Content.exists({ title: data.title }))
      return res.status(409).send("Content with this title already exists"); //status 409 Conflict

    const content = await Content.create(data);
    res.status(201).json(content);
  } catch (error) {
    res.status(500).json({ error: "Failed to create content" });
  }
});

router.get("/", async (req, res) => {
  try {
    const contents = await Content.find();
    res.json(contents);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch content" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) return res.status(404).send("Content not found");
    const data = req.body;
    content.set(data);
    await content.save();
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: "Failed to update content" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const content = await Content.findByIdAndDelete(req.params.id);
    if (!content) return res.status(404).send("Content not found");
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete content" });
  }
});

export default router;
