import React, { useState } from "react";
import {
  Bell,
  Calendar,
  LogOut,
  Settings,
  Stethoscope,
  User,
  Menu,
  X,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

const middleNav = [
  { label: "Home", href: "/" },
  { label: "Doctors", href: "/doctors" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "About Us", href: "/about" },
];

const Navber = ({ showDashboardNav = false }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const location = useLocation();
  const pathname = location.pathname;

  const user = {
    type: "patient",
    name: "John Doe",
    email: "john.doe@example.com",
    profileImage: "logo.png",
  };

  const isAuthenticated = false;

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50 mx-auto w-full max-w-screen-2xl py-6 px-[7%]">
      <div className="navbar rounded-2xl py-4 px-3 mt-4 shadow-2xl shadow-black/10 backdrop-blur-xl bg-[hsla(var(--b1)/0.3)] border border-base-300 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center space-x-3">

          {/* Mobile button */}
          <button
            className="md:hidden btn btn-ghost"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>

            <div className="hidden md:block text-2xl font-bold bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Amader Doctor
            </div>
          </Link>
        </div>

        {/* CENTER */}
        <nav className="hidden md:flex items-center">
          {middleNav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`nav-link transition-all duration-200 active:scale-95 px-4 rounded-2xl py-1 hover:shadow-md hover:text-white ${
                isActive(item.href) ? "active" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* RIGHT */}
        <div className="flex items-center space-x-4">
          {isAuthenticated && showDashboardNav ? (
            <>
              <button className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-red-500 text-white flex items-center justify-center rounded-full">
                  4
                </span>
              </button>

              <div className="flex items-center space-x-2">
                <img
                  src={user.profileImage}
                  alt="profile"
                  className="w-8 h-8 rounded-full"
                />
              </div>
            </>
          ) : (
            <Link to="/login/patient">
              <button className="my-btn">Log in</button>
            </Link>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="navbar rounded-2xl py-4 px-3 mt-4 shadow-2xl shadow-black/10 bg-gray-100/25 backdrop-blur-2xl border border-base-300">
          <nav className="flex flex-col p-4 space-y-3">
            {middleNav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={`nav-link px-3 py-2 rounded-lg hover:bg-blue-500 transition-all active:scale-97 duration-200 ${
                  isActive(item.href) ? "active bg-blue-500" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navber;