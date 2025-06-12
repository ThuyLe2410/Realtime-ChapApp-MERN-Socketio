import { useState } from "react";
import {
  MessageSquare,
  User,
  Mail,
  Lock,
  EyeOff,
  Eye,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast"
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import type { useSignup } from "../types";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isSigningUp } = useAuthStore() as {signup: useSignup, isSigningUp:boolean};
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData)
  };

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
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                {" "}
                Get started with your free account
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <User className="size-6 text-gray-500" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="Na"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>

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
                  className={` w-11/12 pl-8`}
                  placeholder="......."
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 m-1 flex items-center bg-transparent z-20">
                  {showPassword ? (
                    <EyeOff className="size-4 text-base-content/40" />
                  ) : (
                    <Eye className="size-4 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            {/* create account */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <Loader2 /> Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Already have account => sign in */}
          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?
              <Link to="/login" className="link link-primary">
                {" "}
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
}
