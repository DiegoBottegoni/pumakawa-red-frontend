import ReportForm from "./components/ReportForm";
import { BrowserRouter, Routes, Route} from "react-router"

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/reportar" element={<ReportForm />} />
     </Routes>  
      </BrowserRouter>
    </>
  )
}

export default App
