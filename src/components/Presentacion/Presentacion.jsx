import { Camera, MapPin, Eye, PawPrint } from "lucide-react";
import "./presentacion.css";

/* ── Sub-components reutilizables ── */

/** Logo circular con icono */
const LogoBadge = ({ icon: Icon, className = "" }) => (
  <div className={`presentacion-logo ${className}`}>
    <Icon />
  </div>
);

/** Card de acción (botón principal / secundario) */
const ActionCard = ({
  icon: Icon,
  title,
  subtitle,
  variant = "primary",
  onClick,
}) => (
  <button
    type="button"
    className={`presentacion-action-card presentacion-action-card--${variant}`}
    onClick={onClick}
  >
    <span className="presentacion-action-icon">
      <Icon />
    </span>
    <span className="presentacion-action-content">
      <span className="presentacion-action-title">{title}</span>
      <span className="presentacion-action-subtitle">{subtitle}</span>
    </span>
  </button>
);

/** Ítem de reporte con icono beige */
const ReportItem = ({ icon: Icon, name, description }) => (
  <div className="presentacion-report-item">
    <div className="presentacion-report-icon">
      <Icon />
    </div>
    <div className="presentacion-report-content">
      <span className="presentacion-report-name">{name}</span>
      <span className="presentacion-report-desc">{description}</span>
    </div>
  </div>
);

/* ── Componente principal ── */

const Presentacion = ({ onReportar, onVerMapa }) => {
  return (
    <div className="presentacion-root">
      <div className="presentacion-container">
        {/* ─── Header ─── */}
        <header className="presentacion-header pr-animate">
          <LogoBadge icon={PawPrint} />
          <span className="presentacion-brand">PUMARED</span>
        </header>

        {/* ─── Información ─── */}
        <section className="presentacion-info pr-animate pr-animate-delay-1">
          <h1 className="presentacion-info-title">¿Qué es PumaRed?</h1>
          <p className="presentacion-info-text">
            PumaRed es un proyecto de ciencia ciudadana que busca relevar,
            sistematizar y generar información sobre el conflicto
            humano-carnívoros silvestres.
          </p>
          <p className="presentacion-info-text">
            Tu participación es clave para proteger la biodiversidad y promover
            la convivencia con la fauna nativa.
          </p>
        </section>

        {/* ─── Acciones ─── */}
        <div className="presentacion-actions">
          <div className="pr-animate pr-animate-delay-2">
            <ActionCard
              icon={Camera}
              title="Reportar avistamiento"
              subtitle="Registra encuentros, huellas o conflictos."
              variant="primary"
              onClick={onReportar}
            />
          </div>
          <div className="pr-animate pr-animate-delay-3">
            <ActionCard
              icon={MapPin}
              title="Ver mapa"
              subtitle="Avistamientos reportados."
              variant="secondary"
              onClick={onVerMapa}
            />
          </div>
        </div>

        {/* ─── Sección inferior ─── */}
        <section className="presentacion-bottom pr-animate pr-animate-delay-4">
          <h2 className="presentacion-bottom-title">¿Qué puedo reportar?</h2>
          <ReportItem
            icon={Eye}
            name="Avistamientos"
            description="Individuos vivos, huellas, fecas e incidentes."
          />
        </section>
      </div>
    </div>
  );
};

export default Presentacion;
