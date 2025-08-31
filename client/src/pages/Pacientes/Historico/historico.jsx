import React from "react";
import "./Historico.css";
import Footer from "../../../components/Footer/footer";
import Botao from "../../../components/botao/Botao"
import Header from "../../../components/Header/Header"
import { Navigate, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom"; // já importa aqui em cima

export default function HistoricoPaciente() {
  const { id } = useParams();
  const [historico, setHistorico] = useState([]);
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const idadeAtual = (dataNascimento) => {
    const [ano, mes, dia] = dataNascimento.split('-');
    const nascimento = new Date(ano, mes, dia);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    console.log(hoje.getFullYear(), nascimento.getFullYear())
    const m = hoje.getMonth() - nascimento.getMonth();

    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }

    return idade;
  }

  if (loading) {
    return (
      <div className="container-principal">
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
        <main className="conteudo">
          <div className="error">{error}</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="container-principal">
      <Header />


      {/* Conteúdo Principal */}
      <main className="conteudo">

        <h1 className="titulo">Histórico do Paciente</h1>

        {/* Info do Paciente */}
        <div className="paciente-nome-container ">
          <hr className="linha" />
          <span className="paciente-nome">
            {paciente ? paciente.nome_paciente : 'Paciente não encontrado'}
          </span>
          <hr className="linha" />
        </div>

        <div className="infos-paciente-container">
          <h2>Informações do Paciente</h2>

          <div className="infos-paciente">
            <div className="infos-linha">
              <p><strong>Data de Nascimento:</strong> {formatarData(paciente.data_nascimento) || 'N/A'}</p>
              <p><strong>Idade:</strong> {idadeAtual(paciente.data_nascimento) || 'N/A'}</p>
              <p><strong>Sexo:</strong> {paciente.sexo || 'N/A'}</p>
            </div>

            <div className="infos-linha">
              <p><strong>Telefone:</strong> {paciente.telefone || 'N/A'}</p>
              <p><strong>Email:</strong> {paciente.email || 'N/A'}</p>
            </div>

            <div className="infos-linha">
              <p><strong>Nome pai:</strong> {paciente.nome_responsavel1 || 'N/A'}</p>
              <p><strong>Nome mãe:</strong> {paciente.nome_responsavel2 || 'N/A'}</p>
            </div>

            <div className="infos-linha">
              <p><strong>Endereço:</strong> {paciente.endereco || 'N/A'}</p>
              <p><strong>Fuma:</strong> {paciente.fuma ? 'Sim' : 'Não'}</p>
            </div>

            <div className="infos-linha">
              <p><strong>Comorbidades:</strong> {paciente.comorbidades || 'N/A'}</p>
            </div>
          </div>

          <hr/>
        </div>

        

        <div className="titulo-hist-container">
          <h2 className="titulo-hist">Histócio de Consultas</h2>
        </div>

        {/* Lista de Consultas */}
        <div className="lista-consultas">
          {historico.length > 0 ? (
            historico.map((consulta) => (
              <>
                <div className="barra-separadora"></div>
                <div key={consulta.id_consulta} className="consulta-item">
                  <span className="consulta-data">
                    Data: {formatarData(consulta.data_consulta)}
                  </span>
                  <Botao 
                    variante="claro" 
                    onClick={() => navigate(`/analise/${consulta.id_consulta}`)}>Analisar</Botao>
                </div>
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
