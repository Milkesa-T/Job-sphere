import {
  ArrowLeft,
  Bookmark,
  Briefcase,
  Clock,
  DollarSign,
  MapPin,
  Star,
  Users,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import SavedJobCard from "../components/SavedJobCard";
import { toggleSaveJob, applyToJobThunk, fetchJobs, saveJobThunk, unsaveJobThunk } from "../store/jobSlice";
import { type RootState, type AppDispatch } from "../store/store";

export default function JobDetails() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { jobs, auth, status: jobStatus } = useSelector((state: RootState) => state.job);
  const [isApplying, setIsApplying] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);

  const job = jobs.find((j) => (j as any)._id === id || j.id === id);
  const otherJobs = jobs.filter((j) => (j as any)._id !== id && j.id !== id).slice(0, 3);

  useEffect(() => {
    if (jobs.length === 0) {
      dispatch(fetchJobs());
    }
  }, [dispatch, jobs.length]);
  const handleApply = async () => {
    if (!auth.isAuthenticated) {
      alert("Please login to apply for this job");
      return;
    }
    
    const jobId = (job as any)._id || job?.id || "";
    console.log("Applying for Job ID:", jobId);
    
    setIsApplying(true);
    try {
      await dispatch(applyToJobThunk({ jobId })).unwrap();
      setApplySuccess(true);
      alert("Application submitted successfully!");
    } catch (error: any) {
      console.error("Application error:", error);
      alert(error || "Failed to submit application");
    } finally {
      setIsApplying(false);
    }
  };

  const isSaved = auth.user?.savedJobs?.some((sJob: any) => 
    (typeof sJob === 'object' ? sJob._id : sJob) === ((job as any)?._id || job?.id)
  ) || job?.isBookMarked;

  const handleToggleSave = () => {
    if (!auth.isAuthenticated) {
      alert("Please login to save jobs.");
      return;
    }
    const jobId = (job as any)._id || job?.id;
    if (isSaved) {
      dispatch(unsaveJobThunk(jobId));
      dispatch(toggleSaveJob(jobId)); // Keep optimistic UI update working
    } else {
      dispatch(saveJobThunk(jobId));
      dispatch(toggleSaveJob(jobId));
    }
  };


  if (!job) {
    if (jobStatus === "loading") {
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-500 font-medium">Finding job details...</p>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold">Job not found</h2>
        <Link to="/" className="text-primary mt-4 flex items-center gap-2">
          <ArrowLeft size={20} /> Back to Search
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-slate-950 min-h-screen pb-20 transition-colors duration-300">
      {/* Header / Cover Area */}
      <div className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 pt-8 pb-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors text-sm font-bold mb-8"
          >
            <ArrowLeft size={16} /> BACK TO SEARCH
          </Link>

          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="flex gap-6 w-full">
              <div className="w-20 h-20 rounded-2xl bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-3 flex items-center justify-center flex-shrink-0">
                <img
                  src={job.logo || "https://logo.clearbit.com/techcrunch.com"}
                  alt={job.company}
                  className="w-full h-full object-contain dark:brightness-90"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-gray-600 dark:text-slate-400 font-bold">{job.company}</h4>
                  <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-500 px-2 py-0.5 rounded text-[10px] font-bold">
                    <Star size={10} fill="currentColor" /> 4.8
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-gray-100 mb-4">
                   {job.title}
                </h1>

                <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-slate-400 font-medium">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={16} className="text-gray-400 dark:text-slate-500" />{" "}
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Briefcase size={16} className="text-gray-400 dark:text-slate-500" /> {job.type}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={16} className="text-gray-400 dark:text-slate-500" /> Posted{" "}
                    {job.postedAt}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users size={16} className="text-gray-400 dark:text-slate-500" /> 124 Applicants
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <button
                onClick={handleToggleSave}
                className={`flex-1 md:flex-none p-3 rounded-xl border transition-all ${isSaved ? "bg-blue-50 dark:bg-blue-900/30 border-blue-100 dark:border-blue-900/50 text-primary dark:text-blue-400" : "border-gray-200 dark:border-slate-700 text-gray-400 dark:text-slate-500 hover:bg-gray-50 dark:hover:bg-slate-800"}`}
              >
                <Bookmark
                  size={24}
                  fill={isSaved ? "currentColor" : "none"}
                />
              </button>
              <button 
                onClick={handleApply}
                disabled={isApplying || applySuccess}
                className={`flex-1 md:flex-none px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg ${
                  applySuccess ? "bg-green-500 text-white shadow-green-100 dark:shadow-green-900/20" : "bg-primary text-white hover:bg-primary-dark shadow-blue-100 dark:shadow-blue-900/20"
                }`}
              >
                {isApplying ? "Applying..." : applySuccess ? "Applied" : "Apply Now"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-slate-800 transition-colors duration-300">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-l-4 border-primary pl-4">
              Job Description
            </h3>
            <p className="text-gray-600 dark:text-slate-400 leading-relaxed mb-10 whitespace-pre-wrap">
              {job.description} 
              
              We are looking for a dedicated and skilled {job.title} to join our growing team. The ideal candidate will have a passion for innovation and a strong background in their field. You will work closely with other team members to deliver high-quality solutions for our global clients.
            </p>

            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-l-4 border-primary pl-4">
              Key Requirements & Responsibilities
            </h3>
            <ul className="space-y-4 mb-10">
              {job.requirements && job.requirements.length > 0 ? (
                job.requirements.map((item: string, i: number) => (
                  <li key={i} className="flex gap-3 text-gray-600 dark:text-slate-400 italic">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    {item}
                  </li>
                ))
              ) : (
                [
                  "Design user-centered interfaces for web and mobile applications",
                  "Conduct usability testing and gather feedback",
                  "Create wireframes, prototypes, and high-fidelity mockups",
                  "Collaborate with developers and product managers on implementation",
                  "Stay updated with UI/UX trends and industry best practices",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-gray-600 dark:text-slate-400 italic">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    {item}
                  </li>
                ))
              )}
            </ul>

            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-l-4 border-primary pl-4">
              Required Experience
            </h3>
            <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
              Minimum 3+ years of experience in similar roles. Proficiency in
              modern design tools and methodologies. Strong communication skills
              and ability to work in a fast-paced environment.
            </p>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-slate-800 transition-colors duration-300">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
                Job Overview
              </h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-primary dark:text-blue-400">
                    <DollarSign size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 dark:text-slate-500 font-bold uppercase">
                      Salary
                    </p>
                    <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
                      {job.currency === "USD" ? "$" : job.currency}
                      {((job as any).salaryRange || job.salary) || "Competitive"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 dark:text-slate-500 font-bold uppercase">
                      Experience
                    </p>
                    <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
                      {job.experienceLevel || "Mid-Senior Level"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-slate-800 transition-colors duration-300">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
                Related Jobs
              </h3>
              <div className="space-y-4">
                {otherJobs.map((j) => (
                  <SavedJobCard key={(j as any)._id || j.id} job={j} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
