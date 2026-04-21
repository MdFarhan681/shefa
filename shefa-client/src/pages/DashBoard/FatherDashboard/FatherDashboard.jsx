import React from "react";
import {
  FaUser,
  FaHeartbeat,
  FaFileMedical,
} from "react-icons/fa";
import { MdOutlineBloodtype, MdMonitorHeart } from "react-icons/md";

const FatherDashboard = () => {
  const father = {
    name: "আব্দুল করিম",
    age: 58,
    gender: "পুরুষ",
    bloodGroup: "B+",
    height: "5'6\"",
    weight: "72 কেজি",
    status: "স্থিতিশীল",
    riskLevel: "মাঝারি ঝুঁকি",
    doctor: "ডা. রহমান (কার্ডিওলজি)",
    lastVisit: "2026-04-10",
    diseases: ["ডায়াবেটিস", "উচ্চ রক্তচাপ"],
  };

  const reports = [
    { title: "ব্লাড সুগার টেস্ট", date: "2026-04-10" },
    { title: "হার্ট চেকআপ (ECG)", date: "2026-03-20" },
    { title: "হৃদরোগ রিপোর্ট", date: "2026-02-15" },
  ];

  return (
    <div className="min-h-screen bg-gray-100/30 p-6 md:p-10">

      {/* HEADER */}
      <div className="bg-white border-l-8 border-blue-500 shadow rounded-xl p-5 mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-black flex items-center gap-2">
          <FaUser className="text-blue-600" />
          রোগীর মেডিকেল রেকর্ড
        </h1>
        <p className="text-gray-600 text-sm">
          হাসপাতাল EMR সিস্টেম • পরিবারের সদস্য প্রোফাইল
        </p>
      </div>

      {/* GRID */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* 👤 PERSONAL INFO */}
        <div className="bg-white rounded-xl shadow p-5 border-t-4 border-blue-500">

          <h2 className="text-black font-bold mb-4 flex items-center gap-2">
            <FaUser className="text-blue-600" />
            ব্যক্তিগত তথ্য
          </h2>

          <div className="space-y-2 text-gray-800 text-sm">
            <p><span className="font-semibold text-black">নাম:</span> {father.name}</p>
            <p><span className="font-semibold text-black">বয়স:</span> {father.age}</p>
            <p><span className="font-semibold text-black">লিঙ্গ:</span> {father.gender}</p>
            <p><span className="font-semibold text-black">উচ্চতা:</span> {father.height}</p>
            <p><span className="font-semibold text-black">ওজন:</span> {father.weight}</p>
          </div>
        </div>

        {/* ❤️ HEALTH STATUS */}
        <div className="bg-white rounded-xl shadow p-5 border-t-4 border-blue-600">

          <h2 className="text-black font-bold mb-4 flex items-center gap-2">
            <FaHeartbeat className="text-blue-600" />
            স্বাস্থ্য অবস্থা
          </h2>

          {/* STATUS BADGES */}
          <div className="flex flex-wrap gap-2 mb-4">

            <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-semibold">
              {father.status}
            </span>

            <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700 font-semibold">
              {father.riskLevel}
            </span>

          </div>

          <p className="text-sm text-gray-800">
            <span className="font-semibold text-black">ডাক্তার:</span> {father.doctor}
          </p>

          <p className="text-sm text-gray-800">
            <span className="font-semibold text-black">শেষ ভিজিট:</span> {father.lastVisit}
          </p>

          {/* DISEASES */}
          <div className="mt-4">
            <h3 className="text-sm font-bold text-blue-600">
              সক্রিয় রোগসমূহ
            </h3>

            <ul className="mt-2 space-y-1 text-gray-800 text-sm list-disc ml-5">
              {father.diseases.map((d, i) => (
                <li key={i} className="text-red-600 font-medium">
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 🩸 MEDICAL INFO */}
        <div className="bg-white rounded-xl shadow p-5 border-t-4 border-blue-500">

          <h2 className="text-black font-bold mb-4 flex items-center gap-2">
            <MdOutlineBloodtype className="text-blue-600" />
            মেডিকেল তথ্য
          </h2>

          <p className="text-sm text-gray-800">
            <span className="font-semibold text-black">রক্তের গ্রুপ:</span> {father.bloodGroup}
          </p>

          <div className="mt-4 flex items-center gap-2 text-blue-600 text-sm font-medium">
            <MdMonitorHeart />
            মনিটরিং চলছে (Active)
          </div>
        </div>

      </div>

      {/* REPORTS */}
      <div className="mt-6 bg-white rounded-xl shadow p-5 border-l-8 border-blue-500">

        <h2 className="text-black font-bold mb-4 flex items-center gap-2">
          <FaFileMedical className="text-blue-600" />
          মেডিকেল রিপোর্টসমূহ
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          {reports.map((r, i) => (
            <div
              key={i}
              className="border rounded-lg p-4 bg-gray-50 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-black">
                {r.title}
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                📅 {r.date}
              </p>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default FatherDashboard;