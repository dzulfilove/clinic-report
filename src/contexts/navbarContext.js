import { createContext, useContext, useState } from "react";

const NavbarContext = createContext();

export const NavbarProvider = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <NavbarContext.Provider
      value={{ isMobileMenuOpen, toggleMobileMenu, closeMobileMenu }}
    >
      {children}
    </NavbarContext.Provider>
  );
};

// Custom hook biar gampang dipakai
export const useNavbar = () => useContext(NavbarContext);
