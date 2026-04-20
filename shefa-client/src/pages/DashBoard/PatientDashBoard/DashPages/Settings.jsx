import React, { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import toast from "react-hot-toast";
import { FaUser, FaLock, FaBell, FaTrash } from "react-icons/fa";

const Settings = () => {
  const { user } = useAuth();

  const [notifications, setNotifications] = useState(true);
  const [emailAlert, setEmailAlert] = useState(true);

  const handleSave = () => {
    toast.success("সেটিংস সেভ করা হয়েছে");
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50">

      {/* HEADER */}
      <div className="bg-white p-5 rounded-2xl shadow mb-6">
        <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          ⚙️ সেটিংস
        </h1>
        <p className="text-gray-500">
          আপনার অ্যাকাউন্ট ও পছন্দসমূহ নিয়ন্ত্রণ করুন
        </p>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-5">

        {/* PROFILE */}
        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="font-bold flex items-center gap-2 mb-4">
            <FaUser className="text-blue-600" /> প্রোফাইল তথ্য
          </h2>

          <div className="flex items-center gap-3">
            <img
              src={user?.photoURL}
              className="w-14 h-14 rounded-full border"
            />

            <div>
              <p className="font-semibold">{user?.displayName}</p>
              <p className="text-gray-500 text-sm">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* SECURITY */}
        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="font-bold flex items-center gap-2 mb-4">
            <FaLock className="text-green-600" /> সিকিউরিটি
          </h2>

          <button className="w-full py-2 bg-green-100 text-green-700 rounded-lg mb-2">
            পাসওয়ার্ড পরিবর্তন
          </button>

          <button className="w-full py-2 bg-blue-100 text-blue-700 rounded-lg">
            2FA চালু করুন
          </button>
        </div>

        {/* NOTIFICATIONS */}
        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="font-bold flex items-center gap-2 mb-4">
            <FaBell className="text-yellow-500" /> নোটিফিকেশন
          </h2>

          <label className="flex justify-between items-center mb-3">
            <span>Push Notification</span>
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="toggle toggle-primary"
            />
          </label>

          <label className="flex justify-between items-center">
            <span>Email Alert</span>
            <input
              type="checkbox"
              checked={emailAlert}
              onChange={() => setEmailAlert(!emailAlert)}
              className="toggle toggle-primary"
            />
          </label>
        </div>

        {/* DANGER ZONE */}
        <div className="bg-white p-5 rounded-2xl shadow border border-red-200">
          <h2 className="font-bold flex items-center gap-2 mb-4 text-red-600">
            <FaTrash /> অ্যাকাউন্ট ডিলিট
          </h2>

          <p className="text-gray-500 text-sm mb-3">
            এটি স্থায়ীভাবে আপনার অ্যাকাউন্ট মুছে ফেলবে
          </p>

          <button
            onClick={() => toast.error("ফিচার এখনো চালু হয়নি")}
            className="w-full py-2 bg-red-100 text-red-600 rounded-lg"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* SAVE BUTTON */}
      <div className="mt-6">
        <button
          onClick={handleSave}
          className="w-full md:w-1/3 py-3 bg-blue-600 text-white rounded-xl font-semibold"
        >
          সেটিংস সেভ করুন
        </button>
      </div>
    </div>
  );
};

export default Settings;