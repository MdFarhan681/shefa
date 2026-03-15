import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import DoctorCard from "../DoctorCard/DoctorCard";

export default function DoctorSlider({ doctors = [] }) {
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={20}
      loop={true}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      breakpoints={{
        0: { slidesPerView: 1 },
        500: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      }}
    >
      {doctors.map((doctor) => (
        <SwiperSlide key={doctor.id}>
          <DoctorCard doctor={doctor} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}