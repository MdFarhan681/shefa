"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "অনলাইন ডাক্তারের পরামর্শের খরচ কত?",
    answer:
      "ডাক্তারের ধরন ও সেবার ওপর পরামর্শ ফি নির্ভর করে। Amader Doctor সাশ্রয়ী ও স্বচ্ছ মূল্যে অনলাইন চিকিৎসা সেবা দেওয়ার চেষ্টা করে।"
  },
  {
    question: "আপনারা কি স্বাস্থ্য বীমা গ্রহণ করেন?",
    answer:
      "বর্তমানে Amader Doctor সরাসরি স্বাস্থ্য বীমা গ্রহণ করে না। তবে পরামর্শের রসিদ আপনার বীমা প্রতিষ্ঠানে জমা দিয়ে রিম্বার্সমেন্ট নেওয়া যেতে পারে।"
  },
  {
    question: "কোন কোন রোগের জন্য অনলাইন চিকিৎসা নেওয়া যায়?",
    answer:
      "সাধারণ অসুস্থতা, ফলো-আপ চিকিৎসা, দীর্ঘমেয়াদি রোগ ব্যবস্থাপনা, মানসিক স্বাস্থ্য পরামর্শ এবং সাধারণ মেডিকেল পরামর্শের জন্য আমাদের ডাক্তারেরা সেবা প্রদান করেন।"
  },
  {
    question: "Amader Doctor কি ২৪/৭ সেবা দেয়?",
    answer:
      "রোগীরা যেকোনো সময় পরামর্শের অনুরোধ করতে পারেন। তবে ডাক্তারের প্রাপ্যতা তাদের সময়সূচির ওপর নির্ভর করে।"
  },
  {
    question: "অনলাইন চিকিৎসা কি নিরাপদ?",
    answer:
      "হ্যাঁ, Amader Doctor রোগীর তথ্যের গোপনীয়তা ও নিরাপত্তা নিশ্চিত করতে আধুনিক ডিজিটাল নিরাপত্তা ব্যবস্থা ব্যবহার করে।"
  }
];

const FAQSection = () => {
  const [mounted, setMounted] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="w-full mx-auto mb-10">
      <div className="text-center">
        <p className="inline-block bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full mb-2">
          প্রশ্ন-উত্তর
        </p>

        <h2 className="text-3xl font-semibold text-center mb-2">
          সাধারণ জিজ্ঞাসা
        </h2>

        <p className="text-center text-gray-500 mb-10">
          আপনার প্রায়শই জিজ্ঞাসিত প্রশ্নগুলোর উত্তর এখানে খুঁজে পাবেন
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-xl p-6 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-blue-500"
          >
            <button
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
              className="flex justify-between items-center w-full text-left"
            >
              <span className="text-lg transition-colors duration-300">
                {faq.question}
              </span>

              <ChevronDown
                className={`transition-transform duration-300 text-gray-500 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            {openIndex === index && (
              <p className="mt-4 text-gray-600 leading-relaxed">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;