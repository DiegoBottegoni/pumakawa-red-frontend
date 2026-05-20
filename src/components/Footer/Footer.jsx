import React from "react";
import { PawPrint, Globe } from "lucide-react";

export default function Footer() {
  return (
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
          <a href="https://pumared.org.ar" className="site-link">
            pumared.org.ar
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Pumared | Todos los derechos reservados</p>
      </div>
    </footer>
  );
}