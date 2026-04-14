// DoctorDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import axios from "axios";
import femaleDoctor from "../../../assets/femaleDoctor.png";
import maleDoctor from "../../../assets/maleDoctor.png";

import {
  Star,
  Heart,
  Share2,
  CheckCircle,
  Clock,
  Users,
  Hash,
  MessageCircle,
} from "lucide-react";
import { FaFacebookF } from "react-icons/fa";
import Loading from "../../../components/Loading/Loading";

export default function DoctorDetailsPage() {
  const { id } = useParams();

  const [doctor, setDoctor] = useState({});
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("about");
  const [reviewText, setReviewText] = useState("");
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(20);

  // ✅ DEFAULT FALLBACK DATA
  const fallback = {
    name: "অজানা ডাক্তার",
    photo: "https://via.placeholder.com/500x500",
    specialist: "তথ্য পাওয়া যায়নি",
    experience: 0,
    institutions: "তথ্য পাওয়া যায়নি",
    rating: 0,
    totalReviews: 0,
    isVerified: false,
    availability: false,
    fee: "তথ্য পাওয়া যায়নি",
    about:
      "এই ডাক্তার একজন উচ্চ অভিজ্ঞতাসম্পন্ন হৃদরোগ বিশেষজ্ঞ, যার ২৫ বছরের বেশি রোগী সেবা অভিজ্ঞতা রয়েছে। তিনি হৃদরোগ, উচ্চ রক্তচাপ এবং কার্ডিয়াক সমস্যার ক্ষেত্রে বিশেষজ্ঞ।\nপ্রতিটি রোগীর প্রতি ব্যক্তিগত মনোযোগ প্রদান করে সুপরিকল্পিত চিকিৎসা নিশ্চিত করেন। নতুন এবং জটিল ক্ষেত্রে সর্বশেষ চিকিৎসা পদ্ধতি ব্যবহার করে রোগীদের দ্রুত আরোগ্য নিশ্চিত করা তার লক্ষ্য।",
    experienceDetails: [
      "সিনিয়র কনসালটেন্ট (কার্ডিওলজি) – ৮ বছর | খুলনা সিটি মেডিকেল কলেজ",
      "সহকারী অধ্যাপক (মেডিসিন) – ৫ বছর | বঙ্গবন্ধু মেডিকেল কলেজ",
      "রেজিস্ট্রার (কার্ডিয়াক বিভাগ) – ৪ বছর | ঢাকা মেডিকেল কলেজ",
      "মেডিকেল অফিসার – ৩ বছর | খুলনা জেনারেল হাসপাতাল",
    ],
    degrees: [
      "MBBS – ঢাকা মেডিকেল কলেজ",
      "MD (Cardiology) – বঙ্গবন্ধু মেডিকেল কলেজ",
      "FCPS (Cardiology) – Bangabandhu Sheikh Mujib Medical University",
      "FRCP (UK) – Royal College of Physicians, London",
      "BCS (Health Administration) – Bangladesh Civil Service",
    ],
    reviews: [
      {
        name: "রাহিম উদ্দিন",
        image:
          "https://static.vecteezy.com/system/resources/previews/003/316/958/non_2x/religious-muslim-man-praying-free-vector.jpg",
        comment:
          "ডাক্তার খুব মনোযোগ দিয়ে কথা শুনেন এবং সঠিক চিকিৎসা দেন। অনেক উপকার পেয়েছি।",
        rating: 5,
      },
      {
        name: "করিম শেখ",
        image:
          "https://img.freepik.com/premium-vector/muslim-man-avatar-holding-bag-illustration_591903-629.jpg?w=360",
        comment:
          "চিকিৎসা ভালো ছিল, তবে একটু অপেক্ষা করতে হয়েছে। তারপরও সন্তুষ্ট।",
        rating: 4,
      },
      {
        name: "সুমাইয়া আক্তার",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ1KkruwQUGHdYzl5AU3mN11wx0oSrfx3HAg&s",
        comment:
          "অনেক ভদ্র এবং অভিজ্ঞ ডাক্তার। রিপোর্ট ভালোভাবে বুঝিয়ে দিয়েছেন।",
        rating: 5,
      },
      {
        name: "মোঃ হাসান আলী",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvi1l7YaK7LCqdfQjmaK09kFInKVdZGxNHWw&s",
        comment:
          "সার্ভিস ভালো, কিন্তু সময় মেনে আসেননি। তবুও চিকিৎসা ভালো লেগেছে।",
        rating: 4,
      },
      {
        name: "নুসরাত জাহান",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAyqv6kr6hzSf_qoLh128h7yV8yg_QJHnwPA&s",
        comment:
          "আমি আগে অনেক জায়গায় দেখিয়েছি, কিন্তু এখানে এসে ভালো ফল পেয়েছি। ধন্যবাদ।",
        rating: 5,
      },
    ],
    schedule: [
      {
        day: "শনি-বৃহস্পতি",
        from: "১০:০০",
        to: "১৪:০০",
        location: "হাসপাতাল",
      },
    ],
    platformId: "DOC-1500",
    totalPatients: 135,
  };

  // ✅ FETCH DATA
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/doctors/${id}`);

        // merge fallback + api data
        const finalData = { ...fallback, ...res.data };

        setDoctor(finalData);
        setLikes(finalData.likes || 20);
      } catch (err) {
        console.error(err);
        setDoctor(fallback);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  if (loading) return <Loading></Loading>;

  // ================= ACTIONS =================
  const handleLikeToggle = () => {
    setLikes(liked ? likes - 1 : likes + 1);
    setLiked(!liked);
  };

  const shareToFacebook = () => {
    const url = window.location.href; // Current page URL
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank",
    );
  };

  // ================= CONTENT =================
  const renderContent = () => {
    const card = (content, i) => (
      <div key={i} className="card bg-base-100 shadow-md p-4 mb-3">
        {content}
      </div>
    );

    switch (activeTab) {
      case "experience":
        return doctor.experienceDetails.map((item, i) =>
          card(`${i + 1}. ${item}`, i),
        );

      case "reviews":
        return (
          <>
          {
            console.log("details page:", doctor)
          }
            {doctor.reviews?.length ? (
              doctor.reviews.map((r, i) =>
                card(
                  <div className="flex items-start gap-3">
                    {/* Profile image */}
                    <img
                      src={r.image} // <-- use r.image, not r.photo
                      alt={r.name}
                      className="w-12 h-12 border border-2 border-gray-300 rounded-full object-cover p-[3px]"
                    />

                    {/* Review content */}
                    <div>
                      <p className="font-semibold">{r.name}</p>
                      <p className="text-sm">{r.comment}</p>
                      <p className="text-yellow-500">⭐ {r.rating}</p>
                    </div>
                  </div>,
                  i,
                ),
              )
            ) : (
              <p>তথ্য পাওয়া যায়নি</p>
            )}

            <div className="mt-4">
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full border p-3 rounded-lg"
                placeholder="আপনার মতামত লিখুন..."
              />
              <button className="btn my-btn mt-2">রিভিউ দিন</button>
            </div>
          </>
        );

      case "degree":
        return doctor.degrees.map((d, i) => card(`${i + 1}. ${d}`, i));

      default:
        return card(
          <p className="text-justify whitespace-pre-line">{doctor.about}</p>,
          0,
        );
    }
  };

  const defaultImage = doctor.gender === "মহিলা" ? femaleDoctor : maleDoctor;

  return (
    <section className="max-w-full mx-auto px-[7%] py-10">
      {/* ================= HERO ================= */}
      <div className="card bg-white shadow-sm rounded-3xl p-6 mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* IMAGE */}
          <div className="relative w-full h-72 rounded-3xl overflow-hidden shadow-lg">
            <img
              src={defaultImage}
              alt={doctor.name}
              className="w-full h-full object-contain"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              {/* Like Button */}
              <button
                onClick={handleLikeToggle}
                className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow
     hover:shadow-md hover:scale-105 
    transition-all duration-200"
              >
                <Heart
                  className={`w-5 h-5 transition-all duration-200 ${
                    liked
                      ? "text-red-600 fill-red-500 scale-110"
                      : "text-gray-400 hover:text-red-500"
                  }`}
                />
                <span className="text-sm font-medium">{likes}</span>
              </button>

              {/* Facebook Share */}
              <button
                onClick={shareToFacebook}
                className="bg-blue-600 text-white p-2 rounded-full
    hover:bg-blue-700 hover:scale-110 hover:shadow-lg 
    transition-all duration-200"
              >
                <FaFacebookF className="transition-transform duration-200 hover:rotate-6" />
              </button>

              {/* Copy Link */}
              <button
                onClick={() => {
                  navigator.clipboard
                    .writeText(window.location.href)
                    .then(() => toast.success("লিংক কপি হয়েছে!"))
                    .catch(() => toast.error("কপি করতে ব্যর্থ হলো।"));
                }}
                className="bg-white p-2 rounded-full shadow
    hover:bg-gray-100 hover:scale-110 hover:shadow-md 
    transition-all duration-200"
              >
                <Share2
                  size={16}
                  className="hover:rotate-12 transition-transform duration-200"
                />
              </button>
            </div>
          </div>

          {/* INFO */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold flex gap-2">
              {doctor.name}
              {doctor.isVerified && <CheckCircle className="text-green-500" />}
            </h1>

            <p className="text-blue-600">{doctor.specialist}</p>

            <p className="text-sm text-gray-500">
              🎓 {doctor.institutions} | 🕒 {doctor.experience} বছর
            </p>

            <div className="flex items-center gap-2">
              <Star className="text-yellow-400 fill-yellow-400" />
              {doctor.rating} ({doctor.totalReviews})
            </div>

            <span
              className={`badge text-white bg-blue-500 ${
                doctor.availability ? "badge-success " : "badge-error"
              }`}
            >
              {doctor.availability ? "অনলাইন" : "অফলাইন"}
            </span>
          </div>

          {/* FEE */}
          <div className=" flex flex-col bg-blue-50 p-6 rounded-3xl text-center items-center justify-center ">
            <p>পরামর্শ ফি</p>
            <h2 className="text-3xl font-bold text-blue-600">{doctor.fee}</h2>
            <button className="btn my-btn !w-full mt-3">
              অ্যাপয়েন্টমেন্ট নিন
            </button>
          </div>
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className="flex gap-4 mb-6 flex-wrap">
        {["about", "experience", "reviews", "degree"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`btn border border-gray-200 rounded-xl shadow-sm ${
              activeTab === tab ? "my-btn" : "btn-ghost"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ================= MAIN ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-2">{renderContent()}</div>

        {/* RIGHT */}
        {/* RIGHT STATS CARD */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Appointment / Schedule Card */}
          <div className=" card rounded-3xl shadow-lg p-6 bg-base-100 hover:shadow-xl transition flex justify-center items-center">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Clock className="text-blue-500 w-6 h-6" />
              ডাক্তার সময়সূচি
            </h3>

            <div className="w-full flex justify-between items-center gap-4 p-4">
              <div className="flex flex-col gap-3 items-center justify-center border border-gray-200 p-4 rounded-xl flex-1">
                <h1 className="font-bold">অফলাইন</h1>
                {doctor.schedule.map((s, i) => (
                  <div key={i} className="mb-3">
                    <p className="text-gray-700 font-medium">
                      {s.day} ({s.from} - {s.to})
                    </p>
                    <p className="text-sm flex justify-center">{s.location}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 items-center border border-gray-200 p-4 rounded-xl flex-1">
                <h1 className="font-bold">অনলাইন</h1>
                {doctor.schedule.map((s, i) => (
                  <div key={i} className="mb-3">
                    <p className="text-gray-700 font-medium flex justify-center">
                      শনি-বৃহস্পতি
                    </p>
                    <p className="text-gray-700 font-medium">
                      সকাল ১০টা - রাত ১০টা
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats / Info Card */}
          <div className=" card bg-base-100  rounded-3xl shadow-lg p-6  hover:shadow-xl transition">
            <div className="flex flex-col gap-5">
              <div className="flex justify-around">
                <div className="flex items-center gap-3 p-4 flex-1">
                  <Users className="text-green-500 w-6 h-6" />
                  <div>
                    <h3 className="text-xl font-semibold">
                      {doctor.totalPatients || 540}
                    </h3>
                    <p className="text-gray-500 text-sm">মোট রোগী</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-1">
                  <Star className="text-yellow-400 w-6 h-6" />
                  <div>
                    <h3 className="text-xl font-semibold">{doctor.rating}</h3>
                    <p className="text-gray-500 text-sm">গড় রেটিং</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-around">
                <div className="flex items-center gap-3 flex-1 p-4">
                  <Hash className="text-purple-500 w-6 h-6" />
                  <div>
                    <h3 className="text-xl font-semibold">
                      {doctor.platformId || "DOC-10234"}
                    </h3>
                    <p className="text-gray-500 text-sm">ডক্টর আইডি</p>
                  </div>
                </div>

                <div className="flex flex-col gap-1 flex-1">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="text-blue-500 w-5 h-5" />
                    <h3 className="text-xl font-semibold">
                      {doctor.totalReviews}
                    </h3>
                  </div>
                  <p className="text-gray-500 text-sm">রিভিউ দিয়েছেন</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
