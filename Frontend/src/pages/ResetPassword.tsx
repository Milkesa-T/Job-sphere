import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Lock, AlertCircle, ArrowLeft } from "lucide-react";
import axios from "axios";

export default function ResetPassword() {
  const { resettoken } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setStatus("loading");
    try {
      await axios.put(`/api/auth/resetpassword/${resettoken}`, { password });
      alert("Password reset successfully! Please log in.");
      navigate("/login");
    } catch (err: any) {
      setStatus("error");
      setMessage(err.response?.data?.message || "Invalid or expired token");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl dark:shadow-primary/5 border border-gray-100 dark:border-slate-800">
        <div className="mb-6">
           <Link to="/login" className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors font-bold mb-6">
            <ArrowLeft size={16} /> Back to login
          </Link>
          <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mb-4 border border-purple-100 dark:border-purple-900/50">
            <Lock size={24} />
          </div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-gray-100 mb-2">Create New Password</h2>
          <p className="text-gray-500 dark:text-slate-400 text-sm">Your new password must be different from previous used passwords.</p>
        </div>

        {status === "error" && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl text-sm font-bold flex items-center gap-2 mb-6 border border-red-100 dark:border-red-900/30">
            <AlertCircle size={18} /> {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-gray-400 dark:text-slate-500 tracking-widest pl-1">New Password</label>
            <input 
              type="password" 
              required
              placeholder="••••••••"
              className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-primary/10 transition-all dark:text-gray-100 dark:placeholder:text-slate-600 font-medium tracking-widest"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            disabled={status === "loading"}
            className="w-full bg-primary text-white py-4 rounded-2xl font-black hover:bg-primary-dark transition-all shadow-xl shadow-blue-100 dark:shadow-primary/10 disabled:opacity-50 flex items-center justify-center"
          >
            {status === "loading" ? "Resetting..." : "Set New Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
