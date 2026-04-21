import React from "react";
import { useForm } from "react-hook-form";

const MedicalHistoryForm = ({ onClose, onSave }) => {
  const { register, handleSubmit, reset } = useForm();

  // ✅ Convert image to base64 + submit
  const submitData = (data) => {
    const file = data.reportImage?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const finalData = {
          ...data,
          reportImage: reader.result, // ✅ base64 string
        };

        onSave(finalData);
        reset();
        onClose();
      };

      reader.readAsDataURL(file);
    } else {
      const finalData = {
        ...data,
        reportImage: "",
      };

      onSave(finalData);
      reset();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-[95%] md:w-[700px] p-5 rounded-xl max-h-[90vh] overflow-y-auto">

        <h2 className="text-xl font-bold mb-4 text-center">
          🏥 মেডিকেল ইতিহাস ফর্ম
        </h2>

        <form onSubmit={handleSubmit(submitData)} className="space-y-6">

          {/* 🩺 পূর্বের রোগ */}
          <div>
            <p className="font-semibold mb-2">পূর্বের রোগসমূহ</p>

            <div className="grid grid-cols-2 gap-2 text-sm mb-2">
              <label><input type="checkbox" {...register("pastHistory")} value="ডায়াবেটিস" /> ডায়াবেটিস</label>
              <label><input type="checkbox" {...register("pastHistory")} value="উচ্চ রক্তচাপ" /> উচ্চ রক্তচাপ</label>
              <label><input type="checkbox" {...register("pastHistory")} value="অ্যাজমা" /> অ্যাজমা</label>
              <label><input type="checkbox" {...register("pastHistory")} value="হার্ট রোগ" /> হার্ট রোগ</label>
              <label><input type="checkbox" {...register("pastHistory")} value="কোনোটি না" /> কোনোটি না</label>
            </div>

            <textarea
              {...register("pastHistoryNote")}
              className="textarea textarea-bordered w-full"
              placeholder="অন্যান্য রোগ লিখুন..."
            />
          </div>

          {/* 💊 ওষুধ */}
          <div>
            <p className="font-semibold mb-2">বর্তমান ওষুধ</p>

            <div className="grid grid-cols-2 gap-2 text-sm mb-2">
              <label><input type="checkbox" {...register("medications")} value="ইনসুলিন" /> ইনসুলিন</label>
              <label><input type="checkbox" {...register("medications")} value="বিপি ওষুধ" /> বিপি ওষুধ</label>
              <label><input type="checkbox" {...register("medications")} value="ব্যথার ওষুধ" /> ব্যথার ওষুধ</label>
              <label><input type="checkbox" {...register("medications")} value="অ্যান্টিবায়োটিক" /> অ্যান্টিবায়োটিক</label>
              <label><input type="checkbox" {...register("medications")} value="কোনোটি না" /> কোনোটি না</label>
            </div>

            <textarea
              {...register("medicationsNote")}
              className="textarea textarea-bordered w-full"
              placeholder="অন্যান্য ওষুধ লিখুন..."
            />
          </div>

          {/* ⚠️ অ্যালার্জি */}
          <div>
            <p className="font-semibold mb-2">অ্যালার্জি</p>

            <div className="grid grid-cols-2 gap-2 text-sm mb-2">
              <label><input type="checkbox" {...register("allergies")} value="পেনিসিলিন" /> পেনিসিলিন</label>
              <label><input type="checkbox" {...register("allergies")} value="ধুলো" /> ধুলো</label>
              <label><input type="checkbox" {...register("allergies")} value="খাবার" /> খাবার</label>
              <label><input type="checkbox" {...register("allergies")} value="পরাগ" /> পরাগ</label>
              <label><input type="checkbox" {...register("allergies")} value="কোনোটি না" /> কোনোটি না</label>
            </div>

            <textarea
              {...register("allergiesNote")}
              className="textarea textarea-bordered w-full"
              placeholder="অ্যালার্জির বিস্তারিত লিখুন..."
            />
          </div>

          {/* 👨‍👩‍👧 পারিবারিক ইতিহাস */}
          <div>
            <p className="font-semibold mb-2">পারিবারিক রোগ ইতিহাস</p>

            <textarea
              {...register("familyHistory")}
              className="textarea textarea-bordered w-full"
              placeholder="যেমন: বাবা ডায়াবেটিস, মা উচ্চ রক্তচাপ..."
            />
          </div>

          {/* 🦠 সংক্রামক রোগ */}
          <div>
            <p className="font-semibold mb-2">সংক্রামক রোগ</p>

            <textarea
              {...register("infectious")}
              className="textarea textarea-bordered w-full"
              placeholder="TB, Hepatitis, COVID ইত্যাদি"
            />
          </div>

          {/* 💉 টিকা ইতিহাস */}
          <div>
            <p className="font-semibold mb-2">টিকা ইতিহাস</p>

            <textarea
              {...register("immunization")}
              className="textarea textarea-bordered w-full"
              placeholder="COVID, টিটেনাস, হেপাটাইটিস ইত্যাদি"
            />
          </div>

          {/* 📊 রিপোর্ট */}
          <div>
            <p className="font-semibold mb-2">রিপোর্ট</p>

            <div className="grid grid-cols-2 gap-2 text-sm mb-2">
              <label><input type="checkbox" {...register("reports")} value="রক্ত পরীক্ষা" /> রক্ত পরীক্ষা</label>
              <label><input type="checkbox" {...register("reports")} value="এক্স-রে" /> এক্স-রে</label>
              <label><input type="checkbox" {...register("reports")} value="MRI" /> MRI</label>
              <label><input type="checkbox" {...register("reports")} value="ECG" /> ECG</label>
              <label><input type="checkbox" {...register("reports")} value="কোনোটি না" /> কোনোটি না</label>
            </div>

            {/* 📷 Image Upload */}
            <input
              type="file"
              accept="image/*"
              {...register("reportImage")}
              className="file-input file-input-bordered w-full"
            />

            <textarea
              {...register("reportsNote")}
              className="textarea textarea-bordered w-full mt-2"
              placeholder="রিপোর্টের অতিরিক্ত তথ্য লিখুন..."
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-2">
            <button type="submit" className="btn flex-1 bg-blue-600 text-white">
              সেভ করুন
            </button>

            <button
              type="button"
              onClick={onClose}
              className="btn flex-1 bg-gray-300"
            >
              বাতিল
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default MedicalHistoryForm;