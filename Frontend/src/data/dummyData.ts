export interface Job {
  id?: string;
  _id?: string;
  title: string;
  type: string;
  salary?: number;
  salaryRange?: string;
  description: string;
  company: string;
  logo?: string;
  isBookMarked?: boolean;
  location: string;
  experienceLevel?: string;
  currency?: string;
  postedAt: string;
  tags?: string[];
  requirements?: string[];
  minSalary?: number;
  maxSalary?: number;
}

export const dummyJobs: Job[] = [
  {
    id: "1",
    title: "Software Engineer",
    type: "Full-time",
    salary: 95000,
    description:
      "Develop and maintain web applications. Collaborate with cross-functional teams to define, design, and ship new features.",
    company: "Google",
    logo: "https://logo.clearbit.com/google.com",
    isBookMarked: false,
    location: "San Francisco, USA (Remote)",
    experienceLevel: "Mid Level",
    currency: "USD",
    postedAt: "2 days ago",
    tags: ["Remote", "Full-time", "$95k - $120k"],
  },
  {
    id: "2",
    title: "Product Designer",
    type: "Full-time",
    salary: 85000,
    description:
      "Design user-centered interfaces for web and mobile applications. Create wireframes and high-fidelity prototypes.",
    company: "Figma",
    logo: "https://logo.clearbit.com/figma.com",
    isBookMarked: true,
    location: "New York, USA",
    experienceLevel: "Senior",
    currency: "USD",
    postedAt: "1 day ago",
    tags: ["On-site", "Full-time", "$85k - $110k"],
  },
  {
    id: "3",
    title: "Frontend Developer",
    type: "Contract",
    salary: 70000,
    description:
      "Build cutting-edge user interfaces using React and TailwindCSS. Optimize applications for maximum speed.",
    company: "Vercel",
    logo: "https://logo.clearbit.com/vercel.com",
    isBookMarked: false,
    location: "Remote",
    experienceLevel: "Junior",
    currency: "USD",
    postedAt: "5 hours ago",
    tags: ["Remote", "Contract", "$70k"],
  },
  {
    id: "4",
    title: "Backend Engineer",
    type: "Full-time",
    salary: 110000,
    description: "Design and implement scalable microservices using Node.js and Go. Optimize database performance.",
    company: "Netflix",
    logo: "https://logo.clearbit.com/netflix.com",
    isBookMarked: false,
    location: "Los Gatos, CA",
    experienceLevel: "Senior",
    currency: "USD",
    postedAt: "4 days ago",
    tags: ["On-site", "Full-time", "$110k - $150k"],
  },
  {
    id: "5",
    title: "Mobile App Developer",
    type: "Part-time",
    salary: 60000,
    description: "Develop cross-platform mobile applications using Flutter or React Native.",
    company: "Uber",
    logo: "https://logo.clearbit.com/uber.com",
    isBookMarked: false,
    location: "Remote",
    experienceLevel: "Mid Level",
    currency: "USD",
    postedAt: "1 week ago",
    tags: ["Remote", "Part-time", "$60k"],
  },
  {
    id: "6",
    title: "Data Scientist",
    type: "Full-time",
    salary: 125000,
    description: "Build machine learning models to solve complex business problems. Analyze large datasets.",
    company: "Meta",
    logo: "https://logo.clearbit.com/meta.com",
    isBookMarked: false,
    location: "Menlo Park, CA",
    experienceLevel: "Senior",
    currency: "USD",
    postedAt: "3 days ago",
    tags: ["Hybrid", "Full-time", "$125k - $170k"],
  },
  {
    id: "7",
    title: "DevOps Engineer",
    type: "Full-time",
    salary: 105000,
    description: "Automate infrastructure deployment and manage CI/CD pipelines. Ensure system reliability.",
    company: "Amazon",
    logo: "https://logo.clearbit.com/amazon.com",
    isBookMarked: false,
    location: "Seattle, WA",
    experienceLevel: "Mid Level",
    currency: "USD",
    postedAt: "12 hours ago",
    tags: ["On-site", "Full-time", "$105k - $140k"],
  },
  {
    id: "8",
    title: "UI/UX Designer",
    type: "Freelance",
    salary: 50,
    description: "Create stunning visual designs and user experiences for various web projects.",
    company: "Dribbble",
    logo: "https://logo.clearbit.com/dribbble.com",
    isBookMarked: false,
    location: "Remote",
    experienceLevel: "Junior",
    currency: "USD/hr",
    postedAt: "6 hours ago",
    tags: ["Remote", "Freelance", "$50/hr"],
  },
];
