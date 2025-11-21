import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicRoute from "./publicRoute";
import Layout from "./layout";
import Dashboard from "./page/dashboard";
import { NavbarProvider } from "./contexts/navbarContext";
import TestimoniPage from "./page/testimoni";
import FeedbackDataPage from "./page/feedBackPage";
import StokHabisPage from "./page/historyStock"; // <--- Tambah ini

function App() {
  return (
    <BrowserRouter>
      <NavbarProvider>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="/testimoni" element={<TestimoniPage />} />
              <Route path="/feedback" element={<FeedbackDataPage />} />
              <Route path="/stok-habis" element={<StokHabisPage />} />
            </Route>
          </Route>
        </Routes>
      </NavbarProvider>
    </BrowserRouter>
  );
}

export default App;
