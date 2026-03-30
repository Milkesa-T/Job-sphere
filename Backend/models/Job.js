import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: false,
    },
    salaryRange: {
      type: String,
      required: false,
    },
    minSalary: {
      type: Number,
      required: false,
    },
    maxSalary: {
      type: Number,
      required: false,
    },
    tags: [
      {
        type: String,
      },
    ],
    logo: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: [
      {
        type: String,
      },
    ],
    experienceLevel: {
      type: String,
      required: false,
    },
    postedAt: {
      type: String,
      default: () => new Date().toLocaleDateString(),
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
