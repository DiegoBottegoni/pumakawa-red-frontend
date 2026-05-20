import { useLocation, useNavigate } from "react-router";
import "../ReportFrom/ReportForm.css"; // Reuse the same CSS

/* ─── Icons (inline SVG, zero deps) ─────────────────────────── */
const IconArrowLeft = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const IconGlobe = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const IconCheckCircleBig = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const IconPuma = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const PROTOCOLOS = {
  avistamiento_vivo: {
    title: "Protocolo para Avistamiento de Puma Vivo",
    text: "Mantén la calma, no corras, hazte grande levantando los brazos y retrocede lentamente sin darle la espalda. No te acerques al puma y dale una vía de escape. Si hay niños presentes, álzalos sin agacharte.",
  },
  avistamiento_muerto: {
    title: "Protocolo para Avistamiento de Puma Muerto",
    text: "No toques al animal. Mantén distancia por riesgo de transmisión de enfermedades. Hemos registrado el evento para que las autoridades o investigadores se hagan cargo.",
  },
  mascotismo: {
    title: "Protocolo ante Mascotismo",
    text: "No intentes interactuar ni liberar al animal por tu cuenta. El mascotismo de fauna silvestre es peligroso y requiere intervención especializada. La información ha sido derivada a las autoridades competentes.",
  },
  atropellamiento: {
    title: "Protocolo ante Atropellamiento",
    text: "Si estás conduciendo, detente en un lugar seguro. No intentes mover al animal herido, puede reaccionar de forma agresiva por el dolor. Espera a que lleguen las autoridades o personal capacitado.",
  },
  herido: {
    title: "Protocolo para Puma Herido o Atrapado",
    text: "No te acerques ni intentes ayudarlo. Un puma herido o atrapado está asustado y puede atacar para defenderse. Mantén a otras personas y mascotas alejadas hasta que llegue la ayuda.",
  },
  caza: {
    title: "Protocolo ante Caza Furtiva",
    text: "No te expongas ni enfrentes a los cazadores. Mantente a salvo y no llames la atención. Tu reporte es fundamental y será enviado de manera confidencial a las autoridades de fauna y policía ambiental.",
  },
  invasion_granja: {
    title: "Protocolo ante Invasión de Granja / Conflicto con Ganado",
    text: `Si tienes un encuentro cercano o directo con el felino:
• Aparenta ser más grande: Levanta los brazos, abre tu campera o agita una prenda sobre tu cabeza.
• Haz ruido: Grita fuerte y mantén contacto visual directo con el animal.
• No lo acorrales: Deja siempre una vía de escape para que el animal pueda huir.
• Defiéndete si es necesario: Si el puma se acerca demasiado o ataca, usa cualquier objeto a tu alcance (palos, piedras) y pelea sin retroceder.

Si está atacando a tus animales:
• Usa pirotecnia: Si tienes petardos o fuegos artificiales, úsalos ya mismo.
• Bocinas de vehículos: Si tienes un auto o tractor cerca, toca la bocina sin parar y enciende las luces altas.
• Golpea objetos: Usa ollas, chapas de metal o herramientas para hacer el mayor ruido metálico posible.
• Grita con fuerza: Usa una voz gruesa, firme y potente.

Fuego y Luz:
• Luces potentes: Apúntale directamente a los ojos con linternas potentes o reflectores.
• Fuego: Si es seguro y factible, enciende una antorcha o fogata. El fuego espanta a la mayoría de los depredadores.`,
  },
  otra: {
    title: "Protocolo General de Seguridad",
    text: "Mantén una distancia segura y no intervengas de forma directa. La prioridad es tu seguridad. Evaluaremos tu reporte para derivarlo a quien corresponda.",
  }
};

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
