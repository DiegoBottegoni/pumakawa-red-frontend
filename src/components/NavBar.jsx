import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import "./NavBar.css";

/* ── Nav links ─────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Inicio",    href: "/home" },
  { label: "Reportar",  href: "/reportar" },
  { label: "Protocolo", href: "/protocolo" },
];

/* ── Icons ──────────────────────────────────────────────────── */
const IconMenu = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <line x1="3" y1="6"  x2="21" y2="6"  />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const IconClose = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <line x1="18" y1="6"  x2="6"  y2="18" />
    <line x1="6"  y1="6"  x2="18" y2="18" />
  </svg>
);

/* ──────────────────────────────────────────────────────────────
   Props:
     variant: "report" | "home" | "mapa" | "protocolo"
              (default: "report")
   Cada página importa su CSS de variante y pasa el prop.
   ────────────────────────────────────────────────────────────── */
export default function NavBar({ variant = "report" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  /* Sombra al hacer scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Cerrar drawer al cambiar de ruta */
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  /* Bloquear scroll del body cuando el drawer está abierto */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (href) => location.pathname === href;

  /* Clase de variante para el wrapper raíz */
  const rootClass = `nb-root nb-root--${variant}`;

  return (
    <div className={rootClass}>

      {/* ── Header fijo ── */}
      <header className={`nb-header${scrolled ? " nb-header--scrolled" : ""}`}>
        <nav className="nb-nav" aria-label="Navegación principal">

          {/* Logo */}
          <Link to="/home" className="nb-logo" aria-label="PUMARED - Inicio">
            <img
              src="/PNG/PUMARED (logo)-BLANCO.png"
              alt="PUMARED"
              className="nb-logo-img"
            />
          </Link>

          {/* Links desktop */}
          <ul className="nb-links" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={`nb-link${isActive(link.href) ? " nb-link--active" : ""}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA desktop */}
          <Link
            to="/reportar"
            className={`nb-cta${isActive("/reportar") ? " nb-cta--active" : ""}`}
            id="nb-report-btn"
          >
            Reportar Avistamiento
          </Link>

          {/* Hamburger mobile */}
          <button
            className="nb-burger"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="nb-mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <IconClose /> : <IconMenu />}
          </button>

        </nav>
      </header>

      {/* ── Drawer mobile ── */}
      <div
        id="nb-mobile-menu"
        className={`nb-drawer${menuOpen ? " nb-drawer--open" : ""}`}
        aria-hidden={!menuOpen}
      >
        {/* Header del drawer */}
        <div className="nb-drawer-header">
          <img
            src="/PNG/PUMARED (logo)-BLANCO.png"
            alt="PUMARED"
            className="nb-drawer-logo"
          />
        </div>

        {/* Links */}
        <ul className="nb-drawer-links" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className={`nb-drawer-link${isActive(link.href) ? " nb-drawer-link--active" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA mobile */}
        <Link
          to="/reportar"
          className="nb-drawer-cta"
          onClick={() => setMenuOpen(false)}
          id="nb-report-btn-mobile"
        >
          Reportar Avistamiento
        </Link>
      </div>

      {/* ── Overlay backdrop ── */}
      {menuOpen && (
        <div
          className="nb-backdrop"
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
        />
      )}

    </div>
  );
}