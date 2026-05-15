import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import "./ReportForm.css";

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

const IconCamera = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const IconCameraSmall = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const IconMapPin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconLoader = () => (
  <svg className="rf-spin" width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
  </svg>
);

const IconSend = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconCheckCircleBig = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

/* Puma icon for avatar */
const IconPuma = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

/* ─── Tipos de evento ────────────────────────────────────────── */
const TIPOS_EVENTO = [
  { value: "", label: "Selecciona una opción...", disabled: true },
  { value: "avistamiento_vivo", label: "Avistamiento de puma vivo" },
  { value: "avistamiento_muerto", label: "Avistamiento de puma muerto" },
  { value: "mascotismo", label: "Mascotismo (Lo tienen de mascota)" },
  { value: "atropellamiento", label: "Atropellamiento" },
  { value: "herido", label: "Puma herido o atrapado" },
  { value: "caza", label: "Caza furtiva" },
  { value: "otra", label: "Otra situación" },
];

/* ─── Component ─────────────────────────────────────────────── */
const ReportForm = () => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    tipoEvento: "",
    otroTipo: "",
    descripcion: "",
    photo: null,
    photoPreviewUrl: null,
    locationText: "",
    locationCoords: null,
  });

  const [status, setStatus] = useState({
    loadingLocation: false,
    locationError: "",
    submitting: false,
    success: false,
    error: "",
  });

  /* ── Helpers ── */
  const set = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, photo: file, photoPreviewUrl: url }));
  };

  const removePhoto = () => {
    if (formData.photoPreviewUrl) URL.revokeObjectURL(formData.photoPreviewUrl);
    setFormData((prev) => ({ ...prev, photo: null, photoPreviewUrl: null }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const getLocation = () => {
    setStatus((s) => ({ ...s, loadingLocation: true, locationError: "" }));
    if (!navigator.geolocation) {
      setStatus((s) => ({
        ...s,
        loadingLocation: false,
        locationError: "La geolocalización no es soportada por tu navegador.",
      }));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        const text = `${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`;
        setFormData((prev) => ({
          ...prev,
          locationCoords: coords,
          locationText: text,
        }));
        setStatus((s) => ({ ...s, loadingLocation: false, locationError: "" }));
      },
      (err) => {
        let msg = "Error al obtener ubicación. ";
        if (err.code === err.PERMISSION_DENIED)
          msg += "Por favor, permite el acceso a tu ubicación.";
        setStatus((s) => ({ ...s, loadingLocation: false, locationError: msg }));
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.tipoEvento) {
      setStatus((s) => ({ ...s, error: "Por favor, selecciona el tipo de evento." }));
      return;
    }
    if (formData.tipoEvento === "otra" && !formData.otroTipo.trim()) {
      setStatus((s) => ({ ...s, error: "Por favor, especifica la situación." }));
      return;
    }
    if (!formData.photo && !formData.locationCoords && !formData.locationText.trim()) {
      setStatus((s) => ({
        ...s,
        error: "Por favor, añade al menos una foto o tu ubicación.",
      }));
      return;
    }

    setStatus((s) => ({ ...s, submitting: true, error: "" }));

    // Simulate API call
    setTimeout(() => {
      setStatus((s) => ({ ...s, submitting: false }));
      navigate("/protocolos", { state: { tipoEvento: formData.tipoEvento } });
    }, 2000);
  };

  /* ── Main render ── */
  return (
    <div className="rf-page">


      {/* ── Scrollable body ── */}
      <div className="rf-body">
        <div className="rf-container">

          {/* Title */}
          <div className="rf-title-block">
            <h1 className="rf-title">Reportar Avistamiento</h1>
            <p className="rf-subtitle">
              Completa el formulario con los detalles del evento que presenciaste
            </p>
          </div>

          <form className="rf-form" onSubmit={handleSubmit} noValidate>

            {/* ── Información Personal ── */}
            <section className="rf-section">
              <h2 className="rf-section-title">Información Personal</h2>

              <div className="rf-row">
                <div className="rf-field">
                  <label className="rf-label" htmlFor="rf-nombre">
                    Nombre <span className="rf-required">*</span>
                  </label>
                  <input
                    id="rf-nombre"
                    type="text"
                    className="rf-input"
                    placeholder="Tu nombre"
                    value={formData.nombre}
                    onChange={set("nombre")}
                    autoComplete="given-name"
                  />
                </div>

                <div className="rf-field">
                  <label className="rf-label" htmlFor="rf-apellido">
                    Apellido <span className="rf-required">*</span>
                  </label>
                  <input
                    id="rf-apellido"
                    type="text"
                    className="rf-input"
                    placeholder="Tu apellido"
                    value={formData.apellido}
                    onChange={set("apellido")}
                    autoComplete="family-name"
                  />
                </div>
              </div>

              <div className="rf-field">
                <label className="rf-label" htmlFor="rf-telefono">
                  Teléfono <span className="rf-required">*</span>
                </label>
                <input
                  id="rf-telefono"
                  type="tel"
                  className="rf-input"
                  placeholder="Ej: +54 9 11 1234-5678"
                  value={formData.telefono}
                  onChange={set("telefono")}
                  autoComplete="tel"
                  inputMode="tel"
                />
              </div>

              <div className="rf-field">
                <label className="rf-label" htmlFor="rf-email">
                  Email <span style={{ fontWeight: 400, color: "#9ca3af", fontSize: "0.78rem" }}>(Opcional)</span>
                </label>
                <input
                  id="rf-email"
                  type="email"
                  className="rf-input"
                  placeholder="Ej: contacto@ejemplo.com"
                  value={formData.email}
                  onChange={set("email")}
                  autoComplete="email"
                  inputMode="email"
                />
              </div>
            </section>

            {/* ── Detalles del Evento ── */}
            <section className="rf-section">
              <h2 className="rf-section-title">Detalles del Evento</h2>

              <div className="rf-field">
                <label className="rf-label" htmlFor="rf-tipo-evento">
                  Tipo de Evento <span className="rf-required">*</span>
                </label>
                <select
                  id="rf-tipo-evento"
                  className="rf-input rf-select"
                  value={formData.tipoEvento}
                  onChange={set("tipoEvento")}
                >
                  {TIPOS_EVENTO.map((t) => (
                    <option key={t.value} value={t.value} disabled={t.disabled}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              {formData.tipoEvento === "otra" && (
                <div className="rf-field rf-slide-in">
                  <label className="rf-label" htmlFor="rf-otro-tipo">
                    Especifica la situación <span className="rf-required">*</span>
                  </label>
                  <input
                    id="rf-otro-tipo"
                    type="text"
                    className="rf-input"
                    placeholder="Ej: Puma en zona urbana..."
                    value={formData.otroTipo}
                    onChange={set("otroTipo")}
                  />
                </div>
              )}

              <div className="rf-field">
                <label className="rf-label" htmlFor="rf-descripcion">
                  Descripción del evento <span className="rf-required">*</span>
                </label>
                <textarea
                  id="rf-descripcion"
                  className="rf-input rf-textarea"
                  placeholder="Describe lo que observaste con el mayor detalle posible..."
                  value={formData.descripcion}
                  onChange={set("descripcion")}
                />
              </div>
            </section>

            {/* ── Fotografía ── */}
            <section className="rf-section">
              <h2 className="rf-section-title">Fotografía</h2>

              <div
                className="rf-photo-area"
                onClick={() => !formData.photo && fileInputRef.current?.click()}
              >
                {formData.photo ? (
                  <div className="rf-photo-preview">
                    <img
                      src={formData.photoPreviewUrl}
                      alt="Vista previa"
                      className="rf-photo-img"
                    />
                    <p className="rf-photo-name">{formData.photo.name}</p>
                    <button
                      type="button"
                      className="rf-photo-remove"
                      onClick={(e) => { e.stopPropagation(); removePhoto(); }}
                    >
                      Eliminar foto
                    </button>
                  </div>
                ) : (
                  <div className="rf-photo-placeholder">
                    <IconCamera />
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                id="rf-file-upload"
                type="file"
                accept="image/*"
                capture="environment"
                className="rf-hidden"
                onChange={handlePhotoChange}
              />

              {!formData.photo && (
                <button
                  type="button"
                  className="rf-btn-upload"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <IconCameraSmall />
                  Cargar Foto
                </button>
              )}
            </section>

            {/* ── Ubicación ── */}
            <section className="rf-section">
              <h2 className="rf-section-title">Ubicación</h2>

              <div className="rf-field">
                <label className="rf-label" htmlFor="rf-ubicacion">
                  Ubicación o coordenadas <span className="rf-required">*</span>
                </label>
                <input
                  id="rf-ubicacion"
                  type="text"
                  className="rf-input"
                  placeholder="Ej: Camino a La Cumbre, km 45 o coordenadas"
                  value={formData.locationText}
                  onChange={set("locationText")}
                />
              </div>

              {formData.locationCoords ? (
                <div className="rf-location-ok">
                  <IconCheck />
                  Ubicación GPS guardada
                </div>
              ) : (
                <button
                  type="button"
                  className="rf-btn-location"
                  onClick={getLocation}
                  disabled={status.loadingLocation}
                >
                  {status.loadingLocation ? (
                    <IconLoader />
                  ) : (
                    <IconMapPin />
                  )}
                  Usar Mi Ubicación Actual
                </button>
              )}

              {status.locationError && (
                <p className="rf-error-text">{status.locationError}</p>
              )}
            </section>

            {/* ── Error global ── */}
            {status.error && (
              <div className="rf-error-box" role="alert">
                {status.error}
              </div>
            )}

            {/* ── Submit ── */}
            <button
              type="submit"
              className="rf-btn-submit"
              disabled={status.submitting}
            >
              {status.submitting ? (
                <>
                  <IconLoader />
                  Enviando...
                </>
              ) : (
                <>
                  <IconSend />
                  Enviar Reporte
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportForm;