import { Briefcase, LogOut, User as UserIcon, Sun, Moon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout, toggleDarkMode } from "../store/jobSlice";
import { type RootState, type AppDispatch } from "../store/store";

export default function Navbar() {
  const { auth, darkMode } = useSelector((state: RootState) => state.job);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary text-white p-2 rounded-lg">
              <Briefcase size={20} />
            </div>
            <span className="text-xl font-bold text-primary">Jobsphere</span>
          </Link>

          {/* Desktop Center Links (Hidden on mobile) */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors font-medium"
            >
              Job Search
            </Link>
            <Link
              to="/my-applications"
              className="text-gray-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors font-medium"
            >
              My Applications
            </Link>
            <Link
              to="/companies"
              className="text-gray-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors font-medium"
            >
              Companies
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors font-medium"
            >
              Contact Us
            </Link>
            {auth.user?.role === "admin" && (
              <Link
                to="/admin"
                className="text-primary font-bold hover:bg-blue-50 dark:hover:bg-blue-900/30 px-4 py-2 rounded-xl transition-all border border-primary/20"
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => dispatch(toggleDarkMode())}
              className="p-2.5 rounded-xl text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-gray-100 dark:hover:border-slate-700"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? (
                <Moon size={20} className="text-blue-400" />
              ) : (
                <Sun size={20} className="text-yellow-500" />
              )}
            </button>
            <div className="h-6 w-[1px] bg-gray-100 dark:bg-slate-800 mx-1"></div>
            <div className="flex items-center gap-4">
            {auth.isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/40 text-primary dark:text-blue-400 rounded-full font-bold text-sm hover:shadow-sm transition-all border border-blue-100 dark:border-blue-900/50">
                  <UserIcon size={16} />
                  {auth.user?.name || auth.user?.email.split("@")[0]}
                </Link>
                <button
                  onClick={() => dispatch(logout())}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary font-medium px-4 py-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-primary text-white px-5 py-2 rounded-full font-medium hover:bg-primary-dark transition-all shadow-md hover:shadow-lg flex items-center"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  </nav>
  );
}
