import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// 🔥 Convert Bangla → Number
const convertBanglaToNumber = (str) => {
  const banglaDigits = "০১২৩৪৫৬৭৮৯";
  const englishDigits = "0123456789";

  return (
    Number(
      str
        ?.trim()
        .split("")
        .map((char) => {
          const index = banglaDigits.indexOf(char);
          return index > -1 ? englishDigits[index] : char;
        })
        .join("")
    ) || 0
  );
};

// 🔥 Convert Number → Bangla
const toBanglaNumber = (num) => {
  const banglaDigits = "০১২৩৪৫৬৭৮৯";
  return num
    .toString()
    .split("")
    .map((d) => banglaDigits[d] || d)
    .join("");
};

const DoctorFeeCard = ({ doctor }) => {
  const navigate = useNavigate();

  // ✅ Hooks ALWAYS top
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  if (!doctor) return null;

  // ✅ Convert fee
  const offlineFee = convertBanglaToNumber(doctor?.fee);

  // ✅ Discount logic
  const baseDiscount = 0.2;
  let onlineFee = offlineFee - offlineFee * baseDiscount;

  if (promoApplied) {
    onlineFee = onlineFee - onlineFee * 0.05;
  }

  const handleApply = () => {
    if (promoCode.toLowerCase() === "shefa5") {
      setPromoApplied(true);
    } else {
      toast.error("Invalid Promo Code");
    }
  };

  return (
    <div className="flex flex-col bg-blue-50 p-6 rounded-3xl text-center items-center justify-center">

      <p>পরামর্শ ফি</p>

      {/* ❌ Offline Fee */}
      <p className="text-gray-400 line-through text-lg">
        ৳ {toBanglaNumber(offlineFee)}
      </p>

      {/* ✅ Online Fee */}
      <h2 className="text-4xl font-bold text-blue-600">
        ৳ {toBanglaNumber(Math.round(onlineFee))}
      </h2>

      {/* Promo */}
      <div className="flex w-full mt-3 gap-2">
        <input
          type="text"
          placeholder="প্রোমো কোড দিন"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-lg"
        />
        <button
          onClick={handleApply}
          className="bg-green-500 text-white px-3 rounded-lg"
        >
          প্রয়োগ
        </button>
      </div>

      {promoApplied && (
        <p className="text-green-600 text-sm mt-2">
        আপনার জন্য অতিরিক্ত ৫% ছাড় প্রয়োগ হয়েছে
        </p>
      )}

      {/* 🚀 KEEP SAME BUTTON */}
      <button
        className="btn my-btn !w-full mt-4"
        onClick={() => {
          const roomID =
            doctor.platformId ||
            Math.random().toString(36).substring(2, 8);

          navigate(`/call/${roomID}`);
        }}
      >
        অ্যাপয়েন্টমেন্ট নিন
      </button>
    </div>
  );
};

export default DoctorFeeCard;