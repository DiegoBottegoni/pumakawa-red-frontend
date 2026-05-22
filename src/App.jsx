import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";

// Ensure styles are imported
import "./components/Navbar/NavBarReport.css";
import "./components/Navbar/NavBarMapa.css";
import "./components/Navbar/NavBarProtocolo.css";


export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}