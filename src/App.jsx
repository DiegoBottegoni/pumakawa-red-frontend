import ReportForm from "./components/ReportForm";
import PresentacionPage from "./pages/PresentacionPage";
import { BrowserRouter, Routes, Route } from "react-router"



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
