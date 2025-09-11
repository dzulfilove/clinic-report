// pages/TestimoniPage.jsx
import React, { useEffect, useState } from "react";
import { useTheme } from "../contexts/themeContext";
import TestimoniStats from "../components/testimoniStats";
import TestimoniCard from "../components/testimoniCard";
import { fetchTestimoniData } from "../utils/testimoniUtils";
import Loader from "../components/loader";

const TestimoniPage = () => {
  const { darkMode } = useTheme();
  const [testimoniData, setTestimoniData] = useState({ critics: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTestimoniData(setTestimoniData, setLoading);
  }, []);
  if (loading) {
    return (
      <div
        className={`min-h-screen py-8 flex justify-center items-center ${
          darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
        } transition-colors duration-300`}
      >
        <Loader />
      </div>
    );
  }

  console.log(testimoniData);
  return (
    <div
      className={`min-h-screen py-8 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      } transition-colors duration-300`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              darkMode ? "text-teal-400" : "text-teal-600"
            }`}
          >
            Testimoni Pasien
          </h1>
          <p
            className={`text-lg ${
              darkMode ? "text-gray-300" : "text-gray-600"
            } max-w-2xl mx-auto`}
          >
            Pengalaman pasien yang telah menggunakan layanan klinik kami
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center mt-8">
            <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-teal-500 font-medium">Loading...</span>
          </div>
        ) : (
          <>
            <TestimoniStats statsData={testimoniData} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {testimoniData.critics?.length > 0 ? (
                testimoniData.critics.map((testimoni) => (
                  <TestimoniCard key={testimoni.id} testimoni={testimoni} />
                ))
              ) : (
                <p className="text-center col-span-full text-gray-500">
                  Belum ada testimoni tersedia
                </p>
              )}
            </div>
          </>
        )}

        {/* Load More Button */}
        {!loading && testimoniData.critics?.length > 0 && (
          <div className="text-center mt-8">
            <button
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                darkMode
                  ? "bg-teal-600 hover:bg-teal-700 text-white"
                  : "bg-teal-500 hover:bg-teal-600 text-white"
              } hover:shadow-lg active:scale-95`}
            >
              Lihat Lebih Banyak Testimoni
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimoniPage;
