import React from "react";
import { PiEyeClosed } from "react-icons/pi";
import { BsEyeglasses } from "react-icons/bs";

const ShowPassword = ({ showPassword, setShowPassword }) => {
  return (
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-8 text-gray-500"
    >
      {showPassword ? (
        <PiEyeClosed size={20} />
      ) : (
        <BsEyeglasses size={20} />
      )}
    </button>
  );
};

export default ShowPassword;