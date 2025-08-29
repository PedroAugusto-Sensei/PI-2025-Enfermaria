import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./analiseconsulta.css";

export default function VisualizarConsulta() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [consulta, setConsulta] = useState(null);

  useEffect(() => {
    const carregarConsulta = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/consultas/${id}`);
        setConsulta(response.data);
      } catch (error) {
        console.error("Erro ao carregar consulta:", error);
        alert("Erro ao carregar dados da consulta");
      }
    };

    if (id) {
      carregarConsulta();
    }
  }, [id]);

  return (
    <div className="consulta-container">  
      <h1 className="titulo-consulta">Detalhes da Consulta</h1>
      
      <div className="nome-paciente">
        <div className="linha-decorativa"></div>
        <span>{consulta ? consulta.nome_paciente : "Carregando..."}</span>
        <div className="linha-decorativa"></div>
      </div>

      <div className="consulta-form">
        {/* Data e hora */}
        <div className="linha-superior">
          <div className="campo-data-hora">
            <label>Data da Consulta</label>
            <div className="campo-data">{consulta?.data_consulta || "--/--/----"}</div>

            <label>Hora da Consulta</label>
            <div className="campo-hora-input">{consulta?.hora_consulta || "--:--"}</div>
          </div>

          {/* Informações vitais */}
          <div className="campo-info-vitais">
            <label>Informações Vitais</label>
            <div className="info-vitais">
              <div className="campo-vital">
                <span>Pressão Arterial</span>
                <div className="campo-vital-input">{consulta?.pressao_arterial || "--/--"}</div>
              </div>
              <div className="campo-vital">
                <span>Temperatura</span>
                <div className="campo-vital-input">{consulta?.temperatura || "--"} °C</div>
              </div>
              <div className="campo-vital">
                <span>Saturação de Oxigênio</span>
                <div className="campo-vital-input">{consulta?.saturacao_oxigenio || "--"} %</div>
              </div>
              <div className="campo-vital">
                <span>Frequência Cardíaca</span>
                <div className="campo-vital-input">{consulta?.frequencia_cardiaca || "--"} bpm</div>
              </div>
              <div className="campo-vital">
                <span>Frequência Respiratória</span>
                <div className="campo-vital-input">{consulta?.frequencia_respiratoria || "--"} irpm</div>
              </div>
            </div>
          </div>
        </div>

        {/* Relatório */}
        <div className="campo-relatorio">
          <label>Relatório da Consulta</label>
          <div className="campo-relatorio-textarea">
            {consulta?.relatorio_consulta || "Nenhum relatório disponível."}
          </div>
        </div>
      </div>
    </div>
  );
}
