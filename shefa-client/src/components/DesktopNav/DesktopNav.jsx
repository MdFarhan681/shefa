import React from "react";
import { Link, useLocation } from "react-router-dom";
import ServicesMegaMenu from "../../components/ServicesMegaMenu/ServicesMegaMenu.jsx";
import { Home, Stethoscope, LayoutDashboard, Info } from "lucide-react";

const navItems = [
  { label: "হোম", href: "/", icon: Home },
  { label: "ডাক্তার", href: "/doctors", icon: Stethoscope },
  { label: "ড্যাশবোর্ড", href: "/dashboard", icon: LayoutDashboard },
  { label: "পরিচিতি", href: "/about", icon: Info },
];

const DesktopNav = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <nav className="hidden md:flex items-center space-x-4">
      <ServicesMegaMenu />
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={`nav-link transition-all duration-200 px-4 rounded-2xl py-1 hover:shadow-md hover:text-white ${
            isActive(item.href) ? "text-blue-500" : ""
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default DesktopNav;