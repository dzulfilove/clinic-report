// components/FeedbackStats.jsx
import React from "react";
import { useTheme } from "../contexts/themeContext";

const FeedbackStats = ({ data }) => {
  const { darkMode } = useTheme();

  const stats = [
    {
      label: "Total Terkirim",
      value: data.length,
      change: "+12.5%",
      color: "text-blue-600",
    },
    {
      label: "Positif",
      value: data.filter((item) => item.class === "positive").length,
      change: "+8.2%",
      color: "text-green-600",
    },
    {
      label: "Negatif",
      value: data.filter((item) => item.class === "negative").length,
      change: "+4.3%",
      color: "text-red-600",
    },
    {
      label: "Tidak Terbalas",
      value: data.filter((item) => !item.answer).length,
      change: "-2.1%",
      color: "text-yellow-600",
    },
  ];

  return (
    <div
      className={`rounded-2xl p-6 shadow-lg ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
      } transition-colors duration-300 mb-6`}
    >
      <h3 className="text-lg font-semibold mb-4">Statistik Umpan Balik</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`text-center p-4 rounded-xl ${
              darkMode ? "bg-gray-700" : "bg-gray-50"
            }`}
          >
            <p className="text-2xl font-bold">{stat.value}</p>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {stat.label}
            </p>
            {/* <p className={`text-xs font-medium ${stat.color}`}>{stat.change}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackStats;
