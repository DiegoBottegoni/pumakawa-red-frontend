import { useState } from "react";
import "./ReportForm.css";
import { MapPin, Camera, Send, Loader2, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const ReportForm = () => {
  const [formData, setFormData] = useState({
    incidentType: "",
    otherIncidentType: "",
    description: "",
    photo: null,
    location: null,
    phone: "",
    email: "",
  });

  const [status, setStatus] = useState({
    loadingLocation: false,
    locationError: "",
    submitting: false,
    success: false,
    error: "",
  });

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, photo: e.target.files[0] });
    }
  };

  const getLocation = () => {
    setStatus({ ...status, loadingLocation: true, locationError: "" });

    if (!navigator.geolocation) {
      setStatus({
        ...status,
        loadingLocation: false,
        locationError: "La geolocalización no es soportada por tu navegador.",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData({
          ...formData,
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
        setStatus({ ...status, loadingLocation: false, locationError: "" });
      },
      (error) => {
        let errorMsg = "Error al obtener ubicación. ";
        if (error.code === error.PERMISSION_DENIED) {
          errorMsg += "Por favor, permite el acceso a tu ubicación.";
        }
        setStatus({ ...status, loadingLocation: false, locationError: errorMsg });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.incidentType) {
      setStatus({ ...status, error: "Por favor, selecciona qué está pasando con el puma." });
      return;
    }
    if (formData.incidentType === "otra" && !formData.otherIncidentType) {
      setStatus({ ...status, error: "Por favor, especifica la situación." });
      return;
    }
    if (!formData.photo && !formData.location) {
      setStatus({
        ...status,
        error: "Por favor, añade al menos una foto o tu ubicación para poder ayudar.",
      });
      return;
    }
    if (!formData.phone.trim()) {
      setStatus({ ...status, error: "Por favor, ingresa tu número de teléfono de contacto." });
      return;
    }

    setStatus({ ...status, submitting: true, error: "" });

    setTimeout(() => {
      setStatus({ ...status, submitting: false, success: true });
      setFormData({ incidentType: "", otherIncidentType: "", description: "", photo: null, location: null, phone: "", email: "" });

      setTimeout(() => {
        setStatus((s) => ({ ...s, success: false }));
      }, 5000);
    }, 2000);
  };

  /* ---------- Success screen ---------- */
  if (status.success) {
    return (
      <motion.div
        className="rf-success"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <CheckCircle className="rf-success-icon" size={64} />
        <h2>¡Reporte Enviado!</h2>
        <p>Gracias por tu valioso aporte. El equipo de Pumakawa ha sido notificado.</p>
      </motion.div>
    );
  }

  /* ---------- Main form ---------- */
  return (
    <section id="reportar" className="rf-wrapper">
      <div className="rf-container">

        {/* Title */}
        <div className="rf-title-block">
          <h2 className="rf-title">Reportar Avistamiento</h2>
          <p className="rf-subtitle">
            Completá la siguiente información. Tu reporte es anónimo y seguro.
          </p>
        </div>

        <form className="rf-form" onSubmit={handleSubmit}>

          {/* Incident type */}
          <div className="rf-section">
            <p className="rf-section-title">¿Qué está pasando con el puma?</p>
            <div className="rf-field">
              <label htmlFor="incidentType" className="rf-label">
                Situación <span className="rf-required">*</span>
              </label>
              <select
                id="incidentType"
                className="rf-input rf-select"
                value={formData.incidentType}
                onChange={(e) => setFormData({ ...formData, incidentType: e.target.value })}
              >
                <option value="" disabled>Seleccioná una opción...</option>
                <option value="avistamiento">Avistamiento (Solo lo vi pasar)</option>
                <option value="mascotismo">Mascotismo (Lo tienen de mascota)</option>
                <option value="atropellamiento">Atropellamiento</option>
                <option value="herido">Puma herido o atrapado</option>
                <option value="caza">Caza furtiva</option>
                <option value="otra">Otra situación</option>
              </select>
            </div>

            {/* Conditional: other */}
            {formData.incidentType === "otra" && (
              <motion.div
                className="rf-field"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
              >
                <label htmlFor="otherIncidentType" className="rf-label">
                  Especificá la situación <span className="rf-required">*</span>
                </label>
                <input
                  type="text"
                  id="otherIncidentType"
                  className="rf-input"
                  placeholder="Ej: Puma en zona urbana..."
                  value={formData.otherIncidentType}
                  onChange={(e) => setFormData({ ...formData, otherIncidentType: e.target.value })}
                />
              </motion.div>
            )}
          </div>

          {/* Photo */}
          <div className="rf-section">
            <p className="rf-section-title">Foto del avistamiento</p>
            <div className="rf-photo-area">
              {formData.photo ? (
                <div className="rf-photo-preview">
                  <img
                    className="rf-photo-img"
                    src={URL.createObjectURL(formData.photo)}
                    alt="Vista previa"
                  />
                  <p style={{ fontSize: "0.85rem", color: "#6b7280" }}>{formData.photo.name}</p>
                  <button
                    type="button"
                    className="rf-photo-remove"
                    onClick={() => setFormData({ ...formData, photo: null })}
                  >
                    Cambiar foto
                  </button>
                </div>
              ) : (
                <div className="rf-photo-placeholder">
                  <Camera className="rf-photo-icon" size={40} />
                  <label htmlFor="file-upload" className="rf-btn-secondary rf-upload-btn">
                    <Camera size={16} /> Subir foto
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      accept="image/*"
                      capture="environment"
                      className="rf-hidden"
                      onChange={handlePhotoChange}
                    />
                  </label>
                  <p style={{ fontSize: "0.78rem", color: "#9ca3af" }}>PNG, JPG, GIF hasta 10 MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="rf-section">
            <p className="rf-section-title">Ubicación</p>
            <button
              type="button"
              className="rf-btn-location"
              onClick={getLocation}
              disabled={status.loadingLocation}
            >
              {status.loadingLocation
                ? <Loader2 className="rf-spin" size={18} />
                : <MapPin size={18} />}
              Obtener mi ubicación
            </button>

            {formData.location && (
              <span className="rf-location-ok">
                <CheckCircle size={14} /> Ubicación guardada
              </span>
            )}

            {status.locationError && (
              <p className="rf-error-text">{status.locationError}</p>
            )}
          </div>

          {/* Description */}
          <div className="rf-section">
            <p className="rf-section-title">Descripción (opcional)</p>
            <div className="rf-field">
              <label htmlFor="description" className="rf-label">Contanos más detalles</label>
              <textarea
                id="description"
                className="rf-input rf-textarea"
                placeholder="Ej: Vi un puma cruzando la ruta cerca de..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          {/* Contact */}
          <div className="rf-section">
            <p className="rf-section-title">Contacto</p>

            {/* Phone — required */}
            <div className="rf-field">
              <label htmlFor="phone" className="rf-label">
                Teléfono <span className="rf-required">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                className="rf-input"
                placeholder="Ej: +54 9 11 1234-5678"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            {/* Email — optional */}
            <div className="rf-field">
              <label htmlFor="email" className="rf-label">
                Email <span style={{ fontWeight: 400, color: "#9ca3af", fontSize: "0.78rem" }}>(Opcional)</span>
              </label>
              <input
                type="email"
                id="email"
                className="rf-input"
                placeholder="Ej: contacto@ejemplo.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          {/* Global error */}
          {status.error && (
            <div className="rf-error-box">{status.error}</div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="rf-btn-submit"
            disabled={status.submitting}
          >
            {status.submitting ? (
              <><Loader2 className="rf-spin" size={20} /> Enviando...</>
            ) : (
              <><Send size={20} /> Enviar Reporte</>
            )}
          </button>

        </form>
      </div>
    </section>
  );
};

export default ReportForm;