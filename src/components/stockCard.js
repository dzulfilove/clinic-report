// components/dataStockCard.jsx
import React from "react";
import { useTheme } from "../contexts/themeContext";
import { Star } from "lucide-react"; // pake lucide-react untuk ikon bintang

const StockCard = ({ dataStock }) => {
  const { darkMode } = useTheme();
  console.log("data", dataStock);
  return (
    <div
      className={`rounded-2xl p-6 shadow-lg ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
      } transition-colors duration-300 ${Math.ceil(dataStock.stock)>0?"border":"border-2 border-red-500"}`}
    >
      <div className="w-full flex justify-between items-start">
        <div className="w-[50%] flex justify-between items-center flex-col ">
          <h3 className="font-semibold text-2xl text-red-500">
            {Math.ceil(dataStock.stock)}
          </h3>
          <h3 className="font-semibold">Stok Saat Ini</h3>
        </div>
        <div className="w-[50%] flex justify-between items-center flex-col ">
          <h3 className="font-semibold text-2xl">{Math.ceil(dataStock.minStock)}</h3>
          <h3 className="font-semibold">Min. Stok</h3>
        </div>
      </div>
      <div className="mt-2 w-full flex justify-center">
        <h3 className="font-semibold text-xl">{dataStock.name}</h3>
        <p
          className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          {dataStock.createdAt}
        </p>
      </div>
    </div>
  );
};

export default StockCard;
