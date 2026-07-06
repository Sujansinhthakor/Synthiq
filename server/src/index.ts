import express from "express";
import "dotenv/config";
import cors from "cors";
import { processAnimationRequest } from "./utils.js";
import authMiddleware from "./middleware/auth.middleware.js";
import {
  activeUsers,
  renderLimit,
} from "./middleware/renderLimit.middleware.js";
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

// Routes
app.post("/generate", authMiddleware, renderLimit, async (req, res) => {
  const prompt = req.body?.prompt;
  if (prompt.length > 3000) {
    throw new Error("Prompt too large");
  }
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  // Set headers for Server-Sent Events
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  try {
    await processAnimationRequest(prompt, (status, message, data) => {
      const payload = JSON.stringify({ status, message, ...data });
      res.write(`data: ${payload}\n\n`);
    });
    res.end();
  } catch (error) {
    // Error is already send to client via onProgress
    res.end();
  } finally {
    activeUsers.delete(req.user.email);
  }
});

app.listen(8000, () => {
  console.log("Server started on port 8000");
});
