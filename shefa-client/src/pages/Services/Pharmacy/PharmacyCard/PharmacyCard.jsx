const PharmacyCard = ({ shop }) => {
 const openInGoogleMap = () => {
  const query = `${shop.shop_name}, ${shop.address}`;
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  window.open(url, "_blank");
};

  return (
<div className="card shadow-lg rounded-xl p-5 max-w-sm mx-auto hover:shadow-2xl transition-shadow duration-300 h-65 flex flex-col justify-between mb-8">
  
  {/* Shop Name - max 2 lines */}
  <h2 className="text-xl font-bold text-gray-800 line-clamp-2">
    {shop.shop_name || "No Name"}
  </h2>

  <div className="mt-2 space-y-1">
    {/* Address - 1 line */}
    <p className="text-gray-600 line-clamp-1">
      {shop.address || "No Address"}
    </p>

    {/* Phone - 1 line */}
    <p className="text-gray-600 line-clamp-1">
      Phone:
      {shop.phone ? (
        <a href={`tel:${shop.phone}`} className="text-blue-500 ml-1">
          {shop.phone}
        </a>
      ) : (
        <span className="ml-1 invisible">placeholder</span>
      )}
    </p>

    {/* Email - 1 line */}
    <p className="text-gray-600 line-clamp-1">
      Email:
      {shop.email ? (
        <a href={`mailto:${shop.email}`} className="text-blue-500 ml-1">
          {shop.email}
        </a>
      ) : (
        <span className="ml-1 invisible">placeholder</span>
      )}
    </p>
  </div>

  {/* Button */}
  <button
    onClick={openInGoogleMap}
    className="my-btn mt-4 !w-full"
  >
    Show in Google Map
  </button>
</div>
  );
};

export default PharmacyCard;