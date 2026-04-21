import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Menu, ChevronDown, ArrowLeft } from "lucide-react";

const PatientDashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const [familyOpen, setFamilyOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Overview", path: "overview", label: "ওভারভিউ" },

    { name: "Prescriptions", path: "prescriptions", label: "প্রেসক্রিপশন" },
    { name: "Reports", path: "reports", label: "রিপোর্ট" },

    { name: "History", path: "history", label: "মেডিকেল ইতিহাস" },
    { name: "Settings", path: "settings", label: "সেটিংস" },
  ];

  return (
    <div className="flex w-full px-[7%] ">

      {/* 📱 MOBILE TOP BAR */}
      <div className="lg:hidden fixed top-20 left-0 right-0 bg-white shadow z-40 flex justify-between p-4 rounded-2xl mx-[7%]">
       <h1
  onClick={() => navigate("/")}
  className="font-bold text-blue-500 cursor-pointer hover:text-blue-700 transition flex items-center gap-2"
>
  রোগী ড্যাশবোর্ড    রোগী প্যানেল
</h1>

        <button onClick={() => setOpen(!open)}>
          <Menu />
        </button>
      </div>

      {/* 📌 SIDEBAR */}
      <aside
        className={`  fixed lg:static top-10 left-0 h-fit w-64 bg-blue-100/70 backdrop-blur-xl p-4 transition-transform z-50
        ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0 rounded-2xl"}`}
      >
         <h1
  onClick={() => navigate("/")}
  className="font-bold text-blue-500 cursor-pointer hover:text-blue-700 transition flex items-center pb-3"
>
   রোগী প্যানেল
</h1>

        <ul className="space-y-2">

          {menuItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => {
                  navigate(`/dashboard/patient/${item.path}`);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-2 rounded-xl border
                ${
                  location.pathname.includes(item.path)
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-100"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}

          {/* FAMILY */}
          <li>
            <button
              onClick={() => setFamilyOpen(!familyOpen)}
              className="w-full flex justify-between px-4 py-2 border rounded-xl"
            >
              পরিবার
              <ChevronDown size={16} />
            </button>

{familyOpen && (
  <ul className="ml-4 mt-2 space-y-2">

    {/* 👨 Father */}
    <li>
      <button
        onClick={() => {
          navigate("/dashboard/patient/father");
          setOpen(false);
        }}
        className={`px-3 py-2 border rounded-lg w-full text-left text-sm
          ${location.pathname.includes("father") ? "bg-blue-500 text-white" : "hover:bg-blue-100"}
        `}
      >
        বাবা 
      </button>
    </li>

    {/* 👩 Mother */}
    <li>
      <button
       
        className={`px-3 py-2 border rounded-lg w-full text-left text-sm
          ${location.pathname.includes("mother") ? "bg-blue-500 text-white" : "hover:bg-blue-100"}
        `}
      >
       মা 
      </button>
    </li>

    {/*  Child */}
    <li>
      <button
      
        className={`px-3 py-2 border rounded-lg w-full text-left text-sm
          ${location.pathname.includes("child") ? "bg-blue-500 text-white" : "hover:bg-blue-100"}
        `}
      >সন্তান 
      </button>
    </li>

    {/* ➕ Add New Family Member */}
    <li>
      <button
        
        className="px-3 py-2 border border-dashed rounded-lg w-full text-left text-sm text-blue-600 hover:bg-blue-50 flex items-center gap-2"
      >
        ➕ নতুন সদস্য যোগ করুন
      </button>
    </li>

  </ul>
)}
          </li>
        </ul>

        {/* LOGOUT */}
        <button className="w-full mt-6 bg-blue-500 text-white py-2 rounded-xl">
          লগ আউট
        </button>
      </aside>

      {/* 🧩 RIGHT SIDE CONTENT */}
      <main className="flex-1 lg:ml-20 mt-16 lg:mt-0 p-6  ">
        <Outlet />
      </main>
    </div>
  );
};

export default PatientDashboardLayout;