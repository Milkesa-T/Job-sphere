import { Bookmark, Briefcase, MapPin, Share2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleSaveJob } from "../store/jobSlice";

interface JobCardProps {
  job: any; // Using any or an updated Job interface to support Mongo fields
}

export default function JobCard({ job }: JobCardProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = job._id || job.id;

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigating if clicking an interactive button inside the card
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    navigate(`/job/${id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-md dark:hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <div className="w-14 h-14 rounded-xl overflow-hidden border border-gray-100 dark:border-slate-800 flex-shrink-0 bg-gray-50 dark:bg-slate-800 flex items-center justify-center p-2">
            <img
              src={job.logo || "https://logo.clearbit.com/techcrunch.com"}
              alt={job.company}
              className="w-full h-full object-contain dark:brightness-90"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">
              {job.title}
            </h3>
            <p className="text-gray-500 dark:text-slate-400 font-medium">{job.company}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => dispatch(toggleSaveJob(id))}
            className={`p-2 rounded-full transition-colors ${job.isBookMarked ? "bg-blue-50 dark:bg-blue-900/30 text-primary" : "hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-400"}`}
          >
            <Bookmark
              size={20}
              fill={job.isBookMarked ? "currentColor" : "none"}
            />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-400 transition-colors">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.tags && job.tags.map((tag: string, index: number) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-slate-300 text-xs font-semibold rounded-full border border-gray-100 dark:border-slate-700"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="text-gray-600 dark:text-slate-400 text-sm line-clamp-2 mb-6">
        {job.description}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-slate-800">
        <div className="flex items-center gap-4 text-gray-500 dark:text-slate-500 text-sm">
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            {job.location}
          </div>
          <div className="flex items-center gap-1">
            <Briefcase size={14} />
            {job.type}
          </div>
        </div>
        <div className="text-primary font-bold">
          {job.currency === "USD" ? "$" : job.currency}
          {job.salaryRange || job.salary?.toLocaleString() || "Competitive"}
        </div>
      </div>
    </div>
  );
}
