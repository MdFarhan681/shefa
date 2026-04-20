import React, { useState, useEffect } from "react";
import useAuth from "../../../../hooks/useAuth";
import toast from "react-hot-toast";

// 🧠 React Icons
import { FaUserMd, FaPills, FaNotesMedical } from "react-icons/fa";
import { MdOutlineSick, MdDateRange, MdOutlineDescription } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";

// 🧪 Sample fallback data
const samplePrescriptions = [
  {
    doctorName: "Dr. Rahman",
    specialty: "Cardiologist",
    doctorPhoto: "https://i.ibb.co/4pDNDk1/doctor.png",
    date: "2026-04-20",
    diagnosis: "উচ্চ রক্তচাপ (Hypertension)",
    medicines: ["Paracetamol 500mg", "Vitamin C"],
    instructions: "দিনে ২ বার খাবেন, খাবারের পরে",
    notes: "পানি বেশি পান করুন"
  },
  {
    doctorName: "Dr. Ahmed",
    specialty: "Medicine Specialist",
    doctorPhoto: "https://i.ibb.co/4pDNDk1/doctor.png",
    date: "2026-03-15",
    diagnosis: "গ্যাস্ট্রিক সমস্যা",
    medicines: ["Omeprazole", "Antacid"],
    instructions: "খালি পেটে খাবেন",
    notes: "ঝাল খাবার এড়িয়ে চলুন"
  }
];

const Prescriptions = () => {
  const { user } = useAuth();

  // 🧠 prescriptions taken ONLY from user (no API)
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ⛔ No backend call, only user data
    if (user?.prescriptions && user.prescriptions.length > 0) {
      setPrescriptions(user.prescriptions);
    } else {
      setPrescriptions([]);
    }

    setLoading(false);
  }, [user]);

  if (loading) {
    return (
      <div className="text-center mt-10">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  const finalData =
    prescriptions.length > 0 ? prescriptions : samplePrescriptions;

  const isSample = prescriptions.length === 0;

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50">

      {/* HEADER */}
      <div className="bg-white p-5 rounded-2xl shadow mb-6">
        <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <IoDocumentText /> প্রেসক্রিপশন রিপোর্ট
        </h1>

        {isSample && (
          <div className="mt-3 text-sm bg-yellow-100 text-yellow-700 p-2 rounded">
            কোনো ইউজার ডাটা নেই — ডেমো ডাটা দেখানো হচ্ছে
          </div>
        )}
      </div>

      {/* CARDS */}
      <div className="grid md:grid-cols-2 gap-5">

        {finalData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow border border-gray-200 p-5 hover:shadow-lg transition"
          >

            {/* DOCTOR */}
            <div className="flex items-center gap-3 mb-3">
              <img
                src={item.doctorPhoto}
                className="w-12 h-12 rounded-full border"
              />

              <div>
                <h2 className="font-bold flex items-center gap-2">
                  <FaUserMd className="text-blue-500" />
                  {item.doctorName}
                </h2>
                <p className="text-sm text-gray-500">
                  {item.specialty}
                </p>
              </div>
            </div>

            {/* DATE */}
            <p className="text-sm text-gray-500 flex items-center gap-2 mb-3">
              <MdDateRange /> {item.date}
            </p>

            {/* DIAGNOSIS */}
            <div className="mb-3 bg-red-50 p-3 rounded-lg border border-red-200">
              <h3 className="font-semibold flex items-center gap-2 text-red-600">
                <MdOutlineSick /> রোগ নির্ণয়
              </h3>
              <p className="text-gray-700 mt-1">
                {item.diagnosis}
              </p>
            </div>

            {/* MEDICINES */}
            <div className="mb-3">
              <h3 className="font-semibold flex items-center gap-2 text-blue-600">
                <FaPills /> ওষুধ
              </h3>

              <ul className="list-disc ml-5 text-gray-700">
                {(item.medicines || []).map((med, i) => (
                  <li key={i}>{med}</li>
                ))}
              </ul>
            </div>

            {/* INSTRUCTIONS */}
            <div className="mb-3">
              <h3 className="font-semibold flex items-center gap-2 text-green-600">
                <MdOutlineDescription /> নির্দেশনা
              </h3>
              <p className="text-gray-600">
                {item.instructions}
              </p>
            </div>

            {/* NOTES */}
            <div className="bg-blue-50 p-3 rounded-lg">
              <h3 className="font-semibold flex items-center gap-2 text-blue-700">
                <FaNotesMedical /> নোট
              </h3>
              <p className="text-gray-600 text-sm">
                {item.notes}
              </p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Prescriptions;