import ReportForm from "./components/ReportFrom/ReportForm";
import Protocolos from "./components/Protocolos/Protocolos";
import { BrowserRouter, Routes, Route} from "react-router"

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/reportar" element={<ReportForm />} />
        <Route path="/protocolos" element={<Protocolos />} />
      </Routes>  
      </BrowserRouter>
    </>
  )
}

export default App
