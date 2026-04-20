import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import toast from "react-hot-toast";
import { BsEyeglasses } from "react-icons/bs";
import { PiEyeClosed } from "react-icons/pi";
import MedicalHistoryForm from "../MedicalHistoryForm/MedicalHistoryForm";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("patient");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [showHistoryForm, setShowHistoryForm] = useState(false);

  const roleBtn = (value, label) => (
    <button
      type="button"
      onClick={() => setRole(value)}
      className={`flex-1 py-2 rounded-xl text-sm font-semibold transition ${
        role === value ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"
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
          role: role,
        };

        fetch("https://shefa-server.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userInfo),
        })
          .then((res) => res.json())
          .then((response) => {
            if (!response.inserted) {
              toast.error("ব্যবহারকারী আগে থেকেই আছে ⚠️");
              setLoading(false);
              return;
            }

            updateUserProfile({
              displayName: data.name,
              photoURL: data.photo,
            })
              .then(() => {
                toast.success("রেজিস্ট্রেশন সফল 🎉");
                navigate("/");
              })
              .finally(() => setLoading(false));

            toast.success("রেজিস্ট্রেশন সফল 🎉");
          })
          .catch(() => {
            toast.error("ডাটাবেস সমস্যা ❌");
            setLoading(false);
          });
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-center items-center">
        <div className="card bg-base-100 w-[94%] md:w-[420px] shadow-2xl">

          <h1 className="text-xl md:text-3xl pt-5 font-bold text-center">
            অ্যাকাউন্ট রেজিস্ট্রেশন
          </h1>

          <form
            onSubmit={handleSubmit(handleRegistration)}
            className="card-body"
          >
            {/* ভূমিকা নির্বাচন */}
            <div className="flex gap-2 bg-gray-100 rounded-xl p-1 mb-3">
              {roleBtn("patient", "রোগী")}
              {roleBtn("doctor", "ডাক্তার")}
            </div>

            {/* নাম */}
            <label className="label">নাম</label>
            <input
              {...register("name", { required: true })}
              className="input w-full"
              placeholder="আপনার নাম লিখুন"
            />
            {errors.name && <p className="text-red-500">নাম আবশ্যক</p>}

            {/* ইমেইল */}
            <label className="label">ইমেইল</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input w-full"
              placeholder="ইমেইল লিখুন"
            />
            {errors.email && <p className="text-red-500">ইমেইল আবশ্যক</p>}

            {/* ছবি */}
            <label className="label">ছবির URL</label>
            <input
              {...register("photo", { required: true })}
              className="input w-full"
              placeholder="https://..."
            />
            {errors.photo && <p className="text-red-500">ছবি আবশ্যক</p>}

            {/* পাসওয়ার্ড */}
            <div className="relative">
              <label className="label">পাসওয়ার্ড</label>

              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true, minLength: 6 })}
                className="input w-full pr-12"
                placeholder="পাসওয়ার্ড লিখুন"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-500"
              >
                {showPassword ? (
                  <PiEyeClosed size={22} />
                ) : (
                  <BsEyeglasses size={22} />
                )}
              </button>

              {errors.password?.type === "minLength" && (
                <p className="text-red-500">
                  পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে
                </p>
              )}
            </div>

            {/* রেজিস্টার বাটন */}
            <button
              type="submit"
              disabled={loading}
              className="btn w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl"
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "রেজিস্টার"
              )}
            </button>

            {/* লগইন */}
            <p className="font-semibold text-center pt-3">
              ইতিমধ্যে অ্যাকাউন্ট আছে?
              <Link to="/login" className="text-blue-600 ml-1">
                লগইন করুন
              </Link>
            </p>

            {/* সোশ্যাল লগইন */}
            <div className="pt-3">
              <SocialLogin />
            </div>

            {/* মেডিকেল হিস্ট্রি বাটন */}
            <button
              type="button"
              onClick={() => setShowHistoryForm(true)}
              className="w-full py-2 mt-2 bg-green-100 text-green-700 rounded-xl font-semibold"
            >
              মেডিকেল ইতিহাস যোগ করুন (ঐচ্ছিক)
            </button>
          </form>

          {/* মেডিকেল হিস্ট্রি ফর্ম */}
          {showHistoryForm && (
            <MedicalHistoryForm
              onClose={() => setShowHistoryForm(false)}
              onSave={(data) => {
                console.log("Medical History:", data);
                toast.success("মেডিকেল ইতিহাস সংরক্ষিত হয়েছে!");
              }}
            />
          )}

        </div>
      </div>
    </div>
  );
};

export default Register;