import React from "react";
import { Phone } from "lucide-react"; // phone icon
import toast from "react-hot-toast";

const EmergencyCall = ({ number = "+880123456789" }) => {
  const handleClick = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = `tel:${number}`;
      toast.success(`Calling ${number}...`);
    } else {
      navigator.clipboard.writeText(number)
        .then(() => toast.success(`Number copied: ${number}`))
        .catch(() => toast.error("Failed to copy number"));
    }
  };

  return (
     <div className="relative group">
      {/* Button */}
      <button
        onClick={handleClick}
        className="p-2 rounded-full hover:scale-110 transition-transform"
      >
        <Phone className="w-6 h-6 text-green-500" />
      </button>

      {/* Tooltip */}
      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-500 text-white text-xs rounded-md py-1 px-2 whitespace-nowrap shadow-lg pointer-events-none">
        জরুরি যোগাযোগ
      </div>
    </div>
  );
};

export default EmergencyCall;