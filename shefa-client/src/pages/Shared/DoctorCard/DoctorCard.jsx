import { Star, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import maleDoctor from "../../../assets/maleDoctor.png";
import femaleDoctor from "../../../assets/femaleDoctor.png";

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  const defaultImage =
    doctor.gender === "মহিলা"
      ? femaleDoctor : maleDoctor

   

  const imageSrc = defaultImage;
  
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-md transition w-full max-w-xs mx-auto">

      {/* Image Section */}
      <div className="relative w-full h-44 rounded-t-xl overflow-hidden">
        <img
          src={imageSrc}
          alt={doctor.name}
          className="object-cover w-full h-full object-top "
          loading="lazy"
        />

        {/* Online / Offline Badge */}
        <span
          className={`absolute top-2 left-2 px-2 py-1 text-[10px] font-semibold rounded-full text-white
          ${doctor.availability ? "bg-blue-500 rounded-[50%]" : "bg-gray-500"}`}
        >
          {doctor.availability ? "" : ""}
        </span>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col gap-1">

        {/* Name & Verified */}
        <div className="flex items-center gap-1 mb-1">
          <h3 className="text-sm font-bold text-gray-900 line-clamp-1">
            {doctor.name}
          </h3>

          {doctor.isVerified && (
            <CheckCircle className="w-4 h-4 text-blue-600" />
          )}
        </div>

        {/* Specialist */}
        <p className="text-[13px] text-blue-600 font-medium line-clamp-1">
          {doctor.specialist}
        </p>

        {/* Institution */}
        <p className="text-[12px] text-gray-500 line-clamp-1">
          {doctor.institutions}
        </p>

        {/* Rating & Experience */}
        <div className="flex items-center justify-between text-[12px] mb-1">
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-3 h-3 fill-yellow-500" />
            <span className="font-semibold text-gray-800">
              {doctor.rating}
            </span>
            <span className="text-gray-500">
              ({doctor.totalReviews})
            </span>
          </div>

          <span className="text-gray-600">
            {doctor.experience}+ বছর
          </span>
        </div>

        {/* Description */}
     <p className="text-[10px]  py-0 text-gray-600 mb-2 truncate">
  {doctor.description}
</p>

        {/* Fee & Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          {console.log(doctor._id)}
          <p className="text-sm font-bold text-green-600">
            <span className="text-[1.5rem] font-bold"><span className="text-[1rem]">৳</span></span> {doctor.fee}
          </p>
          <button
            className="my-btn !text-[12px]"
            onClick={() => navigate(`/doctors/${doctor._id}`)}
          >
            বিস্তারিত দেখুন
          </button>
        </div>

      </div>
    </div>
  );
};

export default DoctorCard;