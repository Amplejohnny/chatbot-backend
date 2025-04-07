import express from "express";
import Content from "../models/content.schema.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const data = req.body;
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
