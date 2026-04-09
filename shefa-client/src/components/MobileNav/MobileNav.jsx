import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Stethoscope,
  Settings,
  LayoutDashboard,
  Info,
} from "lucide-react";

const middleNav = [
  { label: "হোম", href: "/", icon: Home },
  { label: "ডাক্তার", href: "/doctors", icon: Stethoscope },
  { label: "সার্ভিস", href: "/services", icon: Settings },
  { label: "ড্যাশবোর্ড", href: "/dashboard", icon: LayoutDashboard },
  { label: "পরিচিতি", href: "/about", icon: Info },
];

const MobileNav = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md md:hidden z-50">
      <div className="flex justify-around items-center bg-white/90 backdrop-blur-xl shadow-2xl border border-gray-200 rounded-2xl py-3">
        {middleNav.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex flex-col items-center text-xs transition-all ${
                isActive(item.href) ? "text-blue-500 scale-110" : "text-gray-500"
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;