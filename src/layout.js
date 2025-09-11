import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import { useTheme } from "./contexts/themeContext";

const Layout = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={`${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
        <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
