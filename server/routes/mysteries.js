// server/routes/mysteries.js
import express from "express";
import {
  getAllMysteries,
  getMysteryById,
  getCluesByMysteryId,
  submitAnswer,
  requestHint,
} from "../controllers/mysteryController.js";

const router = express.Router();

// GET /api/mysteries
router.get("/", getAllMysteries);

// GET /api/mysteries/:id
router.get("/:id", getMysteryById);

// GET /api/mysteries/:id/clues
router.get("/:id/clues", getCluesByMysteryId);

router.post("/:id/answers", submitAnswer);

router.patch("/:id/hint", requestHint);

export default router;
