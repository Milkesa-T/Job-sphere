import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  saveJob,
  unsaveJob,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.put("/profile", protect, updateProfile);
router.post("/save-job/:id", protect, saveJob);
router.delete("/save-job/:id", protect, unsaveJob);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resettoken", resetPassword);

export default router;
