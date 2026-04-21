import React, { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";

const MedicalHistory = () => {
  const { user: firebaseUser } = useAuth(); // Firebase user

  const [user, setUser] = useState(null); // MongoDB user
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch MongoDB user using Firebase email
  useEffect(() => {
    if (!firebaseUser?.email) return;

    setLoading(true);

    fetch(`https://shefa-server.vercel.app/users/${firebaseUser.email}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data); // ✅ full MongoDB user
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [firebaseUser?.email]);

  // 🛡️ safe fallback
  const m = user?.medicalHistory || {};

  // convert to array safely
  const makeArray = (value) => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  };

  const pastHistory = makeArray(m.pastHistory);
  const medications = makeArray(m.medications);
  const allergies = makeArray(m.allergies);
  const infectious = makeArray(m.infectious);
  const reports = makeArray(m.reports);

  if (loading) {
    return (
      <div className="text-center mt-10">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

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
      </div>

      {/* USER INFO */}
      <div className="bg-white p-5 rounded-xl shadow mb-5">
        <h2 className="font-bold text-lg mb-3">মূল তথ্য</h2>

        <p><b>নাম:</b> {user?.displayName || "নেই"}</p>
        <p><b>ইমেইল:</b> {user?.email || "নেই"}</p>
        <p><b>রোল:</b> {user?.role || "নেই"}</p>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-5">

        {/* Past History */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-bold mb-3">পূর্বের রোগ</h2>

          {pastHistory.length ? (
            <ul className="list-disc ml-5">
              {pastHistory.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">কোনো তথ্য নেই</p>
          )}
        </div>

        {/* Medications */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-bold mb-3">বর্তমান ওষুধ</h2>

          {medications.length ? (
            <ul className="list-disc ml-5">
              {medications.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">কোনো তথ্য নেই</p>
          )}
        </div>

        {/* Allergies */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-bold mb-3">অ্যালার্জি</h2>

          {allergies.length ? (
            <ul className="list-disc ml-5">
              {allergies.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">কোনো তথ্য নেই</p>
          )}
        </div>

        {/* Infectious */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-bold mb-3">সংক্রামক রোগ</h2>

          {infectious.length ? (
            <ul className="list-disc ml-5">
              {infectious.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">কোনো তথ্য নেই</p>
          )}
        </div>

        {/* Family History */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-bold mb-3">পারিবারিক ইতিহাস</h2>
          <p>{m.familyHistory || "কোনো তথ্য নেই"}</p>
        </div>

        {/* Immunization */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-bold mb-3">টিকা ইতিহাস</h2>
          <p>{m.immunization || "কোনো তথ্য নেই"}</p>
        </div>

        {/* Reports */}
        <div className="bg-white p-5 rounded-xl shadow md:col-span-2">
          <h2 className="font-bold mb-3">রিপোর্ট</h2>

          {reports.length ? (
            <ul className="list-disc ml-5 mb-3">
              {reports.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">কোনো রিপোর্ট নেই</p>
          )}

          {/* Report Image */}
          {m.reportImage && (
            <img
              src={m.reportImage}
              alt="Report"
              className="w-full max-w-md rounded-lg border mt-3"
            />
          )}
        </div>

      </div>
    </div>
  );
};

export default MedicalHistory;