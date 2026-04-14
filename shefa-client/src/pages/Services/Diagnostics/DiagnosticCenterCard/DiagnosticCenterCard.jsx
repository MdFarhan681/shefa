
import { MapPin } from "lucide-react";
import { Mail } from "lucide-react";
import { Phone } from "lucide-react";
const DiagnosticCenterCard = ({ center }) => {
  const openInGoogleMap = () => {
    const query = `${center.shop_name}, ${center.address}`;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="card shadow-lg rounded-xl p-5 max-w-sm mx-auto hover:shadow-2xl transition-shadow duration-300 h-72 flex flex-col justify-between mb-8 bg-white">

      {/* NAME */}
      <h2 className="text-xl font-bold text-gray-800 line-clamp-2">
        {center.shop_name || "No Name"}
      </h2>

      <div className="mt-2 space-y-1">

        {/* ADDRESS */}
       <p className="text-gray-600 line-clamp-2 flex items-start gap-1">
  <MapPin className="w-4 h-4 mt-1 text-red-500" />
  <span>{center.address || "No Address"}</span>
</p>

        {/* PHONE */}
        <p className="text-gray-600 line-clamp-1">
          📞 Phone:
          {center.phone ? (
            <a href={`tel:${center.phone}`} className="text-blue-500 ml-1">
              {center.phone}
            </a>
          ) : (
            <span className="ml-1 text-gray-400">Not available</span>
          )}
        </p>

        {/* EMAIL */}
       <p className="text-gray-600 line-clamp-1 flex items-center gap-1">
  <Mail className="w-4 h-4 text-blue-500" />

  <span>Email:</span>

  {center.email ? (
    <a href={`mailto:${center.email}`} className="text-blue-500 ml-1">
      {center.email}
    </a>
  ) : (
    <span className="ml-1 text-gray-400">Not available</span>
  )}
</p>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-2 mt-4">

        {/* MAP BUTTON */}
        <button
          onClick={openInGoogleMap}
          className="my-btn flex items-center justify-center gap-2 flex-1"
        >
           <MapPin className="w-4 h-4 mt-1 text-red-500" /> Map
        </button>

        {/* CALL BUTTON */}
        {center.phone && (
          <a
  href={`tel:${center.phone}`}
  className="flex-1 flex items-center justify-center gap-2 text-white py-2 rounded-lg transition
  bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
>
  <Phone className="w-4 h-4" />
  Call
</a>
        )}

      </div>
    </div>
  );
};

export default DiagnosticCenterCard;