import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Job from "./models/Job.js";

dotenv.config();

connectDB();

const dummyJobs = [
  {
    title: "Senior Frontend Engineer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA (Remote)",
    type: "Full-time",
    salaryRange: "$120,000 - $160,000",
    description:
      "We are looking for an experienced Frontend Engineer to lead development of our core web applications using React and TypeScript.",
    requirements: [
      "5+ years of experience with React",
      "Strong TypeScript skills",
      "Experience with state management (Redux/Zustand)",
      "Understanding of web performance optimization",
    ],
    postedAt: "2 days ago",
  },
  {
    title: "Backend Developer",
    company: "DataFlow Systems",
    location: "New York, NY",
    type: "Full-time",
    salaryRange: "$110,000 - $140,000",
    description:
      "Join our backend team to build scalable microservices using Node.js and Python. You will be working on high-throughput data pipelines.",
    requirements: [
      "3+ years of Node.js experience",
      "Experience with PostgreSQL and Redis",
      "Understanding of microservices architecture",
      "Familiarity with Docker and Kubernetes",
    ],
    postedAt: "1 week ago",
  },
  {
    title: "UI/UX Designer",
    company: "Creative Minds Agency",
    location: "London, UK (Hybrid)",
    type: "Contract",
    salaryRange: "$80 - $120 / hr",
    description:
      "Looking for a talented UI/UX designer to help redesign our flagship e-commerce platform. Must have a strong portfolio demonstrating clean, modern design.",
    requirements: [
      "Expert in Figma",
      "Experience with design systems",
      "Strong understanding of user-centered design principles",
      "Basic HTML/CSS knowledge is a plus",
    ],
    postedAt: "3 days ago",
  },
  {
    title: "DevOps Engineer",
    company: "CloudScale Inc.",
    location: "Austin, TX",
    type: "Full-time",
    salaryRange: "$130,000 - $170,000",
    description:
      "Help us build and maintain our cloud infrastructure on AWS. You'll be responsible for CI/CD pipelines, monitoring, and infrastructure as code.",
    requirements: [
      "Experience with AWS (EC2, S3, RDS, ECS)",
      "Proficiency in Terraform or CloudFormation",
      "Strong Linux administration skills",
      "Experience with CI/CD tools (Jenkins, GitHub Actions)",
    ],
    postedAt: "5 hours ago",
  },
];

const importData = async () => {
  try {
    await Job.deleteMany(); // Clear out old jobs if any

    await Job.insertMany(dummyJobs); // Insert the dummy data
    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData(); // just an option
} else {
  importData();
}
