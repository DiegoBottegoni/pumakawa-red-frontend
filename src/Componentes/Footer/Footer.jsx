import { useState } from "react";

const Footer = () => {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (item) => {
    setOpenItem(openItem === item ? null : item);
  };

  return (
    <footer className="footer-accordion">
      <ul className="footer-links">
        <li className={openItem === 'pumakawa' ? 'open' : ''}>
          <button onClick={() => toggleItem('pumakawa')}>Pumakawa</button>
          <div className="accordion-content">
            <p>Explora nuestra pagina Web.</p>
          </div>
        </li>
        
        <li className={openItem === 'nosotros' ? 'open' : ''}>
          <button onClick={() => toggleItem('nosotros')}>Sobre nosotros</button>
          <div className="accordion-content">
            <p>PumaRed es un proyecto de ciencia ciudadana que busca relevar, sistematizar y generar informacion sobre el conflictohumano-carnivoros silvestres a nivel nacional, con foco en el puma (Puma concolor).</p>
            <p>Tu participación es fundamental para la construir una coexistencia armoniosa entre las especies silvestres y las actividades humanas en ambientes naturales, rurales y urbanos.</p> 
            
          </div>
        </li>
        
        <li className={openItem === 'contacto' ? 'open' : ''}>
          <button onClick={() => toggleItem('contacto')}>Contacto</button>
          <div className="accordion-content">
            <p>Whatsapp: +54 9 123 4567</p>
          </div>
        </li>
      </ul>
      <p className="copyright">Un proyecto de <strong>Pumakawa</strong></p>
    </footer>
  );
};

export default Footer;
