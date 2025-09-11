// components/DataTable.jsx
import React, { useState } from "react";
import { useTheme } from "../contexts/themeContext";

const DataTable = ({ data, columns,title }) => {
  const { darkMode } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  // Fungsi untuk mengurutkan data
  const sortedData = React.useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  // Fungsi untuk request sort
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  // Fungsi untuk download CSV
  const downloadCSV = () => {
    const csvContent = [
      columns.map((col) => `"${col.header}"`).join(","),
      ...data.map((row) =>
        columns.map((col) => `"${row[col.accessor]}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "data_kepuasan_pasien.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className={`rounded-2xl p-6 shadow-lg ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
      } transition-colors duration-300`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button
          onClick={downloadCSV}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
            darkMode
              ? "bg-teal-600 hover:bg-teal-700 text-white"
              : "bg-teal-500 hover:bg-teal-600 text-white"
          } hover:shadow-lg active:scale-95 flex items-center gap-2`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Download CSV
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={`${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
              {columns.map((column) => (
                <th
                  key={column.accessor}
                  className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer transition-colors duration-200"
                  onClick={() => requestSort(column.accessor)}
                >
                  <div className="flex items-center gap-1">
                    {column.header}
                    {sortConfig.key === column.accessor && (
                      <span>
                        {sortConfig.direction === "ascending" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {currentItems.map((row, index) => (
              <tr
                key={index}
                className={`${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                } transition-colors duration-200`}
              >
                  {columns.map((column) => (
                  <td key={column.accessor} className="px-4 py-4 text-sm">
                    {column.accessor === "class" ? (
                      <span
                        className={`inline-flex justify-center items-center px-4 py-1 w-16 rounded-full text-xs font-medium
      ${
        row[column.accessor] === "positive"
          ? darkMode
            ? "bg-green-900 text-green-200"
            : "bg-green-100 text-green-800"
          : row[column.accessor] === "negative"
          ? darkMode
            ? "bg-red-900 text-red-200"
            : "bg-red-100 text-red-800"
          : darkMode
          ? "bg-gray-700 text-gray-200"
          : "bg-gray-200 text-gray-800"
      }`}
                      >
                        {row[column.accessor] ?? "Neutral"}
                      </span>
                    ) : column.accessor === "answer" ? (
                      <span
                        className={`inline-flex justify-center items-center px-4 py-1 w-16 rounded-full text-xs font-medium ${
                          row[column.accessor]
                            ? darkMode
                              ? "bg-blue-900 text-blue-200"
                              : "bg-blue-100 text-blue-800"
                            : darkMode
                            ? "bg-yellow-900 text-yellow-200"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {row[column.accessor] === undefined
                          ? "-"
                          : row[column.accessor]
                          ? "Ya"
                          : "Tidak"}
                      </span>
                    ) : column.accessor === "createdAt" ? (
                      row[column.accessor] ? (
                        new Date(row[column.accessor]).toLocaleDateString(
                          "id-ID"
                        )
                      ) : (
                        "-"
                      )
                    ) : (
                      row[column.accessor] ?? "-"
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          className={`flex justify-between items-center mt-6 pt-4 border-t ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-lg text-sm font-medium ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            } transition-colors duration-200`}
          >
            Previous
          </button>

          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-lg text-sm font-medium ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            } transition-colors duration-200`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DataTable;
