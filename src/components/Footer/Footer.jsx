import React from "react";
import { useLocation } from "react-router-dom";
import { Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  const location = useLocation();
  const path = location.pathname;

  let footerClass = "footer";
  if (path === "/home" || path === "/presentacion") {
    footerClass += " footer--light-home";
  } else if (path === "/reportar" || path === "/protocolos") {
    footerClass += " footer--light-report";
  }

  return (
    <footer className={footerClass}>
      <div className="footer-top">
        <div className="footer-col align-center">
          <span className="label">Consultas</span>
          <a href="mailto:info@pumakawa.org" className="site-link">
            info@pumakawa.org
          </a>
        </div>
        <div className="footer-col align-center">
          <span className="label">Seguinos</span>
          <div className="social-links">
            <a href="https://www.facebook.com/Pumakawa/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
              <Facebook size={18} />
            </a>
            <a href="https://www.instagram.com/pumakawareserva/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="https://www.youtube.com/@Pumakawareserva" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="YouTube">
              <Youtube size={18} />
            </a>
          </div>
        </div>
        <div className="footer-col align-center">
          <span className="label">Más información en</span>
          <a href="https://pumakawa.org/" className="site-link">
           Pumakawa.org
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Pumared | Todos los derechos reservados</p>
      </div>
    </footer>
  );
}