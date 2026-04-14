import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";

const SocialLogin = ({ role = "patient" }) => {
  const { signInGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    signInGoogle()
      .then((result) => {
        const userInfo = {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          role: role, // dynamic role, default "patient"
        };

        // ✅ Use fetch to save user to MongoDB
        fetch("http://localhost:3000/users", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(userInfo),
        })
          .then((res) => res.json())
          .then((data) => {
            if (!data.inserted) {
              console.warn("User already exists in database");
            } else {
              toast.success("User saved in database 🎉");
            }

            toast.success("Google login successful 🎉");
            navigate(location.state || "/");
          })
          .catch((err) => {
            console.error(err);
            toast.error("Failed to save user to database ❌");
          });
      })
      .catch((error) => {
        toast.error(error.message || "Google login failed ❌");
      });
  };

  return (
    <div className="text-center pb-6">
      <p>OR</p>
      <button
        onClick={handleGoogleSignIn}
        className="btn w-full bg-[#f7f7f7] text-black border-[#e5e5e5]"
      >
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
