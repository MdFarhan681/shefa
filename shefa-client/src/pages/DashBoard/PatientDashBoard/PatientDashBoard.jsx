import React, { useState } from "react";
import { Menu, ArrowLeft, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PatientDashboard = () => {
  const [active, setActive] = useState("Overview");
  const [open, setOpen] = useState(false);
  const [familyOpen, setFamilyOpen] = useState(false);

  const navigate = useNavigate();

  const menuItems = [
    "Overview",
    "Consultation",
    "Prescriptions",
    "Reports",
    "Payment",
    "Settings",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/10 to-indigo-100/50">

      {/* TOPBAR (MOBILE) */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white shadow-md">
        <h1 className="font-bold text-lg">ড্যাশবোর্ড</h1>
        <button onClick={() => setOpen(!open)}>
          <Menu />
        </button>
      </div>

      <div className="flex">

        {/* SIDEBAR */}
        <aside
          className={`fixed lg:static top-4 left-4 lg:top-0 lg:left-0 
          h-[90vh] lg:h-full w-[75%] sm:w-64 
          bg-blue-100/70 backdrop-blur-xl shadow-xl p-4 
          transform transition-transform duration-300 z-50 rounded-2xl
          ${open ? "translate-x-0" : "-translate-x-[120%] lg:translate-x-0"}`}
        >
          <h2 className="text-xl font-bold mb-6 text-primary">
            রোগী প্যানেল
          </h2>

          <ul className="menu gap-2 w-full overflow-y-auto max-h-[60vh] pr-1">

            {/* MENU ITEMS */}
            {menuItems.map((item) => (
              <li key={item}>
                <button
                  onClick={() => setActive(item)}
                  className={`w-full text-left px-4 py-2 rounded-xl transition-all duration-300 border border-gray-300
                  ${
                    active === item
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg scale-[1.02]"
                      : "hover:bg-blue-100 hover:scale-[1.01]"
                  }`}
                >
                  {item === "Overview" && "ওভারভিউ"}
                  {item === "Consultation" && "পরামর্শ"}
                  {item === "Prescriptions" && "প্রেসক্রিপশন"}
                  {item === "Reports" && "রিপোর্ট"}
                  {item === "Payment" && "পেমেন্ট"}
                  {item === "Settings" && "সেটিংস"}
                </button>
              </li>
            ))}

            {/* FAMILY DROPDOWN */}
            <li>
              <button
                onClick={() => setFamilyOpen(!familyOpen)}
                className="w-full flex justify-between items-center px-4 py-2 rounded-xl hover:bg-blue-100 transition border border-gray-300"
              >
                পরিবার
                <ChevronDown
                  className={`transition-transform ${
                    familyOpen ? "rotate-180" : ""
                  }`}
                  size={18}
                />
              </button>

              {familyOpen && (
                <ul className="ml-4 mt-2 space-y-1">
                  <li>
                    <button className="w-full text-left px-3 py-1 rounded-lg hover:bg-blue-100 border border-gray-300">
                      বাবা ড্যাশবোর্ড
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left px-3 py-1 rounded-lg border border-gray-300 hover:bg-blue-100">
                      মা ড্যাশবোর্ড
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left px-3 py-1 rounded-lg hover:bg-blue-100 border border-gray-300">
                      শিশু ড্যাশবোর্ড
                    </button>
                  </li>
                </ul>
              )}
            </li>
          </ul>

          {/* LOGOUT */}
          <button className="w-full mt-6 bg-blue-500 text-white py-2 rounded-xl hover:scale-105 transition">
            লগ আউট
          </button>
        </aside>

        {/* OVERLAY */}
        {open && (
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm lg:hidden"
          ></div>
        )}

        {/* MAIN CONTENT */}
        <main className="flex-1 p-4 sm:p-5 md:p-6 lg:p-8">

          {/* BACK BUTTON */}
          <button
            onClick={() => {
  
  navigate("/");
}}
            className="flex items-center gap-2 mb-4 text-blue-600 hover:underline bg-blue-500/20 px-5 py-1 rounded-lg w-max"
          >
            <ArrowLeft size={18} />
            হোম
          </button>

          {/* HEADER */}
          <h2 className="text-2xl font-semibold mb-1">
            স্বাগতম 
          </h2>
          <p className="text-gray-500 mb-6">
            আপনার স্বাস্থ্য কার্যকলাপের সারসংক্ষেপ
          </p>

          {/* CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

            {[
              { title: "মোট পরামর্শ", value: 3 },
              { title: "আসন্ন অ্যাপয়েন্টমেন্ট", value: 1 },
              { title: "প্রিয় ডাক্তার", value: 2 },
              { title: "ডেলিভারি", value: 5 },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white/60 backdrop-blur-xl border border-white/30 shadow-lg rounded-2xl p-4 hover:scale-105 transition duration-300"
              >
                <h2 className="text-sm text-gray-500">{card.title}</h2>
                <p className="text-2xl font-bold mt-1">{card.value}</p>
              </div>
            ))}

          </div>

          {/* RECENT SECTION */}
          <div className="bg-white/70 backdrop-blur-xl border border-white/30 shadow-lg rounded-2xl mt-8 p-5">

            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg">
                সাম্প্রতিক কার্যক্রম
              </h2>
              <button className="text-blue-500 hover:underline text-sm">
                সব দেখুন
              </button>
            </div>

            <div className="mt-6 text-center text-gray-400 animate-pulse">
              লোড হচ্ছে...
            </div>

          </div>

        </main>
      </div>
    </div>
  );
};

export default PatientDashboard;