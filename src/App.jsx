import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import NavBar from "./components/Navbar/NavBar";
import ReportForm from "./components/ReportFrom/ReportForm";
import Protocolos from "./components/Protocolos/Protocolos";

/* ── CSS de variantes: cada página importa el suyo ── */
import "./components/Navbar/NavBarReport.css";
import "./components/Navbar/NavBarHome.css";
import "./components/Navbar/NavBarMapa.css";
import "./components/Navbar/NavBarProtocolo.css";

/* ── Mapa de ruta → variante ── */
const ROUTE_VARIANT = {
  "/reportar": "report",
  "/home": "home",
  "/mapa": "mapa",
  "/protocolo": "protocolo",
};

/* Componente interno que lee la ruta y elige la variante */
function AppLayout() {
  const location = useLocation();
  const variant = ROUTE_VARIANT[location.pathname] ?? "report";

  return (
    <>
      <NavBar variant={variant} />
      <div className="nb-spacer" />
      <Routes>
        <Route path="/reportar" element={<ReportForm />} />
        {/* Añadir el resto de páginas aquí */}
        {/* <Route path="/home"      element={<HomePage />} /> */}
        {/* <Route path="/mapa"      element={<MapaPage />} /> */}
        {/* <Route path="/protocolo" element={<ProtocoloPage />} /> */}
        <Route path="/protocolos" element={<Protocolos />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
