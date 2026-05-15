import { useState } from "react";
import { MapPin, Camera, Send, Loader2, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const ReportForm = () => {
  const [formData, setFormData] = useState({
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

    setStatus({ ...status, submitting: true, error: "" });

    setTimeout(() => {
      setStatus({ ...status, submitting: false, success: true });
      setFormData({ incidentType: "", otherIncidentType: "", description: "", photo: null, location: null });

      setTimeout(() => {
        setStatus((s) => ({ ...s, success: false }));
      }, 5000);
    }, 2000);
  };

  return (
    <section id="reportar" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="p-8 md:p-12">

            {/* Header */}
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Reportar Avistamiento
              </h2>
              <p className="text-gray-500 text-base">
                Completa la siguiente información. Tu reporte es anónimo y seguro.
              </p>
            </div>

            {/* Success */}
            {status.success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center"
              >
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-800 mb-2">¡Reporte Enviado!</h3>
                <p className="text-green-700">
                  Gracias por tu valioso aporte. El equipo de Pumakawa ha sido notificado.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">

                {/* Incident type */}
                <div className="space-y-2">
                  <label htmlFor="incidentType" className="block text-sm font-semibold text-gray-700">
                    ¿Qué está pasando con el puma? <span className="text-orange-500">*</span>
                  </label>
                  <select
                    id="incidentType"
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 cursor-pointer"
                    value={formData.incidentType}
                    onChange={(e) => setFormData({ ...formData, incidentType: e.target.value })}
                  >
                    <option value="" disabled>Selecciona una opción...</option>
                    <option value="avistamiento">Avistamiento (Solo lo vi pasar)</option>
                    <option value="mascotismo">Mascotismo (Lo tienen de mascota)</option>
                    <option value="atropellamiento">Atropellamiento</option>
                    <option value="herido">Puma herido o atrapado</option>
                    <option value="caza">Caza furtiva</option>
                    <option value="otra">Otra situación</option>
                  </select>
                </div>

                {/* Conditional other */}
                {formData.incidentType === "otra" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-2"
                  >
                    <label htmlFor="otherIncidentType" className="block text-sm font-semibold text-gray-700">
                      Especifica la situación <span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="otherIncidentType"
                      className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                      placeholder="Ej: Puma en zona urbana..."
                      value={formData.otherIncidentType}
                      onChange={(e) => setFormData({ ...formData, otherIncidentType: e.target.value })}
                    />
                  </motion.div>
                )}

                {/* Photo upload */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Foto del Avistamiento
                  </label>
                  <div className="mt-1 flex justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 pt-6 pb-7 transition hover:border-orange-400">
                    <div className="space-y-2 text-center">
                      {formData.photo ? (
                        <div className="flex flex-col items-center gap-2">
                          <CheckCircle className="h-12 w-12 text-orange-500" />
                          <p className="text-sm text-gray-600">{formData.photo.name}</p>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, photo: null })}
                            className="text-sm text-red-500 hover:text-red-700 transition"
                          >
                            Cambiar foto
                          </button>
                        </div>
                      ) : (
                        <>
                          <Camera className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex justify-center text-sm text-gray-600 gap-1">
                            <label
                              htmlFor="file-upload"
                              className="cursor-pointer rounded-md bg-white font-semibold text-orange-600 hover:text-orange-700 focus-within:outline-none transition"
                            >
                              <span>Sube una foto</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                accept="image/*"
                                capture="environment"
                                className="sr-only"
                                onChange={handlePhotoChange}
                              />
                            </label>
                            <p>o toma una con la cámara</p>
                          </div>
                          <p className="text-xs text-gray-400">PNG, JPG, GIF hasta 10MB</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Ubicación</label>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <button
                      type="button"
                      onClick={getLocation}
                      disabled={status.loadingLocation}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:opacity-50 w-full sm:w-auto"
                    >
                      {status.loadingLocation
                        ? <Loader2 className="h-5 w-5 animate-spin" />
                        : <MapPin className="h-5 w-5" />}
                      Obtener mi ubicación
                    </button>

                    {formData.location && (
                      <span className="inline-flex items-center gap-1 rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-700">
                        <CheckCircle className="h-4 w-4" /> Ubicación guardada
                      </span>
                    )}
                  </div>
                  {status.locationError && (
                    <p className="mt-1 rounded-md border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600">
                      {status.locationError}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
                    Descripción (Opcional)
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    className="w-full resize-y rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                    placeholder="Ej: Vi un puma cruzando la ruta cerca de..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                {/* Error */}
                {status.error && (
                  <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4">
                    <p className="text-sm text-red-700">{status.error}</p>
                  </div>
                )}

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status.submitting}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-4 px-6 text-lg font-bold text-white shadow-lg transition hover:bg-orange-600 active:scale-[0.98] disabled:opacity-50"
                  >
                    {status.submitting ? (
                      <>
                        <Loader2 className="h-6 w-6 animate-spin" /> Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="h-6 w-6" /> Enviar Reporte
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportForm;