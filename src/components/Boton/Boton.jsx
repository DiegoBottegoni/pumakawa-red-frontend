import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Boton() {
  const navigate = useNavigate();

  return (
    <div className="cta-container">
      <motion.button
        className="primary-button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate("/home")}
      >
        COMENZAR
      </motion.button>
    </div>
  );
}