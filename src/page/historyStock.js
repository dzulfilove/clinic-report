import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "../components/card";
import { getStokAkhir } from "../utils/historyStockUtils";
import DataTable from "../components/dataTables";
import { useTheme } from "../contexts/themeContext";

export default function StokHabisPage() {
  const searchParams = useSearchParams()[0];
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const { darkMode, toggleTheme } = useTheme();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const result = await getStokAkhir(date, time);
      setData(result);
      setLoading(false);
    }
    if (date && time) load();
  }, [date, time]);

  const columns = [
    { header: "Kode ", accessor: "code" },
    { header: "Nama", accessor: "name" },
    { header: "Min. Stock", accessor: "minStock" },
    { header: "Stock", accessor: "stock" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen py-4 sm:py-6 lg:py-8 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      } transition-colors duration-300`}
    >
      <h1 className="text-2xl font-semibold mb-4 text-center">Laporan Stok Hampir Habis</h1>
      <div className="text-sm flex w-full justify-center mb-10 gap-2">
        Tanggal: <span className="font-medium">{date}</span> — Jam:{" "}
        <span className="font-medium">{time}</span>
      </div>
      <Card className="shadow-md rounded-2xl">
        <CardContent className="p-4">
          <div className="overflow-hidden">
            {loading ? (
              <p className="text-center">Loading...</p>
            ) : (
              <>
                <div className="mt-8 w-100 hidden md:block">
                  <DataTable
                    data={data}
                    columns={columns}
                    title={"Data Stock Hampir Habis"}
                  />
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
