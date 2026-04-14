import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const DeliveryForm = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    village: "",
    upazila: "",
    district: "",
    locationLink: "",
    latitude: "",
    longitude: "",
    prescription: null,
  });

  // ======================
  // HANDLE INPUT CHANGE
  // ======================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ======================
  // FILE HANDLER
  // ======================
  const handleFile = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, prescription: file });
  };

  // ======================
  // LOCATION
  // ======================
  const getLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Location not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );

          const data = await res.json();

          setForm((prev) => ({
            ...prev,
            village:
              data.address.village ||
              data.address.town ||
              data.address.city ||
              "",
            upazila:
              data.address.suburb ||
              data.address.state_district ||
              "",
            district: data.address.state || "",
            latitude,
            longitude,
            locationLink: `https://www.google.com/maps?q=${latitude},${longitude}`,
          }));

          toast.success("লোকেশন সেট হয়েছে");
        } catch {
          toast.error("লোকেশন আনতে সমস্যা হয়েছে");
        }
      },
      () => {
        toast.error("লোকেশন অনুমতি দিন");
      }
    );
  };

  // ======================
  // SUBMIT
  // ======================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.phone) {
      toast.error("সব তথ্য পূরণ করুন");
      return;
    }

    setTimeout(() => {
      toast.success("অর্ডার কনফার্ম হয়েছে");

      console.log(form);

      setForm({
        name: "",
        phone: "",
        village: "",
        upazila: "",
        district: "",
        locationLink: "",
        latitude: "",
        longitude: "",
        prescription: null,
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50/3 to-indigo-100/5 p-4">

      <Toaster position="top-center" />

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white/70 backdrop-blur-xl shadow-xl rounded-2xl p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">
          ঔষধ ডেলিভারি
        </h2>

        {/* NAME */}
        <input
          name="name"
          placeholder="আপনার নাম"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />

        {/* PHONE */}
        <input
          name="phone"
          placeholder="মোবাইল নাম্বার"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />

        {/* ADDRESS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <input
            name="upazila"
            placeholder="বাড়ির ঠিকানা (ঐচ্ছিক)"
           
            onChange={handleChange}
            className="p-3 border rounded-lg"
          />
          <input
            name="upazila"
            placeholder="গ্রাম/শহর"
            value={form.upazila}
            onChange={handleChange}
            className="p-3 border rounded-lg"
          />
          <input
            name="district"
            placeholder="জেলা"
            value={form.district}
            onChange={handleChange}
            className="p-3 border rounded-lg"
          />
        </div>

        {/* LOCATION BUTTON */}
        <button
          type="button"
          onClick={getLocation}
          className="w-full my-btn"
        >
          অটো লোকেশন সেট করুন
        </button>

        {/* MAP LINK */}
        <input
          name="locationLink"
          placeholder="Google Map link (optional)"
          value={form.locationLink}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />

        {/* MAP PREVIEW */}
        {form.locationLink && (
          <a
            href={form.locationLink}
            target="_blank"
            className="text-blue-600 text-sm underline"
          >
            ম্যাপে দেখুন
          </a>
        )}

        {/* ================= PRESCRIPTION SECTION ================= */}
 <div className="space-y-2">

  <label className="font-medium block">
    প্রেসক্রিপশনের ছবি
  </label>

  {/* ================= CAMERA ================= */}
  <input
    id="cameraInput"
    type="file"
    accept="image/*"
    capture="environment"
    onChange={handleFile}
    className="hidden"
  />

  <label
    htmlFor="cameraInput"
    className="w-full flex justify-center items-center gap-2 rounded-lg cursor-pointer hover:bg-gray-100 transition border border-gray-300 py-3 text-sm font-medium"
  >
    ছবি তুলুন (ক্যামেরা)
  </label>

  {/* ================= GALLERY ================= */}
  <input
    id="galleryInput"
    type="file"
    accept="image/*"
    onChange={handleFile}
    className="hidden"
  />

  <label
    htmlFor="galleryInput"
    className="w-full flex justify-center items-center gap-2 rounded-lg cursor-pointer hover:bg-gray-100 transition border border-gray-300 py-3 text-sm font-medium"
  >
     গ্যালারি থেকে ছবি নির্বাচন করুন
  </label>

  {/* ================= PREVIEW ================= */}
  {form.prescription && (
    <div className="mt-4 flex flex-col items-center gap-2">

      <img
        src={URL.createObjectURL(form.prescription)}
        alt="preview"
        className="w-32 h-32 object-cover rounded border"
      />

      <p className="text-green-600 text-sm">
        ছবি সিলেক্ট হয়েছে 
      </p>

    </div>
  )}

</div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="!w-full my-btn"
        >
          ডেলিভারি রিকুয়েস্ট পাঠান
        </button>

      </form>
    </div>
  );
};

export default DeliveryForm;