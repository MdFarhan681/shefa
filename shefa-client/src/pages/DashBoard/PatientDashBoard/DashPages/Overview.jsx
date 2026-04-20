import React, { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import toast from "react-hot-toast";

const Overview = () => {
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

  const m = data?.medicalHistory || {};

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="bg-white p-5 rounded-2xl shadow">
        <h1 className="text-2xl font-bold text-blue-600">
          স্বাগতম, {data?.name || "ব্যবহারকারী"}
        </h1>
        <p className="text-gray-500">
          আপনার স্বাস্থ্য ড্যাশবোর্ড ওভারভিউ
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="bg-blue-100 p-4 rounded-xl shadow">
          <p className="text-sm text-gray-600">মোট রোগ</p>
          <h2 className="text-2xl font-bold">
            {(m.pastHistory || []).length}
          </h2>
        </div>

        <div className="bg-green-100 p-4 rounded-xl shadow">
          <p className="text-sm text-gray-600">ওষুধ</p>
          <h2 className="text-2xl font-bold">
            {(m.medications || []).length}
          </h2>
        </div>

        <div className="bg-yellow-100 p-4 rounded-xl shadow">
          <p className="text-sm text-gray-600">অ্যালার্জি</p>
          <h2 className="text-2xl font-bold">
            {(m.allergies || []).length}
          </h2>
        </div>

        <div className="bg-purple-100 p-4 rounded-xl shadow">
          <p className="text-sm text-gray-600">রিপোর্ট</p>
          <h2 className="text-2xl font-bold">
            {(m.reports || []).length}
          </h2>
        </div>
      </div>

      {/* MEDICAL SUMMARY */}
      <div className="grid md:grid-cols-2 gap-4">

        {/* BASIC INFO */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-bold mb-3">ব্যক্তিগত তথ্য</h2>
          <p><b>নাম:</b> {data?.name}</p>
          <p><b>ইমেইল:</b> {data?.email}</p>
          <p><b>রোল:</b> {data?.role}</p>
        </div>

        {/* QUICK HISTORY */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-bold mb-3">পূর্বের রোগ</h2>

          {(m.pastHistory || []).length ? (
            <ul className="list-disc ml-5">
              {m.pastHistory.slice(0, 3).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">কোনো তথ্য নেই</p>
          )}
        </div>

        {/* MEDICATION */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-bold mb-3">বর্তমান ওষুধ</h2>

          {(m.medications || []).length ? (
            <ul className="list-disc ml-5">
              {m.medications.slice(0, 3).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">কোনো তথ্য নেই</p>
          )}
        </div>

        {/* ALERT BOX */}
        <div className="bg-red-50 border border-red-200 p-5 rounded-xl shadow">
          <h2 className="font-bold text-red-600 mb-2">
            ⚠️ স্বাস্থ্য সতর্কতা
          </h2>

          {m.allergies?.length ? (
            <p>
              আপনার অ্যালার্জি আছে:{" "}
              <b>{m.allergies.join(", ")}</b>
            </p>
          ) : (
            <p className="text-gray-400">কোনো ঝুঁকি পাওয়া যায়নি</p>
          )}
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="font-bold mb-3">সাম্প্রতিক কার্যক্রম</h2>

        <ul className="space-y-2 text-gray-600">
          <li>✔ মেডিকেল ইতিহাস দেখা হয়েছে</li>
          <li>✔ প্রোফাইল আপডেট করা হয়েছে</li>
          <li>✔ রিপোর্ট আপলোড করা হয়েছে</li>
        </ul>
      </div>

    </div>
  );
};

export default Overview;