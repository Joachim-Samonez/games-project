import express from "express";
import {
  updateUser,
  deleteUser,
  getUserReviews,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/review/:id", verifyToken, getUserReviews);

export default router;
