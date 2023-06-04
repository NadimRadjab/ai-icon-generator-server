import express from "express";
import {
  generateIcon,
  generateImage,
  generateText,
} from "../controllers/openai-controller.js";
const router = express.Router();

router.post("/generate-chat", generateText);
router.post("/generate-icon", generateIcon);
router.post("/generate-image", generateImage);

export default router;
