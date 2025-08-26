import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Botao from "../botao/Botao.jsx";

import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleVoltar = () => {
    if (location.pathname === "/listapacientes") {
      
      return;
    } else {
      navigate(-1); // Volta para a página anterior
    }
  };

  return (
    <header className="header" style={{justifyContent: location.pathname === "/listapacientes" ? "center" : "space-envely"}}>
      <h1>Enfermaria IFC</h1>
        <Botao 
          onClick={handleVoltar}
          variante="claro"
          style={{ display: location.pathname === "/listapacientes" ? "none" : "inline-flex" }}
        >
          ← Voltar
        </Botao>
    </header>
  );
};

export default Header;