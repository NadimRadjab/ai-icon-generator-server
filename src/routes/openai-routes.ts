import express, { Request, Response } from "express";
import { generateImage } from "../controllers/openai-controller";
const router = express.Router();

router.post("/generate-icon", generateImage);

export default router;
