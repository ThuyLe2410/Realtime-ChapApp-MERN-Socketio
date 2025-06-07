import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import {MessageSquare, Mail, Lock, EyeOff, Eye,  Loader2} from "lucide-react";
import { Link } from "react-router-dom";


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn} = useAuthStore();

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    login(formData)
  }
  return (
    <div className="min-h-screen grid grid-cols-2">
      {/* LEFT SIDE */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">
                {" "}
                Sign in to your account
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email */}
            <div>
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Mail className="size-6 text-gray-500" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className={`relative input input-bordered w-full`}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Lock className="size-6 text-gray-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input w-11/12 pl-8`}
                  placeholder="......."
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 m-1 flex items-center bg-transparent">
                  {showPassword ? (
                    <EyeOff className="size-4 text-base-content/40" />
                  ) : (
                    <Eye className="size-4 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            {/* sign in */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 /> Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* Dont have account => sign up */}
          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?
             <Link to="/signup" className="link link-primary">
                {" "}
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <AuthImagePattern
        title="Welcome back!"
        subtitle="Sign in to continue your conversations and catch up with your messages."
      />
    </div>
  );
}
