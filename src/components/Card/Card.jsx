import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, PawPrint, MapPin, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* Simple hook to detect desktop */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 768 : false
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isDesktop;
}

const FeatureItem = ({ icon: Icon, title, description }) => (
  <div className="feature-item">
    <div className="feature-icon-wrapper">
      <Icon size={24} />
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

export default function Card({ isInfoOpen, setIsInfoOpen }) {
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();

  const handleStart = () => {
    setIsInfoOpen(false);
    navigate("/reportar");
  };

  /* Animation variants: slide-up on mobile, scale on desktop */
  const sheetVariants = isDesktop
    ? {
        initial: { opacity: 0, scale: 0.92 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.92 },
      }
    : {
        initial: { y: "100%" },
        animate: { y: 0 },
        exit: { y: "100%" },
      };

  return (
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
            initial={sheetVariants.initial}
            animate={sheetVariants.animate}
            exit={sheetVariants.exit}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div
              className="sheet-handle"
              onClick={() => setIsInfoOpen(false)}
            />
            <button
              className="close-button"
              onClick={() => setIsInfoOpen(false)}
            >
              <X size={24} />
            </button>

            <div className="sheet-content">
              <header className="sheet-header">
                <h2>¿Qué es PumaRed?</h2>
                <p>
                  PumaRed es un proyecto de ciencia ciudadana que busca
                  relevar, sistematizar y generar información sobre el
                  conflicto humano-carnívoros silvestres a nivel nacional, con
                  foco en el puma (Puma concolor).
                </p>
                <p>
                  Tu participación es fundamental para construir una
                  coexistencia armoniosa entre las especies silvestres y las
                  actividades humanas en ambientes naturales, rurales y
                  urbanos.
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
                  onClick={handleStart}
                >
                  COMENZAR
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
