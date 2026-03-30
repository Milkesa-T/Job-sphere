import { AlertCircle, Facebook, Linkedin } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUserThunk, registerUserThunk } from "../store/jobSlice";

interface AuthFormProps {
  type: "login" | "signup";
}

export default function AuthForm({ type }: AuthFormProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (type === "signup") {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (formData.confirmPassword !== formData.password)
        newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);

      try {
        if (type === "login") {
          const res = await dispatch(loginUserThunk({ 
            email: formData.email, 
            password: formData.password 
          }) as any);
          
          if (!res.error) {
            navigate("/");
          } else {
             setErrors({ password: res.payload || "Login failed" });
          }
        } else {
          const res = await dispatch(
            registerUserThunk({
              name: `${formData.firstName} ${formData.lastName}`,
              email: formData.email,
              password: formData.password
            }) as any
          );
          
          if (!res.error) {
             navigate("/");
          } else {
             setErrors({ email: res.payload || "Registration failed" });
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error for that field
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl dark:shadow-primary/5 border border-gray-100 dark:border-slate-800 transition-colors duration-300">
      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-blue-200 dark:shadow-primary/20">
          <span className="text-2xl font-bold">J</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {type === "login" ? "Log in to your account" : "Create an account"}
        </h2>
        <p className="text-gray-500 dark:text-slate-400 text-sm mt-2">
          {type === "login"
            ? "Welcome back! Please enter your details."
            : "Join the Jobsphere community today."}
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {type === "signup" && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-1">
                First Name
              </label>
              <input
                name="firstName"
                type="text"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800 border ${errors.firstName ? "border-red-500" : "border-gray-100 dark:border-slate-700"} outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-slate-600`}
              />
              {errors.firstName && (
                <p className="text-[10px] text-red-500 mt-1 font-bold flex items-center gap-1 leading-none uppercase tracking-tighter">
                  <AlertCircle size={10} /> {errors.firstName}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-1">
                Last Name
              </label>
              <input
                name="lastName"
                type="text"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800 border ${errors.lastName ? "border-red-500" : "border-gray-100 dark:border-slate-700"} outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-slate-600`}
              />
              {errors.lastName && (
                <p className="text-[10px] text-red-500 mt-1 font-bold flex items-center gap-1 leading-none uppercase tracking-tighter">
                  <AlertCircle size={10} /> {errors.lastName}
                </p>
              )}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-1">
            Email Address
          </label>
          <input
            name="email"
            type="email"
            placeholder="name@company.com"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800 border ${errors.email ? "border-red-500" : "border-gray-100 dark:border-slate-700"} outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-slate-600`}
          />
          {errors.email && (
            <p className="text-[10px] text-red-500 mt-1 font-bold flex items-center gap-1 leading-none uppercase tracking-tighter">
              <AlertCircle size={10} /> {errors.email}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-1">
            Password
          </label>
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800 border ${errors.password ? "border-red-500" : "border-gray-100 dark:border-slate-700"} outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-slate-600`}
          />
          {errors.password && (
            <p className="text-[10px] text-red-500 mt-1 font-bold flex items-center gap-1 leading-none uppercase tracking-tighter">
              <AlertCircle size={10} /> {errors.password}
            </p>
          )}
        </div>

        {type === "signup" && (
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-1">
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800 border ${errors.confirmPassword ? "border-red-500" : "border-gray-100 dark:border-slate-700"} outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-slate-600`}
            />
            {errors.confirmPassword && (
              <p className="text-[10px] text-red-500 mt-1 font-bold flex items-center gap-1 leading-none uppercase tracking-tighter">
                <AlertCircle size={10} /> {errors.confirmPassword}
              </p>
            )}
          </div>
        )}

        {type === "login" && (
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 dark:border-slate-700 text-primary focus:ring-primary bg-white dark:bg-slate-800"
              />
              <span className="text-xs text-gray-500 dark:text-slate-500">Remember me</span>
            </label>
            <Link
              to="/forgot-password"
              className="text-xs text-primary font-bold hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        )}

        <button
          disabled={isSubmitting}
          className={`w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-blue-100 dark:shadow-primary/10 mt-2 flex items-center justify-center gap-2 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : type === "login" ? (
            "Log In"
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-100 dark:border-slate-800"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-slate-900 text-gray-400 dark:text-slate-600 transition-colors duration-300">OR</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[GoogleIcon, AppleIcon, Facebook, Linkedin].map((Icon: any, idx) => (
          <button
            key={idx}
            className="flex items-center justify-center py-3 border border-gray-100 dark:border-slate-800 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-all text-gray-600 dark:text-slate-400"
          >
            {idx < 2 ? <Icon /> : <Icon size={20} />}
          </button>
        ))}
      </div>

      <p className="text-center text-sm text-gray-500 dark:text-slate-500 mt-8">
        {type === "login"
          ? "Don't have an account?"
          : "Already have an account?"}
        <Link
          to={type === "login" ? "/signup" : "/login"}
          className="ml-1 text-primary font-bold hover:underline"
        >
          {type === "login" ? "Create an account" : "Log in"}
        </Link>
      </p>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.05 20.28c-.96.95-2.43 1.04-3.41 1.04s-2.04-.68-3.32-.68-2.14.68-3.32.68-2.45-.09-3.41-1.04c-1.28-1.28-2.27-3.81-2.27-6.63 0-4.14 2.45-6.31 4.79-6.31 1.28 0 2.22.62 3.21.62.99 0 2.23-.62 3.51-.62 2.2 0 4.14 1.47 5.09 3.25-4.41 1.83-3.69 7.85.74 9.01-.45 1.29-1.14 2.37-2.05 3.32zM12.03 5.48c-.02-2.13 1.74-3.95 3.74-4.23.23 2.46-2.04 4.58-3.74 4.23z" />
    </svg>
  );
}
