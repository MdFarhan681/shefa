"use client";
import { useEffect, useState } from "react";

const Consultation = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="w-full mx-auto">
      {/* Section Title */}
      <div className="text-center mb-12">
        <p className="inline-block bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full mb-2">
          সহজ প্রক্রিয়া
        </p>

        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
          কিভাবে আমাদের প্ল্যাটফর্ম কাজ করে?
        </h2>

        <p className="text-gray-600 text-base lg:text-lg">
          রেজিস্ট্রেশন থেকে প্রথম ভিডিও কনসালটেশন পর্যন্ত, আমরা প্রক্রিয়াটিকে
          সহজ করেছি।
        </p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
        {/* Video */}
        <div
          className="relative w-full 
          h-[240px] sm:h-[320px] md:h-[420px] 
          lg:h-[420px]
          rounded-2xl 
          overflow-hidden shadow-lg"
        >
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/0rfdcGF7YJ4?autoplay=1&mute=1&rel=0"
            title="Online doctor consultation video call"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Steps */}
        <div className="space-y-6">
          <Step
            title="আপনার অ্যাকাউন্ট তৈরি করুন"
            desc="সহজেই সাইন আপ করুন এবং শুরু করার জন্য আপনার প্রাথমিক প্রোফাইল পূরণ করুন।"
          />

          <Step
            title="ডাক্তার নির্বাচন করুন"
            desc="নিশ্চিত ডাক্তারদের ব্রাউজ করুন এবং আপনার জন্য সঠিক বিশেষজ্ঞ নির্বাচন করুন।"
          />

          <Step
            title="অ্যাপয়েন্টমেন্ট বুক করুন"
            desc="সুবিধাজনক সময় বেছে নিন এবং অনলাইনে আপনার অ্যাপয়েন্টমেন্ট নিশ্চিত করুন।"
          />

          <Step
            title="ভিডিও কনসালটেশন শুরু করুন"
            desc="নিরাপদ ভিডিও কল যোগ করুন এবং আপনার ডাক্তারকে পরামর্শ করুন।"
          />
        </div>
      </div>
    </section>
  );
};

const Step = ({ title, desc }) => (
  <div className="flex gap-4">
    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
      ✓
    </div>

    <div>
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  </div>
);

export default Consultation;