import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";


// Components
import NavBar from "../Navbar/NavBar";
import ReportForm from "../ReportFrom/ReportForm";
import Protocolos from "../Protocolos/Protocolos";
import Hero from "../Hero/Hero";
import Card from "../Card/Card";
import Footer from "../Footer/Footer";
import PresentacionPage from "../../pages/PresentacionPage";

// Assets
import pumaBg from "../../assets/puma-bg.png";
const PUMA_BG = pumaBg;

/* ── Components for Layout ── */
const PumaRedLogo = () => (
  <div className="logo-container">
    <img
      src="/PNG/PUMARED (logo)-BLANCO.png"
      alt="PUMARED"
      className="logo-image"
    />
    <p className="logo-subtitle">RED CIUDADANA DE ALERTA TEMPRANA DE PUMAS</p>
  </div>
);


/* ── Mapa de ruta → variante ── */
const ROUTE_VARIANT = {
  "/reportar": "report",
  "/home": "home",
  "/mapa": "mapa",
  "/protocolo": "protocolo",
  "/presentacion": "home",
};

export default function AppLayout() {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const location = useLocation();
  const variant = ROUTE_VARIANT[location.pathname] ?? "report";

  return (
    <div className="app-shell">
      {/* Background with Overlay */}
      <div className="bg-container">
        <img src={PUMA_BG} alt="Puma Background" className="bg-image" />
        <div className="bg-overlay"></div>
      </div>

      {location.pathname !== "/" && location.pathname !== "/presentacion" && (
        <>
          <NavBar variant={variant} />
          <div className="nb-spacer" />
        </>
      )}


      <main className="content-wrapper">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Header */}
                <header className="header">
                  <PumaRedLogo />
                </header>

                <Hero setIsInfoOpen={setIsInfoOpen} />
              </>
            }
          />

          <Route path="/reportar" element={<ReportForm />} />
          <Route path="/home" element={<PresentacionPage />} />
                {/* Añadir el resto de páginas aquí */}
                {/* <Route path="/home"      element={<HomePage />} /> */}
                {/* <Route path="/mapa"      element={<MapaPage />} /> */}
                {/* <Route path="/protocolo" element={<ProtocoloPage />} /> */}
          <Route path="/protocolos" element={<Protocolos />} />
        </Routes>

        {location.pathname !== "/presentacion" && <Footer />}
      </main>

      <Card isInfoOpen={isInfoOpen} setIsInfoOpen={setIsInfoOpen} />
    </div>
  );
}
