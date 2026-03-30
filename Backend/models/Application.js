import mongoose from "mongoose";

const applicationSchema = mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Job",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    resume: {
      type: String,
      required: false, // For now optional
    },
    coverLetter: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "reviewed", "interviewing", "accepted", "rejected"],
      default: "pending",
    },
    feedback: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;
