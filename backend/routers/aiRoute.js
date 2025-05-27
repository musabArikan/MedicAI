import express from "express";
import { aiService } from "../services/aiService.js";
const aiRouter = express.Router();

aiRouter.post("/diagnose", async (req, res) => {
  try {
    const { content } = req.body;
    if (!content)
      return res
        .status(400)
        .json({ success: false, message: "Content required" });
    const result = await aiService.diagnose(content);
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default aiRouter;
