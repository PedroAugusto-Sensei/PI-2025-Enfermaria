import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Botao from "../botao/Botao.jsx";

import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleVoltar = () => {
    if (location.pathname === "/listapacientes") {
      // Já está na página inicial, não faz nada
      return;
    } else {
      navigate(-1); // Volta para a página anterior
    }
  };

  return (
    <header className="header">
      <h1>Enfermaria IFC</h1>
        <Botao 
          onClick={handleVoltar}
          variante="claro"
        >
          ← Voltar
        </Botao>
    </header>
  );
};

export default Header;