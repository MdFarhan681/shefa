import PharmacyCard from "./PharmacyCard/PharmacyCard";

const Pharmacy = () => {
const shops = [
  {
    shop_name: "চয়নিকা ফার্মেসি টুটপাড়া খুলনা",
    address: "৪৭ টুটপাড়া সেন্ট্রাল রোড, খুলনা, বাংলাদেশ",
    latitude: 22.806517,
    longitude: 89.5673633,
    phone: "+৮৮০১৮৪০০১৪৭৩৫",
    email: "chayanika.khl@gmail.com",
  },
  {
    shop_name: "মেডিকেয়ার ফার্মেসি মাজিদ সরণি খুলনা",
    address: "১২২ মাজিদ সরণি, খুলনা, বাংলাদেশ",
    latitude: 22.8162284,
    longitude: 89.5432121,
    phone: "+৮৮০১৬৮২২২৮৯০২",
    email: "medicare.khulna@gmail.com",
  },
  {
    shop_name: "আকন মেডিকেল",
    address: "আরএইচ৬৬+৮৯পি, টারের পুকুর রোড, খুলনা, বাংলাদেশ",
    latitude: 22.8393,
    longitude: 89.5598,
    phone: "+৮৮০৪১৭২০৩৩৭",
    email: "None",
  },

  {
    shop_name: "জনতা মেডিকেল হল",
    address: "নাভে বাজার, দিঘলিয়া, খুলনা, বাংলাদেশ",
    latitude: 22.8750,
    longitude: 89.5350,
    phone: "+৮৮০১৫৫২৪৪৩৩২২",
    email: "None",
  },
  {
    shop_name: "বয়রা ফার্মেসি খুলনা মেডিকেল কলেজ ফ্রন্ট",
    address: "হাসপাতাল প্রধান গেট, খুলনা মেডিকেল কলেজ, খুলনা, বাংলাদেশ",
    latitude: 22.8273454,
    longitude: 89.5368203,
    phone: "+৮৮০১৭১৫৫৯৫৫০৯",
    email: "boyra.pharmacy@gmail.com",
  },
  {
    shop_name: "উত্তরা ফার্মেসি",
    address: "ভিজিআরএম+৯ডব্লিউ৭, দিঘলিয়া, খুলনা, বাংলাদেশ",
    latitude: 22.8909178,
    longitude: 89.5348088,
    phone: "+৮৮০১৯০৯৯৯৪২২৬",
    email: "None",
  },
  {
    shop_name: "সেবা মেডিকেল হল",
    address: "দিঘলিয়া বাজার, দিঘলিয়া, খুলনা, বাংলাদেশ",
    latitude: 22.8643,
    longitude: 89.5442,
    phone: "+৮৮০১৭১২৩৪৫৬৭১",
    email: "None",
  },
  {
    shop_name: "বিশ্বাস ফার্মেসি",
    address: "সেনহাটি, দিঘলিয়া, খুলনা, বাংলাদেশ",
    latitude: 22.8550,
    longitude: 89.5460,
    phone: "+৮৮০১৯১৫৬৬৭৭৮৮",
    email: "None",
  },
  {
    shop_name: "মায়ের দোয়া ফার্মেসি",
    address: "দিঘলিয়া মেইন রোড, দিঘলিয়া, খুলনা, বাংলাদেশ",
    latitude: 22.8655,
    longitude: 89.5438,
    phone: "+৮৮০১৮২৩৪৫৬৭৮২",
    email: "None",
  },
  {
    shop_name: "ভাই ভাই ফার্মেসি",
    address: "সেনহাটি বাজার, দিঘলিয়া, খুলনা, বাংলাদেশ",
    latitude: 22.8598,
    longitude: 89.5421,
    phone: "+৮৮০১৯৩৪৫৬৭৮৯৩",
    email: "",
  },
  {
    shop_name: "নিরাময় মেডিকেল হল",
    address: "স্টার জুট মিলস এলাকা, দিঘলিয়া, খুলনা, বাংলাদেশ",
    latitude: 22.8689,
    longitude: 89.5401,
    phone: "+৮৮০১৭৪৫৬৭৮৯০৪",
    email: "None",
  },
  {
    shop_name: "দিঘলিয়া মেডিসিন কমপ্লেক্স",
    address: "হাসপাতাল রোড, দিঘলিয়া, খুলনা, বাংলাদেশ",
    latitude: 22.8672,
    longitude: 89.5415,
    phone: "+৮৮০১৭১১০০৯৯৮৮",
    email: "None",
  },
  {
    shop_name: "সরকার মেডিকেল",
    address: "দিঘলিয়া ফেরিঘাট রোড, খুলনা, বাংলাদেশ",
    latitude: 22.8621,
    longitude: 89.5480,
    phone: "+৮৮০১৮১৯৫৫৪৪৩৩",
    email: "None",
  },
  {
    shop_name: "ইসলামিয়া ফার্মেসি",
    address: "চাঁদনি বাজার, দিঘলিয়া, খুলনা, বাংলাদেশ",
    latitude: 22.8710,
    longitude: 89.5390,
    phone: "+৮৮০১৭২০৮৮৯৯৭৭",
    email: "None",
  },
  {
    shop_name: "পপুলার মেডিসিন কর্নার",
    address: "দিঘলিয়া থানা মোড়, খুলনা, বাংলাদেশ",
    latitude: 22.8635,
    longitude: 89.5432,
    phone: "+৮৮০১৯১২৩৩৪৪৫৫",
    email: "None",
  },
  {
    shop_name: "মন্ডল ফার্মেসি",
    address: "বারুইপাড়া, দিঘলিয়া, খুলনা, বাংলাদেশ",
    latitude: 22.8820,
    longitude: 89.5300,
    phone: "+৮৮০১৭১৮৯৯০০১১",
    email: "None",
  },
  {
    shop_name: "লিজা মেডিকেল স্টোর",
    address: "রাধামাধবপুর, দিঘলিয়া, খুলনা, বাংলাদেশ",
    latitude: 22.8900,
    longitude: 89.5250,
    phone: "+৮৮০১৮১১৬৬৭৭৮৮",
    email: "None",
  },
  {
    shop_name: "তারাফদার ফার্মেসি",
    address: "গাজীরহাট রোড, দিঘলিয়া, খুলনা, বাংলাদেশ",
    latitude: 22.8950,
    longitude: 89.5200,
    phone: "+৮৮০১৯২২৩৩৪৪৬৬",
    email: "None",
  }
];
  return (
    <div className=" w-full sm:mb-15 px-[7%] pt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 bg-[#f7fbff]  ">
      {shops.map((shop, index) => (
        <PharmacyCard key={index} shop={shop} />
      ))}
    </div>
  );
};

export default Pharmacy;
