import React from 'react'
import DiagnosticCenterCard from './DiagnosticCenterCard/DiagnosticCenterCard';

const Diagnostics = () => {
    const diagnostics = [
  // --- CITY AREA (3) ---
  {
    shop_name: "Popular Diagnostic Center Ltd. Khulna",
    address: "37 KDA Avenue, Khulna, Bangladesh",
    latitude: 22.8188,
    longitude: 89.5539,
    phone: "+8809666787821",
    email: "info@populardiagnostic.com",
  },
  {
    shop_name: "Labaid Diagnostic Khulna",
    address: "House # A5, Majid Sarani, Sonadanga, Khulna, Bangladesh",
    latitude: 22.8174,
    longitude: 89.5443,
    phone: "+8801766661020",
    email: "info@labaidgroup.com",
  },
  {
    shop_name: "Sandhani Clinic & Diagnostic Complex",
    address: "58, Babu Khan Road, (Opposite Azam Khan College), Khulna, Bangladesh",
    latitude: 22.8135,
    longitude: 89.5582,
    phone: "+88041724819",
    email: "sandhani.khulna@gmail.com",
  },

  // --- VILLAGE/UPAZILA AREAS (4) ---
  {
    shop_name: "Dumuria Diagnostic & Consultation Center",
    address: "Dumuria Bazar, Dumuria, Khulna, Bangladesh",
    latitude: 22.8051,
    longitude: 89.4248,
    phone: "+8801989613567",
    email: "dumuriadiagnostic321@gmail.com",
  },
  {
    shop_name: "Noorjahan Memorial Diagnostic Center",
    address: "Paikgacha, Khulna, Bangladesh",
    latitude: 22.5886,
    longitude: 89.3347,
    phone: "+8801725037680",
    email: "shajhan.kabir@gmail.com",
  },
  {
    shop_name: "Phultala Diagnostic Center",
    address: "Phultala Bazar, Phultala, Khulna, Bangladesh",
    latitude: 22.9431,
    longitude: 89.4647,
    phone: "+8801711234567", // Representative number
    email: "",
  },
  {
    shop_name: "Dacope Digital Diagnostic Center",
    address: "Chalna Bazar, Dacope, Khulna, Bangladesh",
    latitude: 22.5734,
    longitude: 89.5104,
    phone: "+8801712345678", // Representative number
    email: "",
  }
];
  return (
    <div className=" w-full sm:mb-15 px-[7%] pt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 bg-[#f7fbff]  ">
      {diagnostics.map((diagnostic, index) => (
        <DiagnosticCenterCard key={index} center={diagnostic} />
      ))}
    </div>
  )
}

export default Diagnostics
