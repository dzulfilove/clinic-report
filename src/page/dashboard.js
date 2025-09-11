import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "../contexts/themeContext"; // Sesuaikan path sesuai struktur folder
import DataTable from "../components/dataTables";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/db";
import fetchProgressData, {
  fetchSentimentData,
  UpdateData,
} from "../utils/dashboardUtils";
import Loader from "../components/loader";
import TestimoniCard from "../components/testimoniCard";

const columns = [
  { header: "Nama Pasien", accessor: "name" },
  { header: "No. Telepon", accessor: "phone" },
  { header: "Kelas", accessor: "class" },
  { header: "Kritik & Saran", accessor: "critics" },
  { header: "Tanggal", accessor: "createdAt" },
];
export default function Dashboard() {
  const { darkMode, toggleTheme } = useTheme();
  const [data, setData] = useState([]);
  const [dataSentiment, setDataSentiment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // UpdateData();
    fetchProgressData(setData, setLoading, setError);
    fetchSentimentData(setDataSentiment, setLoading, setError);
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
  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={fetchProgressData(setData, setLoading, setError)}>
          Coba Lagi
        </button>
      </div>
    );
  }
  const COLORS = {
    Negative: "#FF8042", // orange
    Positive: "#00C49F", // hijau
  };
  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      } min-h-screen p-6 transition-colors duration-300`}
    >
      {/* Header */}
      <div className="flex justify-center items-center mb-6">
        <h1
          className={`text-3xl font-bold text-center ${
            darkMode ? "text-teal-400" : "text-teal-600"
          }`}
        >
          Dashboard Transparansi Klinik
        </h1>
      </div>

      <p className="text-center mb-8 max-w-2xl mx-auto text-gray-400">
        Platform transparansi yang menampilkan wawasan statistik dari umpan
        balik anonim pasien untuk meningkatkan kualitas pelayanan kesehatan.
      </p>

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div
          className={`${
            darkMode ? "bg-gray-800" : "bg-white"
          } rounded-2xl p-4 shadow`}
        >
          <p className="text-2xl font-bold">{data.summary.total}</p>
          <p className="text-gray-400 text-sm">Total Umpan Balik Terkirim</p>
          {/* <p className="text-green-500 text-sm">+12.5%</p> */}
        </div>
        <div
          className={`${
            darkMode ? "bg-gray-800" : "bg-white"
          } rounded-2xl p-4 shadow`}
        >
          <p className="text-2xl font-bold">
            {((data.summary.positive / data.summary.total) * 100).toFixed(2)}%
          </p>
          <p className="text-gray-400 text-sm">Skor Kepuasan Positif</p>
          {/* <p className="text-green-500 text-sm">+0.3</p> */}
        </div>
        <div
          className={`${
            darkMode ? "bg-gray-800" : "bg-white"
          } rounded-2xl p-4 shadow`}
        >
          <p className="text-2xl font-bold">
            {((data.summary.negative / data.summary.total) * 100).toFixed(2)}%
          </p>
          <p className="text-gray-400 text-sm">Skor Kepuasan Negatif</p>
          {/* <p className="text-green-500 text-sm">+8.2%</p> */}
        </div>
        <div
          className={`${
            darkMode ? "bg-gray-800" : "bg-white"
          } rounded-2xl p-4 shadow`}
        >
          <p className="text-2xl font-bold">
            {((data.summary.replied / data.summary.total) * 100).toFixed(2)}%
          </p>
          <p className="text-gray-400 text-sm">Tingkat Respon</p>
          {/* <p className="text-green-500 text-sm">+5.1%</p> */}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className={`${
            darkMode ? "bg-gray-800" : "bg-white"
          } rounded-2xl p-4 shadow`}
        >
          <h2 className="text-lg font-semibold mb-4">Tren Chat Terbalas</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data.lineData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={darkMode ? "#374151" : "#d1d5db"}
              />
              <XAxis dataKey="name" stroke={darkMode ? "#9ca3af" : "#374151"} />
              <YAxis
                domain={[0, 5]}
                stroke={darkMode ? "#9ca3af" : "#374151"}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="skor"
                stroke="#14b8a6"
                strokeWidth={3}
                dot={{ fill: "#14b8a6", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div
          className={`${
            darkMode ? "bg-gray-800" : "bg-white"
          } rounded-2xl p-4 shadow`}
        >
          <h2 className="text-lg font-semibold mb-4">Distribusi Umpan Balik</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data.pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                dataKey="value"
                label
              >
                {data.pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[entry.name] || "#8884d8"} // pakai warna sesuai name
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mt-8 w-100 hidden md:block">
        <DataTable
          data={dataSentiment}
          columns={columns}
          title={"Data Kepuasan Pasien 3 Hari Ke Belakang"}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 mt-8 md:hidden">
        <div className="text-center text-base text-bold flex w-100 p-4 border border-slate-600 rounded-xl bg-slate-800">Data Kepuasan 3 Hari Kebelakang</div>
        {dataSentiment?.length > 0 ? (
          dataSentiment.map((testimoni) => (
            <TestimoniCard key={testimoni.id} testimoni={testimoni} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            Belum ada testimoni tersedia
          </p>
        )}
      </div>
    </div>
  );
}
