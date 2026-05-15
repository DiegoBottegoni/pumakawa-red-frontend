import { useNavigate } from "react-router";
import Presentacion from "../components/Presentacion";

function PresentacionPage() {
  const navigate = useNavigate();
  return (
    <Presentacion
      onReportar={() => navigate("/")}
      onVerMapa={() => { }}
    />
  );
}

export default PresentacionPage