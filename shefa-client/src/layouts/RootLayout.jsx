import React from "react";
import { Outlet } from "react-router-dom";
import Navber from "../pages/Shared/Navber/Navber";
import Footer from "../pages/Shared/Footer/Footer";
import Up from "../pages/Shared/Up/Up";

// 👉 import hook
import useBotpress from "../hooks/useBotpress";

const RootLayout = () => {
  // 👉 activate bot here
  useBotpress();

  return (
    <div>
      <Up />
      <Navber />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;