// components/FeedbackFilter.jsx
import React from "react";
import { useTheme } from "../contexts/themeContext";

const FeedbackFilter = ({ filters, onFilterChange, onViewData }) => {
  const { darkMode } = useTheme();

  const tahunOptions = [2025, 2024, 2023];
  const bulanOptions = [
    { value: "01", label: "Jan" },
    { value: "02", label: "Feb" },
    { value: "03", label: "Mar" },
    { value: "04", label: "Apr" },
    { value: "05", label: "Mei" },
    { value: "06", label: "Jun" },
    { value: "07", label: "Jul" },
    { value: "08", label: "Agu" },
    { value: "09", label: "Sep" },
    { value: "10", label: "Okt" },
    { value: "11", label: "Nov" },
    { value: "12", label: "Des" },
  ];

  // Cek apakah input tanggal harus dinonaktifkan
  const isDateDisabled = filters.tahun || filters.bulan;

  // Handler untuk mengubah filter dengan logika eksklusif
  const handleFilterChange = (key, value) => {
    // Jika memilih tahun atau bulan, reset tanggal
    if ((key === "tahun" && value) || (key === "bulan" && value)) {
      onFilterChange("dariTanggal", "");
      onFilterChange("sampaiTanggal", "");
    }
    // Jika memilih tanggal, reset tahun dan bulan
    else if (
      (key === "dariTanggal" && value) ||
      (key === "sampaiTanggal" && value)
    ) {
      onFilterChange("tahun", "");
      onFilterChange("bulan", "");
    }

    // Selalu update filter yang dimaksud
    onFilterChange(key, value);
  };

  return (
    <div
      className={`rounded-2xl p-4 sm:p-6 shadow-lg ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
      } transition-colors duration-300 mb-6`}
    >
      <h3 className="text-lg font-semibold mb-4">Filter Data</h3>

      {/* Desktop Layout - Horizontal */}
      <div className="hidden md:flex flex-col lg:flex-row gap-4 items-end">
        {/* Filter Tahun */}
        <div className="flex-1 min-w-[120px]">
          <label className="block text-sm font-medium mb-2">Tahun</label>
          <select
            value={filters.tahun}
            onChange={(e) => handleFilterChange("tahun", e.target.value)}
            className={`w-full p-2 rounded-lg border text-sm ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            <option value="">Semua Tahun</option>
            {tahunOptions.map((tahun) => (
              <option key={tahun} value={tahun}>
                {tahun}
              </option>
            ))}
          </select>
        </div>

        {/* Filter Bulan */}
        <div className="flex-1 min-w-[120px]">
          <label className="block text-sm font-medium mb-2">Bulan</label>
          <select
            value={filters.bulan}
            onChange={(e) => handleFilterChange("bulan", e.target.value)}
            className={`w-full p-2 rounded-lg border text-sm ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            <option value="">Semua Bulan</option>
            {bulanOptions.map((bulan) => (
              <option key={bulan.value} value={bulan.value}>
                {bulan.label}
              </option>
            ))}
          </select>
        </div>

        {/* Filter Periode Tanggal - Dari */}
        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm font-medium mb-2">Dari Tanggal</label>
          <input
            type="date"
            value={filters.dariTanggal}
            onChange={(e) => handleFilterChange("dariTanggal", e.target.value)}
            disabled={isDateDisabled}
            className={`w-full p-2 rounded-lg border text-sm ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            } ${isDateDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
          />
        </div>

        {/* Filter Periode Tanggal - Sampai */}
        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm font-medium mb-2">
            Sampai Tanggal
          </label>
          <input
            type="date"
            value={filters.sampaiTanggal}
            onChange={(e) =>
              handleFilterChange("sampaiTanggal", e.target.value)
            }
            disabled={isDateDisabled}
            className={`w-full p-2 rounded-lg border text-sm ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            } ${isDateDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
          />
        </div>

        {/* Tombol Lihat Data */}
        <div className="min-w-[120px]">
          <button
            onClick={onViewData}
            className={`w-full px-4 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm ${
              darkMode
                ? "bg-teal-600 hover:bg-teal-700 text-white"
                : "bg-teal-500 hover:bg-teal-600 text-white"
            } hover:shadow-lg active:scale-95`}
          >
            Lihat Data
          </button>
        </div>
      </div>

      {/* Mobile Layout - Vertical */}
      <div className="md:hidden space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Filter Tahun */}
          <div>
            <label className="block text-sm font-medium mb-2">Tahun</label>
            <select
              value={filters.tahun}
              onChange={(e) => handleFilterChange("tahun", e.target.value)}
              className={`w-full p-2 rounded-lg border text-sm ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              <option value="">Semua Tahun</option>
              {tahunOptions.map((tahun) => (
                <option key={tahun} value={tahun}>
                  {tahun}
                </option>
              ))}
            </select>
          </div>

          {/* Filter Bulan */}
          <div>
            <label className="block text-sm font-medium mb-2">Bulan</label>
            <select
              value={filters.bulan}
              onChange={(e) => handleFilterChange("bulan", e.target.value)}
              className={`w-full p-2 rounded-lg border text-sm ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              <option value="">Semua Bulan</option>
              {bulanOptions.map((bulan) => (
                <option key={bulan.value} value={bulan.value}>
                  {bulan.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Filter Periode Tanggal - Dari */}
          <div>
            <label className="block text-sm font-medium mb-2">Dari</label>
            <input
              type="date"
              value={filters.dariTanggal}
              onChange={(e) =>
                handleFilterChange("dariTanggal", e.target.value)
              }
              disabled={isDateDisabled}
              className={`w-full p-2 rounded-lg border text-sm ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              } ${isDateDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
            />
          </div>

          {/* Filter Periode Tanggal - Sampai */}
          <div>
            <label className="block text-sm font-medium mb-2">Sampai</label>
            <input
              type="date"
              value={filters.sampaiTanggal}
              onChange={(e) =>
                handleFilterChange("sampaiTanggal", e.target.value)
              }
              disabled={isDateDisabled}
              className={`w-full p-2 rounded-lg border text-sm ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              } ${isDateDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
            />
          </div>
        </div>

        {/* Informasi jika tanggal dinonaktifkan */}
        {isDateDisabled && (
          <div
            className={`text-xs p-2 rounded-lg ${
              darkMode
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Input tanggal dinonaktifkan karena filter bulan/tahun dipilih
          </div>
        )}

        {/* Tombol Lihat Data */}
        <div>
          <button
            onClick={onViewData}
            className={`w-full px-4 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm ${
              darkMode
                ? "bg-teal-600 hover:bg-teal-700 text-white"
                : "bg-teal-500 hover:bg-teal-600 text-white"
            } hover:shadow-lg active:scale-95`}
          >
            Terapkan Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackFilter;
