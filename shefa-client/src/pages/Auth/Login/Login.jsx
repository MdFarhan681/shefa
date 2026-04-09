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

  const { signInUser, googleSignIn } = useAuth(); // your auth hook

  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then(() => {
        toast.success("Login Successful 🎉");
        navigate(location.state || "/");
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          toast.error("Incorrect Password");
        } else if (error.code === "auth/user-not-found") {
          toast.error("No user found with that email");
        } else {
          toast.error("Invalid email or password");
        }
      });
  };

  const handleGoogle = () => {
    googleSignIn()
      .then(() => {
        toast.success("Google Sign-In Successful");
        navigate(location.state || "/");
      })
      .catch(() => {
        toast.error("Google Sign-In Failed. Try again");
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
            Login to Your Account
          </h1>

          <div className="card-body w-full">
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input w-full"
                placeholder="Enter your email"
                required
              />

              {/* Password */}
              <div className="relative">
                <label className="label">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="input w-full pr-12"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <PiEyeClosed size={22} /> : <BsEyeglasses size={22} />}
                </button>
              </div>

              {/* Forgot Password */}
              <button
                type="button"
                onClick={handleForgotPassword}
                className="link link-hover text-blue-600"
              >
                Forgot Password?
              </button>

              {/* Submit */}
              <button
                type="submit"
                className="btn w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold text-sm py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
              >
                Login
              </button>

              {/* Register Link */}
              <p className="font-semibold text-center pt-3">
                Don't have an account?
                <Link to="/register" className="text-red-600 ml-1">
                  Register
                </Link>
              </p>

              {/* Google Sign-In */}
             <SocialLogin></SocialLogin>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;