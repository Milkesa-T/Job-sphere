import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggleSaveJob } from "../store/jobSlice";

interface SavedJobCardProps {
  job: any; // Allow Mongo payload shape
}

export default function SavedJobCard({ job }: SavedJobCardProps) {
  const dispatch = useDispatch();
  const id = job._id || job.id;

  return (
    <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 border border-gray-100 dark:border-slate-700 relative group hover:border-blue-200 dark:hover:border-blue-900/50 transition-all">
      <button
        onClick={() => dispatch(toggleSaveJob(id))}
        className="absolute top-2 right-2 text-gray-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
      >
        <X size={16} />
      </button>

      <Link to={`/job/${id}`}>
        <h4 className="font-bold text-gray-900 dark:text-gray-100 text-sm mb-1 group-hover:text-primary transition-colors pr-6">
          {job.title}
        </h4>
      </Link>
      <p className="text-xs text-gray-500 dark:text-slate-400 mb-2">{job.company}</p>

      <div className="flex items-center justify-between text-[10px] font-bold">
        <span className="text-gray-400 dark:text-slate-500 uppercase tracking-wider">
          {job.type}
        </span>
        <span className="text-primary">
          {job.currency === "USD" ? "$" : job.currency}
          {job.salaryRange || job.salary?.toLocaleString() || "Competitive"}
        </span>
      </div>
    </div>
  );
}
