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
    "History",
    "Settings",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/10 to-indigo-100/50">

      {/* TOPBAR (MOBILE) */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white shadow-md">
        <h1 className="font-bold text-lg">ড্যাশবোর্ড</h1>

        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <Menu />
        </button>
      </div>

      <div className="flex">

        {/* SIDEBAR */}
        <aside
          className={`fixed lg:static top-0 left-0 h-full w-64
          bg-blue-100/70 backdrop-blur-xl shadow-xl p-4
          transition-transform duration-300 z-50
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        >
          <h2 className="text-xl font-bold mb-6 text-blue-600">
            রোগী প্যানেল
          </h2>

          <ul className="space-y-2">

            {menuItems.map((item) => (
              <li key={item}>
                <button
                  onClick={() => {
                    setActive(item);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-xl border transition
                  ${
                    active === item
                      ? "bg-blue-500 text-white"
                      : "hover:bg-blue-100"
                  }`}
                >
                  {item === "Overview" && "ওভারভিউ"}
                  {item === "Consultation" && "পরামর্শ"}
                  {item === "Prescriptions" && "প্রেসক্রিপশন"}
                  {item === "Reports" && "রিপোর্ট"}
                  {item === "Payment" && "পেমেন্ট"}
                  {item === "History" && "মেডিকেল ইতিহাস"}
                  {item === "Settings" && "সেটিংস"}
                </button>
              </li>
            ))}

            {/* FAMILY */}
            <li>
              <button
                onClick={() => setFamilyOpen(!familyOpen)}
                className="w-full flex justify-between items-center px-4 py-2 rounded-xl hover:bg-blue-100 border"
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
                    <button className="w-full text-left px-3 py-1 border rounded-lg hover:bg-blue-100">
                      বাবা ড্যাশবোর্ড
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left px-3 py-1 border rounded-lg hover:bg-blue-100">
                      মা ড্যাশবোর্ড
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left px-3 py-1 border rounded-lg hover:bg-blue-100">
                      শিশু ড্যাশবোর্ড
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

        {/* OVERLAY */}
        {open && (
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          />
        )}

        {/* MAIN */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">

          {/* HOME BUTTON (FIXED) */}
          <button
            onClick={() => {
              setOpen(false);
              navigate("/");
            }}
            className="flex items-center gap-2 mb-4 text-blue-600 bg-blue-100 px-4 py-1 rounded-lg"
          >
            <ArrowLeft size={18} />
            হোম
          </button>

          {/* HEADER */}
          <h2 className="text-2xl font-semibold">
            স্বাগতম
          </h2>
          <p className="text-gray-500 mb-6">
            আপনার স্বাস্থ্য কার্যকলাপের সারসংক্ষেপ
          </p>

          {/* CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {[
              { title: "মোট পরামর্শ", value: 3 },
              { title: "আসন্ন অ্যাপয়েন্টমেন্ট", value: 1 },
              { title: "প্রিয় ডাক্তার", value: 2 },
              { title: "ডেলিভারি", value: 5 },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white/70 backdrop-blur-xl border rounded-2xl p-4 shadow hover:scale-105 transition"
              >
                <h2 className="text-sm text-gray-500">{card.title}</h2>
                <p className="text-2xl font-bold">{card.value}</p>
              </div>
            ))}
          </div>

          {/* RECENT */}
          <div className="bg-white/70 mt-8 p-5 rounded-2xl shadow">
            <h2 className="font-semibold text-lg">
              সাম্প্রতিক কার্যক্রম
            </h2>

            <div className="mt-6 text-center text-gray-400">
              লোড হচ্ছে...
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default PatientDashboard;