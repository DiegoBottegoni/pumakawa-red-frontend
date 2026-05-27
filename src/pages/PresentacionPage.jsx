import { useNavigate } from "react-router-dom";
import Presentacion from "../components/Presentacion";

function PresentacionPage() {
  const navigate = useNavigate();
  return (
    <Presentacion
      onReportar={() => navigate("/reportar")}
    />
  );
}

export default PresentacionPage