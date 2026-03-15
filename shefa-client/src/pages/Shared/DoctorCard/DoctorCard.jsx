import { Star, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DoctorCard = ({ doctor }) => {

  const navigate = useNavigate();

  const defaultImage =
    doctor.gender === "female"
      ? "/female-doctor.webp"
      : "/male-doctor.webp";

  const imageSrc = doctor.photo?.trim() ? doctor.photo : defaultImage;

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-md transition w-full max-w-xs mx-auto">

      <div className="relative w-full h-44 rounded-t-xl overflow-hidden">
        <img
          src={imageSrc}
          alt={doctor.name}
          className="object-cover w-full h-full"
        />

        <span
          className={`absolute top-2 left-2 px-2 py-1 text-[10px] font-semibold rounded-full text-white
          ${doctor.availability ? "bg-green-600" : "bg-gray-500"}`}
        >
          {doctor.availability ? "● অনলাইন" : "● অফলাইন"}
        </span>
      </div>

      <div className="p-3 flex flex-col gap-1">

        <div className="flex items-center gap-1 mb-1">
          <h3 className="text-sm font-bold text-gray-900 line-clamp-1">
            {doctor.name}
          </h3>

          {doctor.isVerified && (
            <CheckCircle className="w-4 h-4 text-blue-600" />
          )}
        </div>

        <p className="text-[13px] text-blue-600 font-medium line-clamp-1">
          {doctor.specialist}
        </p>

        <p className="text-[12px] text-gray-500 line-clamp-1">
          {doctor.institutions}
        </p>

        <div className="flex items-center justify-between text-[12px] mb-1">
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-3 h-3 fill-yellow-500" />
            <span className="font-semibold text-gray-800">
              {doctor.rating}
            </span>
          </div>

          <span className="text-gray-600">
            {doctor.experience}+ বছর
          </span>
        </div>

        <button
          className="btn btn-sm bg-green-500"
          onClick={() => navigate(`/doctors/${doctor.id}`)}
        >
          বিস্তারিত দেখুন
        </button>

      </div>
    </div>
  );
};

export default DoctorCard;