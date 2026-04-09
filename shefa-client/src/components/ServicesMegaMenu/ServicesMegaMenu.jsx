import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Truck, Hospital, Ambulance, Pharmacy } from "lucide-react";

const services = [
  { label: "অ্যাম্বুলেন্স", href: "/services/ambulance", icon: Ambulance },
  { label: "মেডিসিন শপ", href: "/services/medicine-shops", icon: Pharmacy },
  { label: "মেডিসিন ডেলিভারি", href: "/services/medicine-delivery", icon: Truck },
  { label: "ডায়াগনস্টিক সেন্টার", href: "/services/diagnostic", icon: Hospital },
];

const ServicesMegaMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative"
    >
      <button className="nav-link px-4 py-1 rounded-2xl hover:shadow-md">
        সার্ভিস
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl p-4 grid gap-2 z-50">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.href}
                to={service.href}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-blue-500 hover:text-white transition-all"
              >
                <Icon className="w-5 h-5" />
                {service.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ServicesMegaMenu;