import express from "express";
import {
  getUsers,
  getApplications,
  updateApplicationStatus,
  deleteJob,
  getDashboardStats,
  deleteUser,
} from "../controllers/adminController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.use(admin);

router.route("/users").get(getUsers);
router.route("/users/:id").delete(deleteUser);
router.route("/applications").get(getApplications);
router.route("/applications/:id").put(updateApplicationStatus);
router.route("/jobs/:id").delete(deleteJob);
router.route("/stats").get(getDashboardStats);

export default router;
