export const TIPOS_EVENTO = [
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

export const PROTOCOLOS = {
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
• Luces potentes: Apúntale directamente a los ojos con linternas potentes o reflectores.
• Fuego: Si es seguro y factible, enciende una antorcha o fogata. El fuego espanta a la mayoría de los depredadores.`,
  },
  otra: {
    title: "Protocolo General de Seguridad",
    text: "Mantén una distancia segura y no intervengas de forma directa. La prioridad es tu seguridad. Evaluaremos tu reporte para derivarlo a quien corresponda.",
  },
};
