import express, { Request, Response } from "express";
import { generateImage, generateText } from "../controllers/openai-controller";
const router = express.Router();

router.post("/generate-chat", generateText);
router.post("/generate-icon", generateImage);

export default router;
