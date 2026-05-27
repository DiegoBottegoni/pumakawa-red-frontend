import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./ReportForm.css";

/* ─── Icons (inline SVG, zero deps) ─────────────────────────── */


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

const IconShield = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <circle cx="12" cy="15" r="0.5" fill="currentColor" />
  </svg>
);

const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
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
  { value: "invasion_granja", label: "Invasión de granja" },
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
    photos: [],
    photoPreviewUrls: [],
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

  const handlePhoneChange = (e) => {
    const cleanVal = e.target.value.replace(/\D/g, "");
    setFormData((prev) => ({ ...prev, telefono: cleanVal }));
  };

  const isEmailValid = (email) => {
    if (!email) return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setFormData((prev) => {
      const currentPhotos = prev.photos || [];
      const currentUrls = prev.photoPreviewUrls || [];

      const remaining = 3 - currentPhotos.length;
      if (remaining <= 0) return prev;

      const filesToAdd = files.slice(0, remaining);
      const newPhotos = [...currentPhotos, ...filesToAdd];
      const newUrls = [...currentUrls, ...filesToAdd.map((f) => URL.createObjectURL(f))];

      return { ...prev, photos: newPhotos, photoPreviewUrls: newUrls };
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removePhoto = (index) => {
    setFormData((prev) => {
      const currentPhotos = prev.photos || [];
      const currentUrls = prev.photoPreviewUrls || [];

      if (currentUrls[index]) {
        URL.revokeObjectURL(currentUrls[index]);
      }

      const newPhotos = currentPhotos.filter((_, i) => i !== index);
      const newUrls = currentUrls.filter((_, i) => i !== index);

      return { ...prev, photos: newPhotos, photoPreviewUrls: newUrls };
    });
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
    if ((!formData.photos || formData.photos.length === 0) && !formData.locationCoords && !formData.locationText.trim()) {
      setStatus((s) => ({
        ...s,
        error: "Por favor, añade al menos una foto o tu ubicación.",
      }));
      return;
    }
    if (!formData.telefono.trim()) {
      setStatus((s) => ({ ...s, error: "Por favor, ingresa tu número de teléfono de contacto." }));
      return;
    }
    if (formData.email.trim() && !isEmailValid(formData.email)) {
      setStatus((s) => ({ ...s, error: "Por favor, ingresa un correo electrónico válido." }));
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

          {/* ── Safety Warning ── */}
          <div className="rf-safety-warning" role="alert">
            <div className="rf-safety-icon">
              <IconShield />
            </div>
            <div className="rf-safety-content">
              <p className="rf-safety-title">⚠️ Tu seguridad es lo primero</p>
              <p className="rf-safety-text">
                Mantén siempre una <strong>distancia segura</strong> del animal.
                Ninguna foto ni reporte vale tu vida.
                No te expongas a situaciones de riesgo para obtener información.
              </p>
            </div>
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
                  placeholder="Ej: 3511234567"
                  value={formData.telefono}
                  onChange={handlePhoneChange}
                  autoComplete="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              </div>

              <div className="rf-field">
                <label className="rf-label" htmlFor="rf-email">
                  Email <span style={{ fontWeight: 400, color: "#9ca3af", fontSize: "0.78rem" }}>(Opcional)</span>
                </label>
                <input
                  id="rf-email"
                  type="email"
                  className={`rf-input ${formData.email && !isEmailValid(formData.email) ? "rf-input--invalid" : ""}`}
                  placeholder="Ej: contacto@ejemplo.com"
                  value={formData.email}
                  onChange={set("email")}
                  autoComplete="email"
                  inputMode="email"
                />
                {formData.email && !isEmailValid(formData.email) && (
                  <span className="rf-field-error">Por favor, ingresa un correo electrónico válido</span>
                )}
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
                  Descripción del evento <span style={{ fontWeight: 400, color: "#9ca3af", fontSize: "0.78rem" }}>(Opcional)</span>
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
              <h2 className="rf-section-title">
                Fotografías {formData.photos.length > 0 ? `(${formData.photos.length}/3)` : ""}
              </h2>

              {formData.photos.length > 0 ? (
                <div className="rf-photos-grid">
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="rf-photo-card">
                      <img
                        src={formData.photoPreviewUrls[index]}
                        alt={`Vista previa ${index + 1}`}
                        className="rf-photo-img-grid"
                      />
                      <button
                        type="button"
                        className="rf-photo-delete-badge"
                        onClick={() => removePhoto(index)}
                        aria-label="Eliminar foto"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  
                  {formData.photos.length < 3 && (
                    <div
                      className="rf-photo-add-card"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <IconCameraSmall />
                      <span>Agregar</span>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  className="rf-photo-area"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="rf-photo-placeholder">
                    <IconCamera />
                    <p style={{ fontSize: "0.85rem", marginTop: "4px", color: "#6b7280" }}>
                      Tocar para abrir galería (Máx. 3)
                    </p>
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                id="rf-file-upload"
                type="file"
                accept="image/*"
                className="rf-hidden"
                onChange={handlePhotoChange}
                multiple={true}
              />

              {formData.photos.length < 3 && (
                <button
                  type="button"
                  className="rf-btn-upload"
                  onClick={() => fileInputRef.current?.click()}
                  style={{ marginTop: formData.photos.length > 0 ? "12px" : "0" }}
                >
                  <IconCameraSmall />
                  {formData.photos.length > 0 ? "Agregar Foto" : "Cargar Foto"}
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