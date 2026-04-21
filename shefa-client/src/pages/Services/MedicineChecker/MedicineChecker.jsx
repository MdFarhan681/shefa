import React, { useState } from "react";
import Scanner from "../../../components/Scanner/Scanner.jsx";
import ResultBox from "../../../components/ResultBox/ResultBox.jsx";
import { checkMedicine } from "../../../utils/checkMedicine.js";

const MedicineChecker = () => {
  const [result, setResult] = useState({});
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = () => {
    // ❗ validation first
    if (!result.medicineName || !result.companyName) {
      setStatus({
        status: "ERROR",
        message: "Please enter medicine & company"
      });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const res = checkMedicine(
        result.medicineName,
        result.companyName
      );

      setStatus(res);
      setLoading(false);
    }, 800);
  };

  return (
    <div className=" px-[7%]">
    <div className="mt-6 bg-white shadow-sm rounded-2xl p-6 border border-gray-100 px-[7%] mx-auto">

         <h1>💊 Medicine Checker</h1>

      <Scanner setResult={setResult} />

      <button
        onClick={handleCheck}
        disabled={loading}
        className=" my-btn"
      >
        {loading ? "Checking..." : "Check Medicine"}
      </button>
     </div>

      <ResultBox
        result={result}
        status={status}
        setResult={setResult}
        loading={loading}
      />
    </div>
  );
};

export default MedicineChecker;