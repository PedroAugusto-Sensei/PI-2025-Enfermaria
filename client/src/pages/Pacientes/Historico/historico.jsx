import React from "react";
import "./Historico.css";
import Footer from "../../../components/Footer/footer";
import pacienteIcon from "../../../assets/imagens/paciente.png"; // Coloque o caminho correto

export default function HistoricoPaciente() {
  return (
    <div className="container-principal">
      {/* Barra Superior */}
      <header className="top-bar">
        <span>Enfermaria IFC</span>
      </header>

      {/* Conteúdo Principal */}
      <main className="conteudo">
        {/* Título */}
        <h1 className="titulo">Histórico do Paciente</h1>

        {/* Info do Paciente */}
        <div className="paciente-info">
          <hr className="linha" />
          <img src={pacienteIcon} alt="Paciente" className="paciente-icon" />
          <span className="paciente-nome">Fulano Pramio da Silva</span>
          <hr className="linha" />
        </div>

        {/* Lista de Consultas */}
        <div className="lista-consultas">
          <div className="consulta-item">
            <span className="consulta-data">Data: 11/09/2026</span>
            <button className="botao-analise">Analisar</button>
          </div>
          <div className="consulta-item">
            <span className="consulta-data">Data: 01/04/2026</span>
            <button className="botao-analise">Analisar</button>
          </div>
          <div className="consulta-item">
            <span className="consulta-data">Data: 25/03/2026</span>
            <button className="botao-analise">Analisar</button>
          </div>
        </div>
      </main>

      {/* Rodapé */}
      <Footer />
    </div>
  );
}
