import express from "express";
import {
  applyToJob,
  getMyApplications,
} from "../controllers/applicationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.route("/").post(applyToJob);
router.route("/my-applications").get(getMyApplications);

export default router;
