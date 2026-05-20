import React from "react";
import { motion } from "framer-motion";
import { PawPrint } from "lucide-react";

export default function Hero({ setIsInfoOpen }) {
  return (
    <div className="hero-section">
      {/* Card de info */}
      <motion.div
        className="info-card-preview"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onClick={() => setIsInfoOpen(true)}
        whileTap={{ scale: 0.97 }}
      >
        <div className="preview-header">
          <div className="icon-badge">
            <PawPrint size={20} />
          </div>
          <h2>¿Qué es PumaRed?</h2>
        </div>
      </motion.div>
    </div>
  );
}
