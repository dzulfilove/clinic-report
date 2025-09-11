// components/TestimoniStats.jsx
import React from "react";
import { useTheme } from "../contexts/themeContext";

const TestimoniStats = ({statsData}) => {
  const { darkMode } = useTheme();
console.log(statsData,"stats")
  const stats = [
    { value: statsData.data?.length, label: "Chat Terbalas" },
    { value: statsData.positive?.length, label: "Total Testimoni Positif" },
    { value: statsData.negative?.length, label: "Total Testimoni Negatif" },
  ];

  return (
    <div
      className={`rounded-2xl p-6 shadow-lg ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
      } transition-colors duration-300`}
    >
      <div className="flex flex-wrap justify-between gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center flex-1 min-w-[120px]"
          >
            <p className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {stat.value}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimoniStats;
