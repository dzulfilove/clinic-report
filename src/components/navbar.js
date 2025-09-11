import { Link } from "react-router-dom";
import { useNavbar } from "../contexts/navbarContext";
import { useTheme } from "../contexts/themeContext";

export default function Navbar() {
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useNavbar();
  const { darkMode, toggleTheme } = useTheme();

  return (
    <nav
      className={`sticky top-0 z-50 ${
        darkMode
          ? "bg-gray-900/95 text-gray-100 border-gray-600/50 shadow-black/30"
          : "bg-white/95 text-gray-900 border-gray-200/50 shadow-gray-900/5"
      } backdrop-blur-xl border-b shadow-lg transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center gap-2 sm:gap-3 flex-shrink-0 group transition-all duration-300 hover:scale-105"
              onClick={closeMobileMenu}
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3">
                <span className="text-white text-xs sm:text-sm md:text-lg font-bold">
                  💰
                </span>
              </div>
              <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 bg-clip-text text-transparent">
                <span className="hidden sm:inline">Clinic Report</span>
                <span className="sm:hidden">Clinic Report</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`relative ${
                darkMode
                  ? "text-gray-300 hover:text-emerald-400 hover:bg-emerald-900/20"
                  : "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/50"
              } px-3 lg:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 group`}
            >
              Home
            </Link>
            <Link
              to="/feedback"
              className={`relative ${
                darkMode
                  ? "text-gray-300 hover:text-emerald-400 hover:bg-emerald-900/20"
                  : "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/50"
              } px-3 lg:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 group`}
            >
              Data Statistik
            </Link>
            <Link
              to="/testimoni"
              className={`relative ${
                darkMode
                  ? "text-gray-300 hover:text-emerald-400 hover:bg-emerald-900/20"
                  : "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/50"
              } px-3 lg:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 group`}
            >
              Kepuasan
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl ${
                darkMode
                  ? "bg-teal-500 hover:bg-teal-600"
                  : "bg-teal-500 hover:bg-teal-600"
              } text-white transition-all duration-200 text-sm font-medium active:scale-95`}
            >
              {darkMode ? "🌞 Light" : "🌙 Dark"}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className={`md:hidden p-1.5 sm:p-2 rounded-lg sm:rounded-xl ${
                darkMode
                  ? "text-gray-300 hover:text-emerald-400 hover:bg-emerald-900/20"
                  : "text-gray-600 hover:text-emerald-600 hover:bg-emerald-50/50"
              } transition-all duration-200 active:scale-95`}
              aria-label="Toggle mobile menu"
            >
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 ${
                  isMobileMenuOpen ? "rotate-90" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-96 opacity-100 pb-3 sm:pb-4"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div
            className={`px-2 pt-2 pb-3 space-y-1 ${
              darkMode
                ? "bg-gray-800/80 border-gray-600/50"
                : "bg-white/80 border-gray-200/50"
            } backdrop-blur-sm rounded-xl border mt-2 shadow-lg`}
          >
            <Link
              to="/"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${
                darkMode
                  ? "text-gray-300 hover:text-emerald-400 hover:bg-emerald-900/20"
                  : "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/50"
              } text-sm font-medium transition-all duration-200 active:scale-95`}
              onClick={closeMobileMenu}
            >
              🏠 Home
            </Link>
            <Link
              to="/about"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${
                darkMode
                  ? "text-gray-300 hover:text-emerald-400 hover:bg-emerald-900/20"
                  : "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/50"
              } text-sm font-medium transition-all duration-200 active:scale-95`}
              onClick={closeMobileMenu}
            >
              ℹ️ About
            </Link>
            <Link
              to="/contact"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${
                darkMode
                  ? "text-gray-300 hover:text-emerald-400 hover:bg-emerald-900/20"
                  : "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/50"
              } text-sm font-medium transition-all duration-200 active:scale-95`}
              onClick={closeMobileMenu}
            >
              📞 Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
