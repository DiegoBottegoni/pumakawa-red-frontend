import { useState } from "react";
import { MapPin, Camera, Loader2, CheckCircle, ChevronLeft, Send } from "lucide-react";
import { motion } from "framer-motion";
import "./ReportForm.css";

const INCIDENT_TYPES = [
  "Avistamiento de puma vivo",
  "Puma atropellado",
  "Ataque a ganado",
  "Otro",
];

const ReportForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    incidentType: "",
    otherIncidentType: "",
    description: "",
    photo: null,
    location: null,
  });

  const [status, setStatus] = useState({
    loadingLocation: false,
    locationError: "",
    submitting: false,
    success: false,
    error: "",
  });

  const handleChange = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, photo: e.target.files[0] });
    }
  };

  const getLocation = () => {
    setStatus({ ...status, loadingLocation: true, locationError: "" });
    if (!navigator.geolocation) {
      setStatus({ ...status, loadingLocation: false, locationError: "La geolocalización no es soportada." });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setFormData({ ...formData, location: { lat: pos.coords.latitude, lng: pos.coords.longitude } });
        setStatus({ ...status, loadingLocation: false });
      },
      (err) => {
        const msg = err.code === err.PERMISSION_DENIED
          ? "Permiso denegado. Activa la ubicación."
          : "No se pudo obtener la ubicación.";
        setStatus({ ...status, loadingLocation: false, locationError: msg });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ ...status, submitting: true, error: "" });
    try {
      await new Promise((r) => setTimeout(r, 1500));
      setStatus({ ...status, submitting: false, success: true });
    } catch {
      setStatus({ ...status, submitting: false, error: "Error al enviar. Intenta de nuevo." });
    }
  };

  if (status.success) {
    return (
      <motion.div className="rf-success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
        <CheckCircle size={64} className="rf-success-icon" />
        <h2>¡Reporte enviado!</h2>
        <p>Gracias por ayudar a proteger el puma patagónico.</p>
        <button className="rf-btn-primary" onClick={() => setStatus({ ...status, success: false })}>
          Enviar otro reporte
        </button>
      </motion.div>
    );
  }

  return (
    <div className="rf-wrapper">
      {/* Header */}
      <div className="rf-header">
        <button className="rf-back-btn" aria-label="Volver">
          <ChevronLeft size={22} />
        </button>
        <div className="rf-header-logo">
          <Camera size={22} />
          <span>PUMARED</span>
        </div>
      </div>

      <motion.div className="rf-container" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="rf-title-block">
          <h1 className="rf-title">Reportar Avistamiento</h1>
          <p className="rf-subtitle">Comparte el formulario con los detalles del evento que presenciaste</p>
        </div>

        <form onSubmit={handleSubmit} className="rf-form">
          {/* Información Personal */}
          <section className="rf-section">
            <h2 className="rf-section-title">Información Personal</h2>

            <div className="rf-row">
              <div className="rf-field">
                <label className="rf-label">Nombre <span className="rf-required">*</span></label>
                <input className="rf-input" type="text" placeholder="Tu nombre" value={formData.firstName} onChange={handleChange("firstName")} required />
              </div>
              <div className="rf-field">
                <label className="rf-label">Apellido <span className="rf-required">*</span></label>
                <input className="rf-input" type="text" placeholder="Tu apellido" value={formData.lastName} onChange={handleChange("lastName")} required />
              </div>
            </div>

            <div className="rf-field">
              <label className="rf-label">Contacto (email o teléfono) <span className="rf-required">*</span></label>
              <input className="rf-input" type="text" placeholder="email@ejemplo.com o teléfono" value={formData.contact} onChange={handleChange("contact")} required />
            </div>
          </section>

          {/* Detalles del Evento */}
          <section className="rf-section">
            <h2 className="rf-section-title">Detalles del Evento</h2>

            <div className="rf-field">
              <label className="rf-label">Tipo de Evento <span className="rf-required">*</span></label>
              <select className="rf-input rf-select" value={formData.incidentType} onChange={handleChange("incidentType")} required>
                <option value="" disabled>Selecciona un tipo</option>
                {INCIDENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {formData.incidentType === "Otro" && (
              <div className="rf-field">
                <label className="rf-label">Especifica el tipo</label>
                <input className="rf-input" type="text" placeholder="Describe el tipo de evento" value={formData.otherIncidentType} onChange={handleChange("otherIncidentType")} />
              </div>
            )}

            <div className="rf-field">
              <label className="rf-label">Descripción del evento <span className="rf-required">*</span></label>
              <textarea className="rf-input rf-textarea" rows={4} placeholder="Describe lo que observaste con el mayor detalle posible..." value={formData.description} onChange={handleChange("description")} required />
            </div>
          </section>

          {/* Fotografía */}
          <section className="rf-section">
            <h2 className="rf-section-title">Fotografía</h2>
            <div className="rf-photo-area">
              {formData.photo ? (
                <div className="rf-photo-preview">
                  <img src={URL.createObjectURL(formData.photo)} alt="Vista previa" className="rf-photo-img" />
                  <button type="button" className="rf-photo-remove" onClick={() => setFormData({ ...formData, photo: null })}>✕ Cambiar foto</button>
                </div>
              ) : (
                <div className="rf-photo-placeholder">
                  <Camera size={40} className="rf-photo-icon" />
                </div>
              )}
            </div>
            <label htmlFor="photo-upload" className="rf-btn-secondary rf-upload-btn">
              <Camera size={16} />
              Cargar Foto
              <input id="photo-upload" type="file" accept="image/*" capture="environment" className="rf-hidden" onChange={handlePhotoChange} />
            </label>
          </section>

          {/* Ubicación */}
          <section className="rf-section">
            <h2 className="rf-section-title">Ubicación</h2>
            <div className="rf-field">
              <label className="rf-label">Ubicación o coordenadas <span className="rf-required">*</span></label>
              <input
                className="rf-input"
                type="text"
                placeholder="Ej: Centro a La Contina, km 48 o coordenadas"
                value={formData.location ? `Lat: ${formData.location.lat.toFixed(5)}, Lng: ${formData.location.lng.toFixed(5)}` : ""}
                onChange={() => {}}
                readOnly={!!formData.location}
              />
            </div>
            <button type="button" className="rf-btn-location" onClick={getLocation} disabled={status.loadingLocation}>
              {status.loadingLocation ? <Loader2 size={16} className="rf-spin" /> : <MapPin size={16} />}
              Usar Mi Ubicación Actual
            </button>
            {formData.location && (
              <span className="rf-location-ok"><CheckCircle size={14} /> Ubicación guardada</span>
            )}
            {status.locationError && <p className="rf-error-text">{status.locationError}</p>}
          </section>

          {status.error && <div className="rf-error-box">{status.error}</div>}

          <button type="submit" className="rf-btn-submit" disabled={status.submitting}>
            {status.submitting ? <><Loader2 size={18} className="rf-spin" /> Enviando...</> : <><Send size={18} /> Enviar Reporte</>}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ReportForm;
