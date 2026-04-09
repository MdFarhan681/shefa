import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import DoctorCard from "../DoctorCard/DoctorCard";
import { ArrowRight } from "lucide-react";

export default function DoctorSlider() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/doctors")
      .then(res => res.json())
      .then(data => setDoctors(data))
      .catch(err => console.error(err));
  }, []);

  return (
   <section className="w-full mx-auto "> 
      
      {/* Section Title */}
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
<div className="md:pr-15 ">  <Swiper
  modules={[Autoplay,Pagination,Navigation]}
  spaceBetween={20}
  loop={false} // ✅ FIXED
  autoplay={{
    delay: 3500,
    disableOnInteraction: true,
  }}

  pagination={{ clickable: true }}
  grabCursor={true}
  breakpoints={{
    0: { slidesPerView: 1 },
    480: { slidesPerView: 2 },
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


</div>
      


<div className=" flex justify-end w-full "> <button className="my-btn !mr-0 mt-4 flex items-center gap-2">
  আরও ডাক্তার দেখুন
  <ArrowRight size={18} />
</button></div>

    </section>
  );
}




   