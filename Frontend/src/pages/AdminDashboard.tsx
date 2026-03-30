import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  Users, 
  Briefcase, 
  FileText, 
  Plus, 
  Trash2, 
  CheckCircle, 
  XCircle,
  LayoutDashboard,
  Search,
  ChevronRight
} from "lucide-react";
import { 
  fetchUsersThunk, 
  fetchApplicationsThunk, 
  fetchJobs, 
  deleteJobThunk, 
  updateApplicationStatusThunk,
  createJobThunk,
  getDashboardStatsThunk
} from "../store/jobSlice";
import { type RootState, type AppDispatch } from "../store/store";

export default function AdminDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { admin, jobs } = useSelector((state: RootState) => state.job);
  const [activeTab, setActiveTab] = useState<"overview" | "jobs" | "applications" | "users">("overview");

  // State for creating a new job
  const [showJobModal, setShowJobModal] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    salary: 0,
    description: "",
    experienceLevel: "Junior",
    tags: ""
  });

  useEffect(() => {
    dispatch(fetchJobs());
    dispatch(fetchUsersThunk());
    dispatch(fetchApplicationsThunk());
    dispatch(getDashboardStatsThunk());
  }, [dispatch]);

  const handleDeleteJob = (id: string) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      dispatch(deleteJobThunk(id));
    }
  };

  const handleUpdateStatus = (id: string, status: string, feedback: string) => {
    dispatch(updateApplicationStatusThunk({ id, status, feedback }));
  };

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    const jobData = {
      ...newJob,
      tags: newJob.tags.split(",").map(tag => tag.trim())
    };
    dispatch(createJobThunk(jobData));
    setShowJobModal(false);
    setNewJob({
      title: "",
      company: "",
      location: "",
      type: "Full-time",
      salary: 0,
      description: "",
      experienceLevel: "Junior",
      tags: ""
    });
  };

  const renderOverview = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm flex items-center gap-6 transition-colors">
          <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 text-primary dark:text-blue-400 rounded-2xl flex items-center justify-center">
            <Briefcase size={28} />
          </div>
          <div>
            <p className="text-gray-500 dark:text-slate-500 text-sm font-bold uppercase tracking-wider">Total Jobs</p>
            <h4 className="text-3xl font-black text-gray-900 dark:text-gray-100">{admin.stats?.totalJobs || jobs.length}</h4>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm flex items-center gap-6 transition-colors">
          <div className="w-14 h-14 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-2xl flex items-center justify-center">
            <FileText size={28} />
          </div>
          <div>
            <p className="text-gray-500 dark:text-slate-500 text-sm font-bold uppercase tracking-wider">Applications</p>
            <h4 className="text-3xl font-black text-gray-900 dark:text-gray-100">{admin.stats?.totalApplications || admin.applications.length}</h4>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm flex items-center gap-6 transition-colors">
          <div className="w-14 h-14 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center">
            <Users size={28} />
          </div>
          <div>
            <p className="text-gray-500 dark:text-slate-500 text-sm font-bold uppercase tracking-wider">Total Users</p>
            <h4 className="text-3xl font-black text-gray-900 dark:text-gray-100">{admin.stats?.totalUsers || admin.users.length}</h4>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm flex items-center gap-6 transition-colors">
          <div className="w-14 h-14 bg-orange-50 dark:bg-orange-900/30 text-orange-500 dark:text-orange-400 rounded-2xl flex items-center justify-center">
            <CheckCircle size={28} />
          </div>
          <div>
            <p className="text-gray-500 dark:text-slate-500 text-sm font-bold uppercase tracking-wider">Active Apps</p>
            <h4 className="text-3xl font-black text-gray-900 dark:text-gray-100">{admin.applications.filter((a: any) => a.status !== 'pending').length}</h4>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm p-8 transition-colors">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-gray-900 dark:text-gray-100">Recent Applications</h3>
            <button onClick={() => setActiveTab("applications")} className="text-primary dark:text-blue-400 font-bold text-sm hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {admin.applications.slice(0, 5).map((app: any) => (
              <div key={app._id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center text-gray-400 dark:text-slate-400 border border-gray-100 dark:border-slate-600 font-bold uppercase tracking-tighter text-xs">
                    {app.user?.name?.slice(0, 2) || "U"}
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 dark:text-gray-100">{app.user?.name}</h5>
                    <p className="text-xs text-gray-500 dark:text-slate-500">{app.job?.title} at {app.job?.company}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  app.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' : 
                  app.status === 'accepted' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                  app.status === 'rejected' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                }`}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm p-8 transition-colors">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-gray-900 dark:text-gray-100">Active Jobs</h3>
            <button onClick={() => setActiveTab("jobs")} className="text-primary dark:text-blue-400 font-bold text-sm hover:underline">Manage Jobs</button>
          </div>
          <div className="space-y-4">
            {jobs.slice(0, 5).map((job: any) => (
              <div key={job._id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl">
                <div className="flex items-center gap-4">
                  <img src={job.logo || "https://logo.clearbit.com/techcrunch.com"} className="w-10 h-10 rounded-xl object-contain bg-white dark:bg-slate-700 p-2 border border-gray-100 dark:border-slate-600" />
                  <div>
                    <h5 className="font-bold text-gray-900 dark:text-gray-100">{job.title}</h5>
                    <p className="text-xs text-gray-500 dark:text-slate-500">{job.location} • {job.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                   <ChevronRight size={16} className="text-gray-300 dark:text-slate-600" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderJobs = () => (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm p-8 transition-colors">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100">Manage Job Listings</h3>
          <p className="text-gray-500 dark:text-slate-400 text-sm">Create, edit and remove job postings.</p>
        </div>
        <button 
          onClick={() => setShowJobModal(true)}
          className="bg-primary text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 hover:bg-primary-dark transition-all shadow-lg shadow-blue-100 dark:shadow-primary/20"
        >
          <Plus size={20} /> Post New Job
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-50 dark:border-slate-800">
              <th className="pb-4 font-bold text-gray-400 dark:text-slate-500 text-xs uppercase tracking-widest">Job Title & Company</th>
              <th className="pb-4 font-bold text-gray-400 dark:text-slate-500 text-xs uppercase tracking-widest">Type</th>
              <th className="pb-4 font-bold text-gray-400 dark:text-slate-500 text-xs uppercase tracking-widest">Location</th>
              <th className="pb-4 font-bold text-gray-400 dark:text-slate-500 text-xs uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
            {jobs.map((job: any) => (
              <tr key={job._id} className="group hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-5">
                  <div className="flex items-center gap-3">
                    <img src={job.logo || "https://logo.clearbit.com/techcrunch.com"} className="w-10 h-10 rounded-xl object-contain bg-gray-50 dark:bg-slate-800 p-2 border border-gray-100 dark:border-slate-700" />
                    <div>
                      <h5 className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">{job.title}</h5>
                      <p className="text-xs text-gray-500 dark:text-slate-500">{job.company}</p>
                    </div>
                  </div>
                </td>
                <td className="py-5">
                  <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-primary dark:text-blue-400 text-[10px] font-bold rounded-full border border-blue-100 dark:border-blue-900/50 uppercase">
                    {job.type}
                  </span>
                </td>
                <td className="py-5 text-sm text-gray-600 dark:text-slate-400">{job.location}</td>
                <td className="py-5 text-right">
                  <button 
                  onClick={() => handleDeleteJob(job._id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const [feedbacks, setFeedbacks] = useState<{[key: string]: string}>({});

  const handleFeedbackChange = (id: string, value: string) => {
    setFeedbacks(prev => ({ ...prev, [id]: value }));
  };

  const renderApplications = () => (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm p-8 transition-colors">
      <div className="mb-8">
        <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100">Job Applications</h3>
        <p className="text-gray-500 dark:text-slate-400 text-sm">Review and manage candidate applications.</p>
      </div>

      <div className="space-y-6">
        {admin.applications.map((app: any) => (
          <div key={app._id} className="border border-gray-100 dark:border-slate-800 rounded-3xl p-6 hover:shadow-md dark:hover:shadow-primary/5 transition-all">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 text-primary dark:text-blue-400 rounded-2xl flex items-center justify-center text-xl font-black">
                  {app.user?.name?.slice(0, 1) || "U"}
                </div>
                <div>
                  <h4 className="text-xl font-black text-gray-900 dark:text-gray-100 mb-1">{app.user?.name}</h4>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-slate-400 text-sm font-medium">
                    <Briefcase size={14} className="text-gray-400 dark:text-slate-500" /> Applying for <span className="text-primary dark:text-blue-400 font-bold">{app.job?.title}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 dark:text-slate-500 text-xs mt-1">
                    <FileText size={14} /> Applied on {new Date(app.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 w-full md:w-auto">
                <div className="flex items-center gap-2">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${
                    app.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' : 
                    app.status === 'accepted' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                    app.status === 'rejected' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  }`}>
                    {app.status}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleUpdateStatus(app._id, "accepted", feedbacks[app._id] || "Great profile! We'd like to interview you.")}
                    className="flex-1 bg-green-500 text-white p-2 rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center gap-2 px-4 shadow-sm"
                  >
                    <CheckCircle size={18} /> <span className="text-xs font-bold uppercase">Approve</span>
                  </button>
                  <button 
                    onClick={() => handleUpdateStatus(app._id, "rejected", feedbacks[app._id] || "Thank you for applying. We have decided to move forward with other candidates.")}
                    className="flex-1 bg-red-500 text-white p-2 rounded-xl hover:bg-red-600 transition-colors flex items-center justify-center gap-2 px-4 shadow-sm"
                  >
                    <XCircle size={18} /> <span className="text-xs font-bold uppercase">Reject</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase text-gray-400 dark:text-slate-500 tracking-widest ml-1">Write Feedback / Message</label>
              <textarea 
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-primary/10 resize-none dark:text-gray-100 dark:placeholder:text-slate-600"
                placeholder="Optional: Add a personal message to the candidate..."
                rows={2}
                value={feedbacks[app._id] || ""}
                onChange={(e) => handleFeedbackChange(app._id, e.target.value)}
              ></textarea>
            </div>

            {app.feedback && (
              <div className="mt-4 p-4 bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl border border-blue-100/50 dark:border-blue-900/30 text-sm text-gray-600 dark:text-slate-300 italic">
                <span className="font-bold uppercase text-[9px] text-primary/60 dark:text-blue-400/60 block mb-1">Previous Sent Message:</span>
                "{app.feedback}"
              </div>
            )}
          </div>
        ))}
        {admin.applications.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-gray-400 dark:text-slate-600 italic font-medium">No applications found to review.</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm p-8 transition-colors">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100">User Management</h3>
          <p className="text-gray-500 dark:text-slate-400 text-sm">Monitor and manage all registered users.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Search users..."
            className="pl-12 pr-6 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary/20 w-64 dark:text-gray-100 dark:placeholder:text-slate-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {admin.users.map((user: any) => (
          <div key={user._id} className="p-6 border border-gray-100 dark:border-slate-800 rounded-3xl hover:border-primary/20 dark:hover:border-primary/50 hover:shadow-md transition-all bg-white dark:bg-slate-900">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gray-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-gray-400 dark:text-slate-500 font-black">
                {user.name?.slice(0, 1) || "U"}
              </div>
              <div>
                <h4 className="font-black text-gray-900 dark:text-gray-100">{user.name}</h4>
                <p className="text-xs text-gray-500 dark:text-slate-500">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-slate-800">
               <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                 user.role === 'admin' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
               }`}>
                 {user.role}
               </span>
               <button className="text-gray-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                 <Trash2 size={16} />
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto flex h-full">
        {/* Sidebar */}
        <aside className="w-80 bg-white dark:bg-slate-900 border-r border-gray-100 dark:border-slate-800 hidden lg:block sticky top-16 h-[calc(100vh-64px)] p-8 transition-colors duration-300">
          <div className="space-y-2">
            <button 
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-black text-sm uppercase tracking-wider ${
                activeTab === 'overview' ? 'bg-primary text-white shadow-lg shadow-blue-100 dark:shadow-primary/20' : 'text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800'
              }`}
            >
              <LayoutDashboard size={20} /> Overview
            </button>
            <button 
              onClick={() => setActiveTab("jobs")}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-black text-sm uppercase tracking-wider ${
                activeTab === 'jobs' ? 'bg-primary text-white shadow-lg shadow-blue-100 dark:shadow-primary/20' : 'text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800'
              }`}
            >
              <Briefcase size={20} /> Manage Jobs
            </button>
            <button 
              onClick={() => setActiveTab("applications")}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-black text-sm uppercase tracking-wider ${
                activeTab === 'applications' ? 'bg-primary text-white shadow-lg shadow-blue-100 dark:shadow-primary/20' : 'text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800'
              }`}
            >
              <FileText size={20} /> Applications
            </button>
            <button 
              onClick={() => setActiveTab("users")}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-black text-sm uppercase tracking-wider ${
                activeTab === 'users' ? 'bg-primary text-white shadow-lg shadow-blue-100 dark:shadow-primary/20' : 'text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800'
              }`}
            >
              <Users size={20} /> User Management
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 md:p-12 overflow-y-auto">
          <header className="mb-12">
            <h1 className="text-4xl font-black text-gray-900 dark:text-gray-100 mb-2 transition-colors">Admin Dashboard</h1>
            <p className="text-gray-500 dark:text-slate-400 font-medium transition-colors">Welcome back! Here's what's happening with Job Sphere.</p>
          </header>

          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'jobs' && renderJobs()}
          {activeTab === 'applications' && renderApplications()}
          {activeTab === 'users' && renderUsers()}
        </main>
      </div>

      {/* Post Job Modal */}
      {showJobModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm transition-all">
          <div className="bg-white dark:bg-slate-900 rounded-[40px] w-full max-w-2xl overflow-hidden shadow-2xl dark:shadow-primary/10 border border-gray-100 dark:border-slate-800 transition-colors">
            <div className="p-10">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-black text-gray-900 dark:text-gray-100">Post New Job</h2>
                <button onClick={() => setShowJobModal(false)} className="bg-gray-50 dark:bg-slate-800 p-3 rounded-2xl text-gray-400 dark:text-slate-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                   <XCircle size={24} />
                </button>
              </div>

              <form onSubmit={handleCreateJob} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-gray-400 dark:text-slate-500 tracking-widest pl-1">Job Title</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Senior Frontend Developer"
                      className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-primary/10 transition-all dark:text-gray-100 dark:placeholder:text-slate-600"
                      value={newJob.title}
                      onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-gray-400 dark:text-slate-500 tracking-widest pl-1">Company</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Google"
                      className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-primary/10 transition-all dark:text-gray-100 dark:placeholder:text-slate-600"
                      value={newJob.company}
                      onChange={(e) => setNewJob({...newJob, company: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-gray-400 dark:text-slate-500 tracking-widest pl-1">Location</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Remote"
                      className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-primary/10 transition-all dark:text-gray-100 dark:placeholder:text-slate-600"
                      value={newJob.location}
                      onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-gray-400 dark:text-slate-500 tracking-widest pl-1">Salary (Monthly)</label>
                    <input 
                      type="number" 
                      required
                      placeholder="e.g. 5000"
                      className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-primary/10 transition-all dark:text-gray-100 dark:placeholder:text-slate-600"
                      value={newJob.salary}
                      onChange={(e) => setNewJob({...newJob, salary: parseInt(e.target.value)})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-gray-400 dark:text-slate-500 tracking-widest pl-1">Tags (Comma separated)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. React, TypeScript, UI/UX"
                    className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-primary/10 transition-all dark:text-gray-100 dark:placeholder:text-slate-600"
                    value={newJob.tags}
                    onChange={(e) => setNewJob({...newJob, tags: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-gray-400 dark:text-slate-500 tracking-widest pl-1">Description</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="Tell us about the role..."
                    className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-primary/10 transition-all resize-none dark:text-gray-100 dark:placeholder:text-slate-600"
                    value={newJob.description}
                    onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg hover:bg-primary-dark transition-all shadow-xl shadow-blue-100"
                >
                  Publish Job
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
