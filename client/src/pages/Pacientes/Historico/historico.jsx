import React from "react";
import "./Historico.css";
import Footer from "../../../components/Footer/footer";
import Botao from "../../../components/botao/Botao"
import Header from "../../../components/Header/Header"
import pacienteIcon from "../../../assets/imagens/paciente.png"; // Coloque o caminho correto
import { Navigate, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios';

export default function HistoricoPaciente() {
  const { id } = useParams();
  const [historico, setHistorico] = useState([]);
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Buscar dados do paciente
        const pacienteResponse = await axios.get(`http://localhost:5000/api/pacientes/${id}`);
        setPaciente(pacienteResponse.data);
        
        // Buscar histórico do paciente
        const historicoResponse = await axios.get(`http://localhost:5000/api/historico/paciente/${id}`);
        setHistorico(historicoResponse.data);
        
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
        setError('Erro ao carregar os dados do paciente');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const formatarData = (dataString) => {
    if (!dataString) return '';
    
    const [ano, mes, dia] = dataString.split('-');
    const data = new Date(ano, mes - 1, dia);

    return data.toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <div className="container-principal">
        <Header></Header>
        <main className="conteudo">
          <div className="loading">Carregando...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-principal">
        <Header></Header>
        <main className="conteudo">
          <div className="error">{error}</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="container-principal">
      <Header></Header>


      {/* Conteúdo Principal */}
      <main className="conteudo">
        {/* Título */}
        <h1 className="titulo">Histórico do Paciente</h1>

        {/* Info do Paciente */}
        <div className="paciente-info">
          <hr className="linha" />
          <span className="paciente-nome">
            {paciente ? paciente.nome_paciente : 'Paciente não encontrado'}
          </span>
          <hr className="linha" />
        </div>

        {/* Lista de Consultas */}
        <div className="lista-consultas">
          {historico.length > 0 ? (
            historico.map((consulta) => (
              <>
                <div key={consulta.id_consulta} className="consulta-item">
                  <span className="consulta-data">
                    Data: {formatarData(consulta.data_consulta)}
                  </span>
                  <Botao variante="claro" onClick={() => {}}>Analisar</Botao>
                </div>
                <div className="barra-separadora"></div>
              </>
            ))
          ) : (
            <div className="sem-consultas">
              <p>Nenhuma consulta encontrada para este paciente.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
