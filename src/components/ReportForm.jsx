import { useState } from "react";
import { MapPin, Camera, Image as ImageIcon, Send, Loader2, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ReportForm = () => {
    const [formData, setFormData] = useState({
        incidentType: '',
        otherIncidentType: '',
        description: '',
        photo: null,
        location: null,
    });

    const [status, setStatus] = useState({
        loadingLocation: false,
        locationError: '',
        submitting: false,
        success: false,
        error: ''
    });

    const handlePhotoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({ ...formData, photo: e.target.files[0] });
        }
    };

    const getLocation = () => {
        setStatus({ ...status, loadingLocation: true, locationError: '' });

        if (!navigator.geolocation) {
            setStatus({ ...status, loadingLocation: false, locationError: 'La geolocalización no es soportada por tu navegador.' });
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setFormData({
                    ...formData,
                    location: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                });
                setStatus({ ...status, loadingLocation: false, locationError: '' });
            },
            (error) => {
                let errorMsg = 'Error al obtener ubicación. ';
                if (error.code === error.PERMISSION_DENIED) {
                    errorMsg += 'Por favor, permite el acceso a tu ubicación.';
                }
                setStatus({ ...status, loadingLocation: false, locationError: errorMsg });
            }
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.incidentType) {
            setStatus({ ...status, error: 'Por favor, selecciona qué está pasando con el puma.' });
            return;
        }
        if (formData.incidentType === 'otra' && !formData.otherIncidentType) {
            setStatus({ ...status, error: 'Por favor, especifica la situación.' });
            return;
        }
        if (!formData.photo && !formData.location) {
            setStatus({ ...status, error: 'Por favor, añade al menos una foto o tu ubicación para poder ayudar.' });
            return;
        }

        setStatus({ ...status, submitting: true, error: '' });

        // Simulate API call
        setTimeout(() => {
            setStatus({ ...status, submitting: false, success: true });
            setFormData({ incidentType: '', otherIncidentType: '', description: '', photo: null, location: null });

            // Reset success message after 5 seconds
            setTimeout(() => {
                setStatus(s => ({ ...s, success: false }));
            }, 5000);
        }, 2000);
    };

    return (
        <section id="reportar" className="py-20 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="p-8 md:p-12">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">Reportar Avistamiento</h2>
                            <p className="text-gray-600">Completa la siguiente información. Tu reporte es anónimo y seguro.</p>
                        </div>

                        {status.success ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-green-50 border border-green-200 rounded-xl p-8 text-center"
                            >
                                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-green-800 mb-2">¡Reporte Enviado!</h3>
                                <p className="text-green-700">Gracias por tu valioso aporte. El equipo de Pumakawa ha sido notificado.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Incident Type */}
                                <div className="space-y-3">
                                    <label htmlFor="incidentType" className="block text-lg font-medium text-gray-700">¿Qué está pasando con el puma?</label>
                                    <select
                                        id="incidentType"
                                        className="shadow-sm focus:ring-primary-light focus:border-primary-light block w-full sm:text-lg border-gray-300 rounded-xl p-4 border outline-none bg-white cursor-pointer"
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

                                {/* Conditional Other Input */}
                                {formData.incidentType === 'otra' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="space-y-3"
                                    >
                                        <label htmlFor="otherIncidentType" className="block text-lg font-medium text-gray-700">Especifica la situación</label>
                                        <input
                                            type="text"
                                            id="otherIncidentType"
                                            className="shadow-sm focus:ring-primary-light focus:border-primary-light block w-full sm:text-lg border-gray-300 rounded-xl p-4 border outline-none"
                                            placeholder="Ej: Puma en zona urbana..."
                                            value={formData.otherIncidentType}
                                            onChange={(e) => setFormData({ ...formData, otherIncidentType: e.target.value })}
                                        />
                                    </motion.div>
                                )}

                                {/* Photo Upload */}
                                <div className="space-y-3">
                                    <label className="block text-lg font-medium text-gray-700">Foto del Avistamiento</label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-primary-light transition-colors bg-gray-50">
                                        <div className="space-y-2 text-center">
                                            {formData.photo ? (
                                                <div className="flex flex-col items-center">
                                                    <CheckCircle className="mx-auto h-12 w-12 text-primary-light" />
                                                    <p className="mt-2 text-sm text-gray-600">{formData.photo.name}</p>
                                                    <button type="button" onClick={() => setFormData({ ...formData, photo: null })} className="mt-2 text-sm text-red-500 hover:text-red-700">Cambiar foto</button>
                                                </div>
                                            ) : (
                                                <>
                                                    <Camera className="mx-auto h-12 w-12 text-gray-400" />
                                                    <div className="flex text-sm text-gray-600 justify-center">
                                                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary-light hover:text-primary-dark focus-within:outline-none">
                                                            <span>Sube una foto</span>
                                                            <input id="file-upload" name="file-upload" type="file" accept="image/*" capture="environment" className="sr-only" onChange={handlePhotoChange} />
                                                        </label>
                                                        <p className="pl-1">o toma una con la cámara</p>
                                                    </div>
                                                    <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="space-y-3">
                                    <label className="block text-lg font-medium text-gray-700">Ubicación</label>
                                    <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                                        <button
                                            type="button"
                                            onClick={getLocation}
                                            disabled={status.loadingLocation}
                                            className="inline-flex items-center justify-center px-4 py-3 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-primary-dark hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark disabled:opacity-50 transition-colors w-full sm:w-auto"
                                        >
                                            {status.loadingLocation ? <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" /> : <MapPin className="-ml-1 mr-2 h-5 w-5" />}
                                            Obtener mi ubicación
                                        </button>
                                        {formData.location && (
                                            <span className="text-sm text-green-600 font-medium flex items-center bg-green-50 px-3 py-2 rounded-lg">
                                                <CheckCircle className="h-4 w-4 mr-1" /> Ubicación guardada
                                            </span>
                                        )}
                                    </div>
                                    {status.locationError && <p className="text-sm text-red-600 bg-red-50 p-2 rounded-md border border-red-100">{status.locationError}</p>}
                                </div>

                                {/* Description */}
                                <div className="space-y-3">
                                    <label htmlFor="description" className="block text-lg font-medium text-gray-700">Descripción (Opcional)</label>
                                    <textarea
                                        id="description"
                                        rows={4}
                                        className="shadow-sm focus:ring-primary-light focus:border-primary-light block w-full sm:text-sm border-gray-300 rounded-xl p-3 border outline-none"
                                        placeholder="Ej: Vi un puma cruzando la ruta cerca de..."
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>

                                {/* Error message */}
                                {status.error && (
                                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                                        <p className="text-red-700">{status.error}</p>
                                    </div>
                                )}

                                {/* Submit */}
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={status.submitting}
                                        className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-accent hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-50 transition-all duration-300"
                                    >
                                        {status.submitting ? (
                                            <>
                                                <Loader2 className="animate-spin -ml-1 mr-2 h-6 w-6" /> Enviando...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="-ml-1 mr-2 h-6 w-6" /> Enviar Reporte
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