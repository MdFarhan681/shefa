import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { PiEyeClosed } from "react-icons/pi";
import { BsEyeglasses } from "react-icons/bs";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { signInUser, googleSignIn } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then(() => {
        toast.success("লগইন সফল 🎉");
        navigate(location.state || "/");
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          toast.error("ভুল পাসওয়ার্ড");
        } else if (error.code === "auth/user-not-found") {
          toast.error("এই ইমেইলে কোনো ইউজার নেই");
        } else {
          toast.error("ইমেইল বা পাসওয়ার্ড ভুল");
        }
      });
  };

  const handleGoogle = () => {
    googleSignIn()
      .then(() => {
        toast.success("Google দিয়ে লগইন সফল 🎉");
        navigate(location.state || "/");
      })
      .catch(() => {
        toast.error("Google লগইন ব্যর্থ হয়েছে");
      });
  };

  const handleForgotPassword = () => {
    navigate("/auth/forget", { state: { email } });
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-center items-center px-[7%]">
        <div className="card bg-base-100 w-[94%] md:w-[420px] shadow-2xl">

          <h1 className="text-xl md:text-3xl font-bold pt-5 text-center mb-3">
            আপনার অ্যাকাউন্টে লগইন করুন
          </h1>

          <div className="card-body w-full">
            <form onSubmit={handleLogin} className="space-y-4">

              {/* ইমেইল */}
              <label className="label">ইমেইল</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input w-full"
                placeholder="আপনার ইমেইল লিখুন"
                required
              />

              {/* পাসওয়ার্ড */}
              <div className="relative">
                <label className="label">পাসওয়ার্ড</label>

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="input w-full pr-12"
                  placeholder="পাসওয়ার্ড লিখুন"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <PiEyeClosed size={22} />
                  ) : (
                    <BsEyeglasses size={22} />
                  )}
                </button>
              </div>

              {/* পাসওয়ার্ড ভুলে গেছেন */}
              <button
                type="button"
                onClick={handleForgotPassword}
                className="link link-hover text-blue-600"
              >
                পাসওয়ার্ড ভুলে গেছেন?
              </button>

              {/* লগইন বাটন */}
              <button
                type="submit"
                className="btn w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold text-sm py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
              >
                লগইন
              </button>

              {/* রেজিস্টার */}
              <p className="font-semibold text-center pt-3">
                আপনার কি অ্যাকাউন্ট নেই?
                <Link to="/register" className="text-red-600 ml-1">
                  রেজিস্টার করুন
                </Link>
              </p>

              {/* সোশ্যাল লগইন */}
              <SocialLogin />

            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;