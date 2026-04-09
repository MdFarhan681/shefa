import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import toast from 'react-hot-toast';
import { BsEyeglasses } from "react-icons/bs";
import { PiEyeClosed } from "react-icons/pi";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("patient"); 

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const roleBtn = (value, label) => (
    <button
      type="button"
      onClick={() => setRole(value)}
      className={`flex-1 py-2 rounded-xl text-sm font-semibold transition ${
        role === value
          ? "bg-blue-600 text-white"
          : "bg-gray-100 text-gray-600"
      }`}
    >
      {label}
    </button>
  );

  const handleRegistration = (data) => {
    setLoading(true);

    registerUser(data.email, data.password)
      .then(() => {

        const userInfo = {
          email: data.email,
          displayName: data.name,
          photoURL: data.photo,
          role: role // ✅ dynamic role
        };

        fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(userInfo)
        })
          .then(res => res.json())
          .then(response => {

            if (!response.inserted) {
              toast.error("User already exists ⚠️");
              setLoading(false);
              return;
            }

            updateUserProfile({
              displayName: data.name,
              photoURL: data.photo
            })
              .then(() => {
                toast.success("Registration successful 🎉");
                navigate('/');
              })
              .finally(() => setLoading(false));
              toast.success("Registration successful 🎉");

          })
          .catch(() => {
            toast.error("Database error ❌");
            setLoading(false);
          });

      })
      .catch(error => {
        toast.error(error.message);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-center items-center">
        <div className="card bg-base-100 w-[94%] md:w-[420px] shadow-2xl">

          <h1 className="text-xl md:text-3xl pt-5 font-bold text-center">
            Register Your Account
          </h1>

          <form onSubmit={handleSubmit(handleRegistration)} className="card-body">

            {/* ✅ Role Selector */}
            <div className="flex gap-2 bg-gray-100 rounded-xl p-1 mb-3">
              {roleBtn("patient", "Patient")}
              {roleBtn("doctor", "Doctor")}
            </div>

            {/* Name */}
            <label className="label">Name</label>
            <input
              {...register('name', { required: true })}
              className="input w-full"
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500">Name required</p>}

            {/* Email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="input w-full"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500">Email required</p>}

            {/* Photo */}
            <label className="label">Photo URL</label>
            <input
              {...register('photo', { required: true })}
              className="input w-full"
              placeholder="https://..."
            />
            {errors.photo && <p className="text-red-500">Photo required</p>}

            {/* Password */}
            <div className="relative">
              <label className="label">Password</label>

              <input
                type={showPassword ? "text" : "password"}
                {...register('password', { required: true, minLength: 6 })}
                className="input w-full pr-12"
                placeholder="Password"
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

              {errors.password?.type === "minLength" && (
                <p className="text-red-500">
                  Password must be at least 6 characters
                </p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl"
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Register"
              )}
            </button>

            {/* Login */}
            <p className="font-semibold text-center pt-3">
              Already have an account?
              <Link to="/login" className="text-blue-600 ml-1">
                Login
              </Link>
            </p>

            {/* Social */}
            <div className="pt-3">
              <SocialLogin />
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;