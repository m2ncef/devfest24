import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const SharedLayout = () => {
  return (
    <div className="flex-col ">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default SharedLayout;
