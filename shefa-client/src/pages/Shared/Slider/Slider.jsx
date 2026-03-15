
import React, { useEffect, useState } from "react";

const slides = [
  {
    image:
      "https://img.freepik.com/premium-photo/home-patient-with-tablet-consulting-doctor-support-help-assistance-medical-problem-telehealth-communication-online-consultation-with-medicine-healthcare-expert-talking-sick-client_590464-84817.jpg?semt=ais_hybrid&w=740&q=80",
    title: "অনলাইন ডাক্তারের পরামর্শ",
    subtitle: "ঘরে বসেই বিশেষজ্ঞ ডাক্তারের সাথে কথা বলুন",
    button: "পরামর্শ নিন",
  },
  {
    image:
      "https://www.shutterstock.com/image-photo/portrait-shot-adult-muslim-doctor-260nw-1957199338.jpg",
    title: "বিশ্বাসযোগ্য চিকিৎসা",
    subtitle: "নিবন্ধিত ও অভিজ্ঞ ডাক্তার",
    button: "ডাক্তার দেখুন",
  },
  {
    image:
      "https://risingkashmir.blr1.digitaloceanspaces.com/wp-content/uploads/2024/04/05002151/doctor.jpg",
    title: "২৪/৭ সেবা",
    subtitle: "যেকোনো সময় স্বাস্থ্য সহায়তা",
    button: "এখনই শুরু করুন",
  },
];

export default function ResponsiveSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full">
      <div
        className="relative w-full rounded-2xl overflow-hidden shadow-lg
        h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px]"
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              active === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-center">
              <div className="px-5 sm:px-10 max-w-xl">
                <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
                  {slide.title}
                </h2>

                <p className="text-white/90 text-sm sm:text-base mb-5">
                  {slide.subtitle}
                </p>

                <button className="my-btn">{slide.button}</button>
              </div>
            </div>
          </div>
        ))}

        {/* Dots */}
        <div className="absolute bottom-3 w-full flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-2.5 h-2.5 rounded-full ${
                active === i ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}