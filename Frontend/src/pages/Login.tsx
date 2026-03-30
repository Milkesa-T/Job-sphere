import AuthForm from "../components/AuthForm";

export default function Login() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col lg:flex-row transition-colors duration-300">
      {/* Left side: Illustration or Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-50 dark:bg-slate-900/50 items-center justify-center p-20">
        <div className="max-w-md text-center">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] shadow-2xl shadow-blue-100 dark:shadow-primary/10 mb-10 transform -rotate-3 hover:rotate-0 transition-transform duration-500 border border-gray-100 dark:border-slate-800">
            <img
              src="https://img.freepik.com/free-vector/job-interview-concept-illustration_114360-4680.jpg"
              alt="Job Interview"
              className="rounded-3xl dark:brightness-90"
            />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
            Start your journey with us.
          </h2>
          <p className="text-gray-500 dark:text-slate-400 font-medium">
            Over 50,000 professional jobs waiting for you to discover and apply.
          </p>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-white dark:bg-slate-950 lg:bg-gray-50/30 dark:lg:bg-slate-900/20">
        <AuthForm type="login" />
      </div>
    </div>
  );
}
