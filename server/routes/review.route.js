import express from "express";
import {
  createReview,
  deleteReview,
  updateReview,
  getReview,
} from "../controllers/review.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createReview);
router.delete("/delete/:id", verifyToken, deleteReview);
router.delete("/update/:id", verifyToken, updateReview);
router.get("/get/:id", getReview);

export default router;
