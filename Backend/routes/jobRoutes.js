import express from "express";
import { getJobs, getJobById, createJob, updateJob } from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getJobs).post(protect, createJob);
router.route("/:id").get(getJobById).put(protect, updateJob);

export default router;
