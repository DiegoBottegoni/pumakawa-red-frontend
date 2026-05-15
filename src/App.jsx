import ReportForm from "./components/ReportForm";
import Presentacion from "./components/Presentacion";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router"

function PresentacionPage() {
  const navigate = useNavigate();
  return (
    <Presentacion
      onReportar={() => navigate("/")}
      onVerMapa={() => {}}
    />
  );
}

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<ReportForm />} />
        <Route path="/presentacion" element={<PresentacionPage />} />
     </Routes>  
      </BrowserRouter>
    </>
  )
}

export default App
