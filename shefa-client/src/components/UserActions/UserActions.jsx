import React from "react";
import { Bell } from "lucide-react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth.jsx"; 
import toast from "react-hot-toast";
import userImage from "../../assets/user.png";
import EmergencyCall from "../../components/EmergencyCall/EmergencyCall.jsx";

const UserActions = () => {
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Logged out successfully"))
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex items-center space-x-4">
      {user ? (
        <>
          <button className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-red-500 text-white flex items-center justify-center rounded-full">
              4
            </span>
          </button>

          <EmergencyCall number="+8801763430056" />

          <img
            src={user?.photoURL || user?.photo || userImage}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover border border-gray-300 p-0.5"
            onError={(e) => (e.target.src = userImage)}
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
  );
};

export default UserActions;