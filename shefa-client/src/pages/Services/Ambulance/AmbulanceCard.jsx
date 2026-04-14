import React from "react";
import toast, { Toaster } from "react-hot-toast";

const hospitals = [
  {
    medical_name: "Khulna City Medical College Hospital",
    phone_number: "01999-099099",
    service_time: "24 Hours",
  },
  {
    medical_name: "Gazi Medical College Hospital",
    phone_number: "01779-656810",
    service_time: "24 Hours",
  },
  {
    medical_name: "Khulna General Hospital (Sadar Hospital)",
    phone_number: "01779-656811",
    service_time: "24 Hours",
  },
  {
    medical_name: "Ad-din Akij Medical College Hospital",
    phone_number: "01713-488411",
    service_time: "24 Hours",
  },
  {
    medical_name: "Islami Bank Hospital Khulna",
    phone_number: "01711-298607",
    service_time: "24 Hours",
  },
];

const AmbulanceCard = () => {

  // ✅ BONUS UX FUNCTION
  const handleCall = (number) => {
    navigator.clipboard.writeText(number);
    toast.success("📋 নাম্বার কপি হয়েছে");

    // small delay before call (better UX)
    setTimeout(() => {
      window.location.href = `tel:${number}`;
    }, 700);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/5 to-indigo-100/5 p-4 md:p-6">

      {/* TOAST */}
      <Toaster position="top-center" />

      <h2 className="text-2xl font-bold mb-6 text-center">
       নিকটস্থ হাসপাতাল ও অ্যাম্বুলেন্স সেবা তালিকা 
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

        {hospitals.map((hospital, index) => (
          <div
            key={index}
            className="bg-white/70 backdrop-blur-xl border border-white/30 shadow-lg rounded-2xl p-5 hover:scale-105 transition duration-300"
          >
            {/* NAME */}
            <h3 className="ext-lg font-semibold mb-2 text-blue-700 truncate ">
              {hospital.medical_name}
            </h3>

            {/* PHONE */}
            <p className="text-gray-600 text-sm mb-1">
              📞 {hospital.phone_number}
            </p>

            {/* TIME */}
            <p className="text-gray-600 text-sm mb-4">
              ⏰ {hospital.service_time}
            </p>

            {/* BUTTON */}
            <button
              onClick={() => handleCall(hospital.phone_number)}
              className="!w-full  my-btn  transition"
            >
              কল করুন
            </button>

          </div>
        ))}

      </div>
    </div>
  );
};

export default AmbulanceCard;