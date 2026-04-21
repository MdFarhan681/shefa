import React from "react";
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from "react-icons/fa";

const ResultBox = ({ result, status, setResult, loading, image }) => {

  const getStatusStyle = () => {
    if (status?.status === "REAL")
      return {
        color: "text-green-600",
        bg: "bg-green-100",
        icon: <FaCheckCircle className="text-green-600" />
      };

    if (status?.status === "UNKNOWN")
      return {
        color: "text-yellow-600",
        bg: "bg-yellow-100",
        icon: <FaExclamationTriangle className="text-yellow-600" />
      };

    if (status?.status === "ERROR")
      return {
        color: "text-red-600",
        bg: "bg-red-100",
        icon: <FaTimesCircle className="text-red-600" />
      };

    return {
      color: "text-gray-500",
      bg: "bg-gray-100",
      icon: null
    };
  };

  const style = getStatusStyle();

  return (
    <div className="mt-6 bg-white shadow-xl rounded-2xl p-6 border border-gray-100 px-[7%]">

     
      {image && (
        <div className="mb-4">
          <img
            src={URL.createObjectURL(image)}
            alt="medicine"
            className="w-full max-h-48 object-cover rounded-xl border"
          />
        </div>
      )}

      {/* 🔄 লোডিং */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-6">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-blue-600 font-medium">
            যাচাই করা হচ্ছে...
          </p>
        </div>
      )}

      {/* ✏️ ইনপুট ফিল্ড */}
      {!loading && (
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <input
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            value={result?.medicineName || ""}
            onChange={(e) =>
              setResult({ ...result, medicineName: e.target.value })
            }
            placeholder="ওষুধের নাম লিখুন"
          />

          <input
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            value={result?.companyName || ""}
            onChange={(e) =>
              setResult({ ...result, companyName: e.target.value })
            }
            placeholder="কোম্পানির নাম লিখুন"
          />
        </div>
      )}

      {/* 📊 ডিটেক্ট করা তথ্য */}
      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        <p className="text-sm text-gray-500 mb-1">🔍 শনাক্তকৃত তথ্য</p>
        <p className="font-medium">💊 {result?.medicineName || "—"}</p>
        <p className="font-medium">🏢 {result?.companyName || "—"}</p>
      </div>

      {/* 🎯 ফলাফল */}
      <div className={`flex items-center justify-between p-4 rounded-xl ${style.bg}`}>

        <div className="flex items-center gap-3">
          {style.icon}
          <div>
            <p className="text-sm text-gray-600">ভেরিফিকেশন ফলাফল</p>
            <p className={`font-semibold ${style.color}`}>
              {status?.message || "এখনও কোনো ফলাফল নেই"}
            </p>
          </div>
        </div>

        {/* 📊 কনফিডেন্স */}
        {status && (
          <div className="text-right">
            <p className="text-xs text-gray-500">নির্ভরযোগ্যতা</p>
            <p className="font-semibold">
              {status.status === "REAL" ? "৯০%" :
               status.status === "UNKNOWN" ? "৫০%" :
               "২০%"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultBox;