// pages/FeedbackDataPage.jsx
import { useTheme } from "../contexts/themeContext";
import DataTable from "../components/dataTables";
import FeedbackFilter from "../components/feedBackFilter";
import FeedbackStats from "../components/feedbackStatistik";
import { useState, useMemo, useEffect } from "react";
import { getFeedbackData } from "../utils/feedBackUtils";
import TestimoniCard from "../components/testimoniCard";

export const columns = [
  { header: "Nama Pasien", accessor: "name" },
  { header: "No. Telepon", accessor: "phone" },
  { header: "Kelas", accessor: "class" },
  { header: "Kritik & Saran", accessor: "critics" },
  { header: "Tanggal", accessor: "createdAt" },
  { header: "Terbalas", accessor: "answer" },
];

const FeedbackDataPage = () => {
  const { darkMode } = useTheme();
  const [filters, setFilters] = useState({
    tahun: "",
    bulan: "",
    dariTanggal: "",
    sampaiTanggal: "",
  });
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handler filter
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleViewData = () => {
    setIsFilterApplied(true);
    getFeedbackData(filters, setLoading, setFeedbackData);
  };

  const clearFilters = () => {
    setFilters({
      tahun: "",
      bulan: "",
      dariTanggal: "",
      sampaiTanggal: "",
    });
    setIsFilterApplied(false);
    getFeedbackData(filters, setLoading, setFeedbackData);
  };

  // disable tanggal kalau ada filter tahun/bulan
  const isDateDisabled = filters.tahun || filters.bulan;

  // useEffect(() => {
  //   getFeedbackData(filters, setLoading, setFeedbackData);
  // }, []);

  return (
    <div
      className={`min-h-screen py-4 sm:py-6 lg:py-8 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      } transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <h1
          className={`text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 ${
            darkMode ? "text-teal-400" : "text-teal-600"
          }`}
        >
          Data Kepuasan Pasien
        </h1>

        <FeedbackFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          onViewData={handleViewData}
          isDateDisabled={isDateDisabled} // kirim ke komponen filter
        />

        {/* Tombol Reset Filter */}
        {isFilterApplied && (
          <div className="mb-4 sm:mb-6 text-right">
            <button
              onClick={clearFilters}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                darkMode
                  ? "bg-gray-600 hover:bg-gray-700 text-white"
                  : "bg-gray-300 hover:bg-gray-400 text-gray-900"
              } hover:shadow-lg active:scale-95`}
            >
              Reset Filter
            </button>
          </div>
        )}

        <div className="mb-6">
          <FeedbackStats data={feedbackData} />
        </div>

        <div className="overflow-hidden">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <>
              <div className="mt-8 w-100 hidden md:block">
                <DataTable
                  data={feedbackData}
                  columns={columns}
                  title={"Data Kepuasan Pasien"}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 mt-8 md:hidden">
                <div className="text-center text-base text-bold flex w-100 p-4 border border-slate-600 rounded-xl bg-slate-800">
                  Data Kepuasann Pasien
                </div>
                {feedbackData?.length > 0 ? (
                  feedbackData.map((testimoni) => (
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
        </div>
      </div>
    </div>
  );
};

export default FeedbackDataPage;
