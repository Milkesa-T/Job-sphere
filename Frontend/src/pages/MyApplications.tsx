import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type RootState, type AppDispatch } from "../store/store";
import { fetchUserApplicationsThunk } from "../store/jobSlice";
import JobCard from "../components/JobCard";
import { Clock, CheckCircle2, XCircle, Loader2 } from "lucide-react";

export default function MyApplications() {
  const dispatch = useDispatch<AppDispatch>();
  const { userApplications, status } = useSelector((state: RootState) => state.job);

  useEffect(() => {
    dispatch(fetchUserApplicationsThunk());
  }, [dispatch]);

  if (status === "loading" && userApplications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-primary mb-4" size={40} />
        <p className="text-gray-500 font-medium">Loading your applications...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-colors duration-300">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 dark:text-gray-100 mb-2">My Applications</h1>
        <p className="text-gray-500 dark:text-slate-400 font-medium">Track and manage your current job applications.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div className="space-y-6">
            {userApplications.length > 0 ? (
              userApplications.map((app: any) => (
                <div key={app._id} className="group mb-8">
                  <div className="flex items-center justify-between bg-white dark:bg-slate-900 px-6 py-4 rounded-t-2xl border border-b-0 border-gray-100 dark:border-slate-800">
                    <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Application Status</span>
                    <div className="flex items-center gap-4">
                      {app.feedback && (
                        <span className="text-xs italic text-gray-500 dark:text-slate-400 hidden md:block">"{app.feedback}"</span>
                      )}
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        app.status === 'pending' ? 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 border-yellow-100 dark:border-yellow-900/50' : 
                        app.status === 'accepted' ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-100 dark:border-green-900/50' :
                        app.status === 'rejected' ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-100 dark:border-red-900/50' : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/50'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                  </div>
                  {app.job ? (
                    <div className="[&>div]:rounded-t-none [&>div]:border-t-0">
                      <JobCard job={app.job} />
                    </div>
                  ) : (
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-b-2xl border border-gray-100 dark:border-slate-800 text-gray-500 text-center border-t-0">
                      This job is no longer available.
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-gray-100 dark:border-slate-800 shadow-sm">
                <div className="w-20 h-20 bg-gray-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock size={32} className="text-gray-300 dark:text-slate-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">No applications yet</h3>
                <p className="text-gray-500 dark:text-slate-400 mb-6 max-w-sm mx-auto">You haven't applied to any jobs yet. Start searching for your next opportunity!</p>
                <a href="/" className="inline-block bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-blue-100 dark:shadow-primary/20">
                  Search Jobs
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-slate-800 sticky top-24 transition-colors duration-300">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6 font-black uppercase tracking-tight">Application Summary</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/30 text-primary dark:text-blue-400 rounded-lg flex items-center justify-center">
                    <Clock size={16} />
                  </div>
                  <span className="text-gray-500 dark:text-slate-400 font-medium">Total Applied</span>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-gray-100">{userApplications.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg flex items-center justify-center">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-gray-500 dark:text-slate-400 font-medium">Interviews/Offers</span>
                </div>
                <span className="text-xl font-bold text-green-600 dark:text-green-400">
                  {userApplications.filter((a: any) => a.status === 'accepted' || a.status === 'interviewing').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg flex items-center justify-center">
                    <XCircle size={16} />
                  </div>
                  <span className="text-gray-500 dark:text-slate-400 font-medium">Rejected</span>
                </div>
                <span className="text-xl font-bold text-red-600 dark:text-red-400">
                  {userApplications.filter((a: any) => a.status === 'rejected').length}
                </span>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-50 dark:border-slate-800">
               <p className="text-xs text-gray-400 dark:text-slate-500 leading-relaxed italic text-center">
                 "Every application is a step closer to your dream job. Keep going!"
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
