import { motion } from "framer-motion";
import Boton from "../Boton/Boton";

export default function Hero({ setIsInfoOpen }) {
  return (
    <div className="hero-section">
      <Boton />
      {/* Card de info */}
      <motion.div
        className="info-card-preview"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onClick={() => setIsInfoOpen(true)}
        whileTap={{ scale: 0.97 }}
      >
        <h2>¿Qué es PumaRed?</h2>
      </motion.div>
    </div>
  );
}
