import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import DoctorCard from "../DoctorCard/DoctorCard";
import { ArrowRight, Loader } from "lucide-react";

const API_URL = "http://localhost:3000";

export default function DoctorSlider() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${API_URL}/doctors`);
        const data = await res.json();

        setDoctors(data.doctors || data || []);
      } catch (err) {
        console.error("Fetch error:", err);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <section className="w-full mx-auto">
      <div className="mb-12 text-center">
        <p className="inline-block bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full mb-2">
          অনলাইন ডাক্তারগণ
        </p>

        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
          এই মুহূর্তে আপনাদের সেবায় উপলব্ধ
        </h1>

        <p className="text-gray-600 text-base lg:text-lg">
          ঘরে বসে অনলাইনে বিশেষজ্ঞ ডাক্তারের পরামর্শ নিন
        </p>
      </div>

      {loading ? (
        <div className="h-40 flex justify-center items-center">

          <Loader className="animate-spin text-gray-500" size={32} />
        </div>
      ) : (
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={15}
          slidesPerView={5}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
           breakpoints={{
    320: { slidesPerView: 1 },
    640: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 4 },
    1280: { slidesPerView: 5 },
           }}
        >
          {doctors.slice(0, 7).map((doctor) => (
            <SwiperSlide key={doctor._id}>
              <DoctorCard doctor={doctor} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div className="flex justify-end mt-4">
        <button className="my-btn flex items-center gap-2">
          আরও ডাক্তার দেখুন <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
