import { useState } from "react";
import pumaBg from "./assets/puma-bg.png";
import { motion, AnimatePresence } from "framer-motion";
import { 
  PawPrint, 
  MapPin, 
  ShieldCheck, 
  X, 
  Globe,
  ChevronRight,
  Info
} from "lucide-react";

// Puma background image
const PUMA_BG = pumaBg;

const PumaRedLogo = () => (
  <div className="logo-container">
    <div className="logo-icon">
      <Globe size={40} strokeWidth={1.5} />
    </div>
    <div className="logo-text">
      <h1>PUMARED</h1>
      <p className="subtitle">RED CIUDADANA DE ALERTA TEMPRANA DE PUMAS</p>
    </div>
  </div>
);

const FeatureItem = ({ icon: Icon, title, description }) => (
  <div className="feature-item">
    <div className="feature-icon-wrapper">
      <Icon size={24} />
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

export default function App() {
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  return (
    <div className="app-shell">
      {/* Background with Overlay */}
      <div className="bg-container">
        <img src={PUMA_BG} alt="Puma Background" className="bg-image" />
        <div className="bg-overlay"></div>
      </div>

      <main className="content-wrapper">
        {/* Header */}
        <header className="header">
          <PumaRedLogo />
        </header>

        {/* Hero Section */}
        <div className="hero-section">
          {/* Main Info Card (Small) */}
          {!isInfoOpen && (
            <motion.div 
              className="info-card-preview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => setIsInfoOpen(true)}
            >
              <div className="preview-header">
                <div className="icon-badge">
                  <PawPrint size={20} />
                </div>
                <h2>¿Qué es PumaRed?</h2>
              </div>
              <p>
                PumaRed es un proyecto de ciencia ciudadana que busca generar información para promover la coexistencia entre las personas y la fauna silvestre en todo el país.
              </p>
              <button className="text-button">
                Conocer más <ChevronRight size={16} />
              </button>
            </motion.div>
          )}

          {/* Main CTA Button */}
          <div className="cta-container">
            <motion.button 
              className="primary-button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              COMENZAR
            </motion.button>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-top">
            <div className="footer-col">
              <span className="label">Un proyecto de</span>
              <div className="brand">
                <span>Pumakawa</span>
                <PawPrint size={14} className="brand-icon" />
              </div>
            </div>
            <div className="footer-col">
              <span className="label">Seguinos</span>
              <div className="social-links">
                <Globe size={18} />
                <Globe size={18} />
                <Globe size={18} />
              </div>
            </div>
            <div className="footer-col align-right">
              <span className="label">Más información en</span>
              <a href="https://pumared.org.ar" className="site-link">pumared.org.ar</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 Pumared | Todos los derechos reservados</p>
          </div>
        </footer>
      </main>

      {/* Bottom Sheet Modal */}
      <AnimatePresence>
        {isInfoOpen && (
          <>
            <motion.div 
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsInfoOpen(false)}
            />
            <motion.div 
              className="bottom-sheet"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="sheet-handle" onClick={() => setIsInfoOpen(false)} />
              <button className="close-button" onClick={() => setIsInfoOpen(false)}>
                <X size={24} />
              </button>

              <div className="sheet-content">
                <header className="sheet-header">
                  <h2>¿Qué es PumaRed?</h2>
                  <p>
                    PumaRed es un proyecto de ciencia ciudadana que busca relevar, sistematizar y generar información sobre el conflicto humano-carnívoros silvestres a nivel nacional, con foco en el puma (Puma concolor).
                  </p>
                  <p>
                    Tu participación es fundamental para construir una coexistencia armoniosa entre las especies silvestres y las actividades humanas en ambientes naturales, rurales y urbanos.
                  </p>
                </header>

                <div className="features-grid">
                  <FeatureItem 
                    icon={PawPrint} 
                    title="REPORTÁ" 
                    description="Avisanos si viste o tenés indicios de pumas." 
                  />
                  <FeatureItem 
                    icon={MapPin} 
                    title="SUMÁ" 
                    description="Cada reporte ayuda a mapear y entender su presencia." 
                  />
                  <FeatureItem 
                    icon={ShieldCheck} 
                    title="PROTEGÉ" 
                    description="Tu participación contribuye a su conservación." 
                  />
                </div>

                <div className="sheet-cta">
                  <motion.button 
                    className="primary-button dark-text"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    COMENZAR
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}