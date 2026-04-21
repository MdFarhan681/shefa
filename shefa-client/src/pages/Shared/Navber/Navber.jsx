import React, { useRef, useState, useEffect } from "react";
import {
  Bell,
  LogOut,
  Home,
  Stethoscope,
  Settings,
  LayoutDashboard,
  Info,
} from "lucide-react";
import { FaShieldAlt } from "react-icons/fa";

import userImage from "../../../assets/user.png";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import Logo from "../Logo/Logo";
import EmergencyCall from "../../../components/EmergencyCall/EmergencyCall";
import { MdQrCodeScanner } from "react-icons/md";


const middleNav = [
  { label: "হোম", href: "/", icon: Home },
  { label: "ডাক্তার", href: "/doctors", icon: Stethoscope },
  { label: "সার্ভিস ", href: "/services", icon: Settings, hasDropdown: true },
  { label: "ড্যাশবোর্ড", href: "/dashboard", icon: LayoutDashboard },
  { label: "পরিচিতি", href: "/about", icon: Info },
];

const services = [
  { label: "অ্যাম্বুলেন্স", href: "/services/ambulance" },
  { label: "ওষুধ ডেলিভারি", href: "/services/medicine-delivery" },
  { label: "ফার্মেসি", href: "/services/pharmacy" },
  { label: "ডায়াগনস্টিক সেন্টার", href: "/services/diagnostic-centers" },
  { label: "আরও সার্ভিস", href: "/services/more-services" },
];

const Navber = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const { user, logOut } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const serviceRef = useRef(null);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Logged out successfully"))
      .catch((error) => console.log(error));
  };

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (serviceRef.current && !serviceRef.current.contains(event.target)) {
        setServiceOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* HEADER / TOP NAVBAR */}
      <header className="fixed inset-x-0 top-0 z-50 mx-auto w-full max-w-screen-2xl py-6 px-[7%]">
        <div className="navbar rounded-2xl py-4 px-3 mt-4 shadow-2xl shadow-black/10 backdrop-blur-xl bg-[hsla(var(--b1)/0.3)] border border-base-300 flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2">
              <Logo />
            </Link>
          </div>

          {/* CENTER - DESKTOP NAV */}
          <nav className="hidden md:flex items-center space-x-4 relative">
            {middleNav.map((item) => {
              if (item.hasDropdown) {
                return (
                  <div key={item.href} className="relative" ref={serviceRef}>
                    {/* Clickable dropdown button */}
                    <button
                      onClick={() => setServiceOpen(!serviceOpen)}
                      className={`px-4 py-1 rounded-2xl hover:shadow-md transition ${
                        isActive(item.href) ? "text-blue-500" : "text-gray-700"
                      }`}
                    >
                      {item.label}
                    </button>

                    {/* Dropdown menu */}
                   {serviceOpen && (
                    <div className="absolute top-12 left-1/2 -translate-x-1/2 w-56 bg-gray-100 border border-gray-200 rounded-xl shadow-lg flex flex-col z-50">
                      {services.map((service) => (
                        <Link
                          key={service.href}
                          to={service.href}
                          onClick={() => setServiceOpen(false)}
                          className="px-4 py-2 hover:bg-blue-500 transition rounded-xl"
                        >
                          {service.label}
                        </Link>
                      ))}
                    </div>
                  )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`px-4 py-1 rounded-2xl hover:shadow-md transition ${
                    isActive(item.href) ? "text-blue-500" : "text-gray-700"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* <button className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-red-500 text-white flex items-center justify-center rounded-full">
                    4
                  </span>
                </button> */}
<Link
  to="/medicine-checker"
  className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm transition
  ${location.pathname === "/medicine-checker"
    ? "bg-green-600 text-white shadow"
    : "bg-green-50 text-green-700 hover:bg-green-100"}`}
>
  <MdQrCodeScanner  className="text-sm" />
  <span className="hidden md:inline">Verify</span>
</Link>
                <EmergencyCall number="+8801763430056" />

                <img
                  src={user?.photoURL || user?.photo || userImage}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover border border-gray-300 p-0.5"
                  onError={(e) => {
                    e.target.src = userImage;
                  }}
                />

                <button onClick={handleLogout} className="my-btn">
                  লগ আউট
                </button>
              </>
            ) : (
              <Link to="/login">
                <button className="my-btn">লগ ইন</button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* FLOATING BOTTOM NAV - MOBILE ONLY */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md md:hidden z-50">
        <div className="flex justify-around items-center bg-white/90 backdrop-blur-xl shadow-2xl border border-gray-200 rounded-2xl py-3 relative">
          {middleNav.map((item) => {
            const Icon = item.icon;
            if (item.hasDropdown) {
              return (
                <div key={item.href} className="relative">
                  <button
                    onClick={() => setServiceOpen(!serviceOpen)}
                    className={`flex flex-col items-center text-xs transition ${
                      isActive(item.href)
                        ? "text-blue-500 scale-110"
                        : "text-gray-500"
                    }`}
                  >
                    <Icon className="w-5 h-5 mb-1" />
                    {item.label}
                  </button>

                  {/* MOBILE SERVICE MENU */}
                  {serviceOpen && (
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-56
                bg-white/94 backdrop-blur-2xl border border-gray-200
                rounded-xl shadow-xl flex flex-col z-50 overflow-hidden
                ring-1 ring-white/20 ring-inset
               transition duration-300">
                      {services.map((service) => (
                        <Link
                          key={service.href}
                          to={service.href}
                          onClick={() => setServiceOpen(false)}
                          className="px-4 py-2 hover:bg-blue-500 transition rounded-xl"
                        >
                          {service.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex flex-col items-center text-xs transition ${
                  isActive(item.href)
                    ? "text-blue-500 scale-110"
                    : "text-gray-500"
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* ADD BOTTOM PADDING TO AVOID CONTENT BEHIND FLOATING NAV */}
      <div className="pb-24 md:pb-0"></div>
    </>
  );
};

export default Navber;