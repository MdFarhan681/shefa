import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../../../hooks/useAuth";

const fakeMedicalData = {
  name: "Md.Farhan Ishrak",
  email: "farhan@gmail.com",
  role: "patient",
  medicalHistory: {
    pastHistory: ["ডায়াবেটিস", "অ্যাজমা"],
    medications: ["ইনসুলিন"],
    allergies: ["ধুলো"],
    familyHistory: "বাবার ডায়াবেটিস আছে",
    infectious: ["COVID-19"],
    immunization: "COVID, টিটেনাস",
    reports: ["রক্ত পরীক্ষা"],
    reportImage: ""
  }
};

const MedicalHistory = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`https://shefa-server.vercel.app/users/${user.email}`)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch(() => {
        toast.error("ডাটা লোড করতে সমস্যা হয়েছে");
        setLoading(false);
      });
  }, [user?.email]);

  if (loading) {
    return (
      <div className="text-center mt-10">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  // 🧠 SAFE FALLBACK LOGIC (IMPORTANT FIX)
  const finalData = fakeMedicalData || data || {};
  const m = finalData?.medicalHistory || {};

  // 🛡️ SAFE ARRAYS (prevents undefined error)
  const pastHistory = m.pastHistory || [];
  const medications = m.medications || [];
  const allergies = m.allergies || [];
  const infectious = m.infectious || [];
  const reports = m.reports || [];

  return (
    <div className="min-h-screen bg-gray-50 p-5 md:p-10">

      {/* Header */}
      <div className="bg-white shadow-md rounded-xl p-5 mb-6">
        <h1 className="text-2xl font-bold text-blue-600">
          মেডিকেল ইতিহাস রিপোর্ট
        </h1>
        <p className="text-gray-500">
          রোগীর বিস্তারিত স্বাস্থ্য তথ্য
        </p>

        {/* Demo badge */}
        {!data && (
          <div className="mt-3 text-sm bg-yellow-100 text-yellow-700 p-2 rounded">
            ডেমো ডাটা দেখানো হচ্ছে (MongoDB ডাটা পাওয়া যায়নি)
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-5">

        {/* Basic Info */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-bold text-lg mb-3">মূল তথ্য</h2>
          <p><b>নাম:</b> {finalData.name}</p>
          <p><b>ইমেইল:</b> {finalData.email}</p>
          <p><b>রোল:</b> {finalData.role}</p>
        </div>

        {/* Past History */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-bold text-lg mb-3">পূর্বের রোগ</h2>
          {pastHistory.length ? (
            <ul className="list-disc ml-5">
              {pastHistory.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">কোনো তথ্য নেই</p>
          )}
        </div>

        {/* Medications */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-bold text-lg mb-3">বর্তমান ওষুধ</h2>
          {medications.length ? (
            <ul className="list-disc ml-5">
              {medications.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">কোনো তথ্য নেই</p>
          )}
        </div>

        {/* Allergies */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-bold text-lg mb-3">অ্যালার্জি</h2>
          {allergies.length ? (
            <ul className="list-disc ml-5">
              {allergies.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">কোনো তথ্য নেই</p>
          )}
        </div>

        {/* Family History */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-bold text-lg mb-3">পারিবারিক ইতিহাস</h2>
          <p>{m.familyHistory || "কোনো তথ্য নেই"}</p>
        </div>

        {/* Infectious */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-bold text-lg mb-3">সংক্রামক রোগ</h2>
          {infectious.length ? (
            <ul className="list-disc ml-5">
              {infectious.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">কোনো তথ্য নেই</p>
          )}
        </div>

        {/* Immunization */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-bold text-lg mb-3">টিকা ইতিহাস</h2>
          <p>{m.immunization || "কোনো তথ্য নেই"}</p>
        </div>

        {/* Reports */}
        <div className="bg-white p-5 rounded-xl shadow md:col-span-2">
          <h2 className="font-bold text-lg mb-3">রিপোর্ট</h2>

          {reports.length ? (
            <ul className="list-disc ml-5 mb-3">
              {reports.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">কোনো রিপোর্ট নেই</p>
          )}

          {/* Report Image */}
          {m.reportImage && (
            <img
              src={m.reportImage}
              alt="Report"
              className="w-full max-w-md rounded-lg border"
            />
          )}
        </div>

      </div>
    </div>
  );
};

export default MedicalHistory;