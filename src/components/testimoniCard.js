// components/TestimoniCard.jsx
import React from "react";
import { useTheme } from "../contexts/themeContext";
import { Star } from "lucide-react"; // pake lucide-react untuk ikon bintang

const TestimoniCard = ({ testimoni }) => {
  const { darkMode } = useTheme();

  // Ambil inisial nama (huruf pertama nama)
  const inisial = testimoni?.name
    ? testimoni.name.charAt(0).toUpperCase()
    : "?";

  // Tentukan jumlah bintang
  const starCount = testimoni?.class === "positive" ? 5 : 1;

  return (
    <div
      className={`rounded-2xl p-6 shadow-lg ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
      } transition-colors duration-300`}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
          {inisial}
        </div>
        <div>
          <h3 className="font-semibold">{testimoni.name}</h3>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {testimoni.createdAt}
          </p>

          {/* Bintang rating */}
          <div className="flex mt-1">
            {Array.from({ length: starCount }).map((_, idx) => (
              <Star
                key={idx}
                size={16}
                className={
                  darkMode
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-yellow-500 fill-yellow-500"
                }
              />
            ))}
          </div>
        </div>
      </div>

      <p
        className={`${
          darkMode ? "text-gray-300" : "text-gray-600"
        } mb-4 italic`}
      >
        "{testimoni.critics=="-"?"Tidak Memberikan Keterangan":testimoni.critics}"
      </p>

      <div className="flex items-center justify-between">
        <span
          className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          Testimoni Terverifikasi
        </span>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            testimoni?.class === "positive"
              ? darkMode
                ? "bg-green-900 text-green-200"
                : "bg-green-100 text-green-800"
              : darkMode
              ? "bg-red-900 text-red-200"
              : "bg-red-100 text-red-800"
          }`}
        >
           {testimoni?.class === "positive"
            ? "Positif"
            : testimoni?.class === "negative"
            ? "Negatif"
            : "Neutral"}
        </span>
      </div>
    </div>
  );
};

export default TestimoniCard;
