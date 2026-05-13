import ReportForm from "./components/ReportForm";

import Navbar from "./Componentes/Navbar/Navbar";
import Hero from "./Componentes/Hero/Hero";
import Footer from "./Componentes/Footer/Footer";
import "./index.css";

function App() {
  return (
    <div className="landing-container">
      <Navbar />
      <h1 className="main-title">Red Ciudadana de Alerta Temprana de Pumas</h1>
      <ReportForm />
      <Hero />
      <Footer />
    </div>
  );
}

export default App;