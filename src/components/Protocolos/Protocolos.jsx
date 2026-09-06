import { useLocation, useNavigate } from "react-router-dom";
import { PROTOCOLOS } from "../../data/protocolos";
import "../ReportFrom/ReportForm.css"; // Reuse the same CSS

const IconCheckCircleBig = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const Protocolos = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tipoEvento = location.state?.tipoEvento || "otra";

  const protocolo = PROTOCOLOS[tipoEvento] || PROTOCOLOS.otra;

  return (
    <div className="rf-page">

      <div className="rf-body">
        <div className="rf-container" style={{ padding: "24px 16px" }}>

          {/* Success Banner */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "24px 20px",
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            marginBottom: "24px"
          }}>
            <div style={{ color: "#E84E1B", marginBottom: "12px" }}>
              <IconCheckCircleBig />
            </div>
            <h2 style={{ fontSize: "1.35rem", fontWeight: "700", color: "#111827", marginBottom: "8px" }}>¡Reporte Enviado!</h2>
            <p style={{ color: "#6b7280", fontSize: "0.95rem", lineHeight: "1.5" }}>
              Tu reporte ha sido registrado exitosamente. El equipo de Pumakawa ha sido notificado.
            </p>
          </div>

          {/* Protocol Card */}
          <section className="rf-section" style={{ border: "2px solid #E84E1B", padding: "20px 16px", boxShadow: "0 4px 16px rgba(232, 78, 27, 0.1)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <span style={{ fontSize: "1.5rem" }}>⚠️</span>
              <h2 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#111827", margin: 0, lineHeight: "1.3" }}>
                {protocolo.title}
              </h2>
            </div>

            <div style={{ backgroundColor: "#fff5f2", padding: "16px", borderRadius: "12px", border: "1px solid #ffded4" }}>
              <p style={{ fontSize: "0.95rem", lineHeight: "1.6", color: "#374151", margin: 0, fontWeight: "500", whiteSpace: "pre-line" }}>
                {protocolo.text}
              </p>
            </div>
          </section>

          <button
            type="button"
            className="rf-btn-submit"
            onClick={() => navigate("/")}
            style={{ marginTop: "32px" }}
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default Protocolos;
