import { useNavigate, useLocation } from "react-router-dom";

const DashSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Overview", path: "/dashboard/overview", label: "ওভারভিউ" },
    { name: "Consultation", path: "/dashboard/consultation", label: "পরামর্শ" },
    { name: "Prescriptions", path: "/dashboard/prescriptions", label: "প্রেসক্রিপশন" },
    { name: "Reports", path: "/dashboard/reports", label: "রিপোর্ট" },
    { name: "Payment", path: "/dashboard/payment", label: "পেমেন্ট" },
    { name: "History", path: "/dashboard/history", label: "মেডিকেল ইতিহাস" },
    { name: "Settings", path: "/dashboard/settings", label: "সেটিংস" },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg p-4">
      <h2 className="text-xl font-bold mb-6 text-primary">
        রোগী প্যানেল
      </h2>

      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.name}>
            <button
              onClick={() => navigate(item.path)}
              className={`w-full text-left px-4 py-2 rounded-xl border
              ${
                location.pathname === item.path
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-100"
              }`}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default DashSidebar;