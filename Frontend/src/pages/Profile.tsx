import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type RootState, type AppDispatch } from "../store/store";
import { updateProfileThunk } from "../store/jobSlice";
import { User as UserIcon, Mail, Lock, CheckCircle, AlertCircle } from "lucide-react";

export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const { auth } = useSelector((state: RootState) => state.job);
  
  const [formData, setFormData] = useState({
    name: auth.user?.name || "",
    email: auth.user?.email || "",
    password: "",
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setSuccess(false);
    setErrorMsg("");

    try {
      await dispatch(updateProfileThunk(formData)).unwrap();
      setSuccess(true);
      setFormData({...formData, password: ""});
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setErrorMsg(err || "Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] p-6 md:p-12 bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        <header className="mb-10 text-center">
          <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 text-primary dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl font-black border-4 border-white dark:border-slate-800 shadow-xl">
             {auth.user?.name?.charAt(0) || "U"}
          </div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-gray-100 mb-2">My Profile</h1>
          <p className="text-gray-500 dark:text-slate-400 font-medium">Update your account settings and credentials here.</p>
        </header>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-[40px] p-8 md:p-12 shadow-sm border border-gray-100 dark:border-slate-800 transition-colors">
          {success && (
            <div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-4 rounded-2xl text-sm font-bold flex items-center gap-2 mb-8 border border-green-100 dark:border-green-900/30">
              <CheckCircle size={18} /> Profile updated successfully!
            </div>
          )}
          
          {errorMsg && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-2xl text-sm font-bold flex items-center gap-2 mb-8 border border-red-100 dark:border-red-900/30">
              <AlertCircle size={18} /> {errorMsg}
            </div>
          )}

          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-gray-400 dark:text-slate-500 tracking-widest pl-1">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl pl-14 pr-6 py-4 outline-none focus:ring-4 focus:ring-primary/10 transition-all dark:text-gray-100 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-gray-400 dark:text-slate-500 tracking-widest pl-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl pl-14 pr-6 py-4 outline-none focus:ring-4 focus:ring-primary/10 transition-all dark:text-gray-100 font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-100 dark:border-slate-800">
              <div className="space-y-2 max-w-md">
                 <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">Change Password</h3>
                 <label className="text-xs font-black uppercase text-gray-400 dark:text-slate-500 tracking-widest pl-1">New Password (Optional)</label>
                 <div className="relative">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                      type="password" 
                      placeholder="Leave blank to keep current"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl pl-14 pr-6 py-4 outline-none focus:ring-4 focus:ring-primary/10 transition-all dark:text-gray-100 font-medium tracking-widest"
                    />
                 </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
               <button 
                  type="submit" 
                  disabled={isUpdating}
                  className="bg-primary text-white py-4 px-12 rounded-2xl font-black hover:bg-primary-dark transition-all shadow-xl shadow-blue-100 dark:shadow-primary/10 disabled:opacity-50"
               >
                 {isUpdating ? "Saving..." : "Save Changes"}
               </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
