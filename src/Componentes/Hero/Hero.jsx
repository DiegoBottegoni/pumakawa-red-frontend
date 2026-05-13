import pumaImg from "../../Assets/puma.jpg";

const Hero = () => {
  return (
    <section className="hero" id="inicio">
      <div className="puma-container">
        <img
          src={pumaImg}
          alt="Puma en su hábitat natural"
          className="puma-image"
        />
      </div>

      <div className="info-section" id="info">
        <p>
          Ayudanos a conservar el puma en Argentina. Tu reporte es fundamental
          para proteger nuestra fauna nativa. 
          Reporta dando click en "COMENZAR"
        </p>
      </div>

      <button className="cta-button" onClick={() => {}}>
        Comenzar
      </button>
    </section>
  );
};

export default Hero;
