import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { 
  registerUserThunk, 
  loginUserThunk, 
  socialLoginThunk 
} from "../store/jobSlice";

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

  const handleSocialLogin = (provider: string) => {
    // For demo purposes, we'll simulate account data for the provider
    const demoData = {
      name: `Demo ${provider} User`,
      email: `demo.${provider.toLowerCase()}.${Math.floor(Math.random() * 1000)}@gmail.com`,
      provider
    };
    dispatch(socialLoginThunk(demoData) as any);
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

      <div className="grid grid-cols-4 gap-4">
        <button
          type="button"
          onClick={() => handleSocialLogin("Google")}
          className="flex items-center justify-center py-4 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-all hover:-translate-y-1 hover:shadow-lg shadow-blue-100 group"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5 flex-shrink-0" alt="Google" />
        </button>
        <button
          type="button"
          onClick={() => handleSocialLogin("Apple")}
          className="flex items-center justify-center py-4 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-all hover:-translate-y-1 hover:shadow-lg shadow-blue-100"
        >
          <img src="https://www.svgrepo.com/show/511330/apple-173.svg" className="w-5 h-5 flex-shrink-0 dark:invert" alt="Apple" />
        </button>
        <button
          type="button"
          onClick={() => handleSocialLogin("Facebook")}
          className="flex items-center justify-center py-4 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-all hover:-translate-y-1 hover:shadow-lg shadow-blue-100"
        >
          <img src="https://www.svgrepo.com/show/448224/facebook.svg" className="w-5 h-5 flex-shrink-0" alt="Facebook" />
        </button>
        <button
          type="button"
          onClick={() => handleSocialLogin("LinkedIn")}
          className="flex items-center justify-center py-4 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-all hover:-translate-y-1 hover:shadow-lg shadow-blue-100"
        >
          <img src="https://www.svgrepo.com/show/144550/linkedin.svg" className="w-5 h-5 flex-shrink-0" alt="LinkedIn" />
        </button>
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
