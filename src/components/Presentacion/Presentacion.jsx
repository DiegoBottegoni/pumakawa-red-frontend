import { Camera, MapPin, AlertTriangle } from "lucide-react";
import "./presentacion.css";

/* ── Sub-components reutilizables ── */

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

/** Ítem de reporte con icono de color */
const ReportItem = ({ icon: Icon, name, description, variant }) => (
  <div className="presentacion-report-item">
    <div className={`presentacion-report-icon presentacion-report-icon--${variant}`}>
      <Icon />
    </div>
    <span className="presentacion-report-name">{name}</span>
    <span className="presentacion-report-desc">{description}</span>
  </div>
);

/* ── Componente principal ── */

const Presentacion = ({ onReportar, onVerMapa }) => {
  return (
    <div className="presentacion-root">
      <div className="presentacion-container">
        {/* ─── Header ─── */}
        <header className="presentacion-header pr-animate">
          <img
            src="/PNG/PUMARED (logo)-COLOR.png"
            alt="PUMARED Logo"
            className="presentacion-logo-img"
          />
        </header>

        {/* ─── Información ─── */}
        <section className="presentacion-info pr-animate pr-animate-delay-1">
          <h1 className="presentacion-info-title">¿Qué es PumaRed?</h1>
          <p className="presentacion-info-text">
            PumaRed es un proyecto de ciencia ciudadana que busca relevar,
            sistematizar y generar información sobre el conflicto
            humano-carnívoros silvestres a nivel nacional, con foco en el puma
            (Puma concolor).
          </p>
          <p className="presentacion-info-text">
            Tu participación es fundamental para construir una coexistencia armoniosa
            entre las especies silvestres y las actividades humanas en ambientes
            naturales, rurales y urbanos.
          </p>
        </section>

        {/* ─── Acciones ─── */}
        <div className="presentacion-actions">
          <div className="pr-animate pr-animate-delay-2">
            <ActionCard
              icon={Camera}
              title="Reportar avistamiento"
              subtitle="Registra encuentro con pumas, huellas o existencia de conflicto."
              variant="primary"
              onClick={onReportar}
            />
          </div>
          <div className="pr-animate pr-animate-delay-3">
            <ActionCard
              icon={MapPin}
              title="Ver mapa"
              subtitle="Avistamientos reportados en Córdoba."
              variant="secondary"
              onClick={onVerMapa}
            />
          </div>
        </div>

        {/* ─── Sección inferior ─── */}
        <section className="presentacion-bottom pr-animate pr-animate-delay-4">
          <h2 className="presentacion-bottom-title">¿Qué puedo reportar?</h2>
          <div className="presentacion-report-list">
            <ReportItem
              icon={Camera}
              name="Avistamientos"
              description="Individuos vivos, cachorros, huellas, fecas Incidentes."
              variant="orange"
            />
            <ReportItem
              icon={AlertTriangle}
              name="Incidentes"
              description="Atropellamientos, conflictos con ganado."
              variant="red"
            />
            <ReportItem
              icon={MapPin}
              name="Ubicación"
              description="Datos precisos de localización del evento."
              variant="blue"
            />
          </div>
          <footer className="presentacion-footer">
            Un proyecto de Pumakawa
          </footer>
        </section>
      </div>
    </div>
  );
};

export default Presentacion;
