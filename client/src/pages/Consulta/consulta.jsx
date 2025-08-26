 import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./consulta.css";
import Header from "../../components/Header/Header.jsx";

export default function ConsultaPaciente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    dataConsulta: "",
    horaConsulta: "",
    pressaoArterial: "",
    temperatura: "",
    saturacao: "",
    freqCardiaca: "",
    freqRespiratoria: "",
    relatorio: ""
  });
    
  // Função para formatar data atual
  const formatarDataAtual = () => {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  // Função para formatar hora atual
  const formatarHoraAtual = () => {
    const agora = new Date();
    const hora = String(agora.getHours()).padStart(2, '0');
    const minuto = String(agora.getMinutes()).padStart(2, '0');
    return `${hora}:${minuto}`;
  };

  // Máscara para data (DD/MM/AAAA)
  const formatarData = (valor) => {
    const numeros = valor.replace(/\D/g, '');
    if (numeros.length <= 2) return numeros;
    if (numeros.length <= 4) return `${numeros.slice(0, 2)}/${numeros.slice(2)}`;
    return `${numeros.slice(0, 2)}/${numeros.slice(2, 4)}/${numeros.slice(4, 8)}`;
  };

  // Máscara para hora (HH:MM)
  const formatarHora = (valor) => {
    const numeros = valor.replace(/\D/g, '');
    if (numeros.length <= 2) return numeros;
    return `${numeros.slice(0, 2)}:${numeros.slice(2, 4)}`;
  };

  // Máscara para pressão arterial (XXX/XX)
  const formatarPressao = (valor) => {
    const numeros = valor.replace(/\D/g, '');
    if (numeros.length <= 3) return numeros;
    return `${numeros.slice(0, 3)}/${numeros.slice(3, 5)}`;
  };

  // Máscara para temperatura (XX.X°C)
const formatarTemperatura = (valor) => {
  if (!valor) return "";
  let numeros = valor.replace(/\D/g, "");
  if (numeros.length <= 2) return numeros;
  if (numeros.length === 3) return `${numeros.slice(0, 2)}.${numeros.slice(2)}`;
  return `${numeros.slice(0, 2)}.${numeros.slice(2, 4)}`;
};

  // Máscara para saturação (XX%)
  const formatarSaturacao = (valor) => {
    const numeros = valor.replace(/\D/g, '');
    if (numeros.length <= 2) return numeros;
    return `${numeros.slice(0, 2)}`;
  };

  // Máscara para frequência cardíaca (XXX bpm)
  const formatarFreqCardiaca = (valor) => {
    const numeros = valor.replace(/\D/g, '');
    if (numeros.length <= 3) return numeros;
    return `${numeros.slice(0, 3)}`;
  };

  // Máscara para frequência respiratória (XX irpm)
  const formatarFreqRespiratoria = (valor) => {
    const numeros = valor.replace(/\D/g, '');
    if (numeros.length <= 2) return numeros;
    return `${numeros.slice(0, 2)}`;
  };

  // Função para converter data de DD/MM/AAAA para YYYY-MM-DD
  const converterDataParaAPI = (data) => {
    if (!data) return null;
    const partes = data.split('/');
    if (partes.length === 3) {
      return `${partes[2]}-${partes[1]}-${partes[0]}`;
    }
    return null;
  };

  // Carregar dados do paciente e preencher data/hora automaticamente
  useEffect(() => {
    const carregarPaciente = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/pacientes/${id}`);
        setPaciente(response.data);
      } catch (error) {
        console.error('Erro ao carregar paciente:', error);
        alert('Erro ao carregar dados do paciente');
      }
    };

    if (id) {
      carregarPaciente();
    }

    setFormData(prev => ({
      ...prev,
      dataConsulta: formatarDataAtual(),
      horaConsulta: formatarHoraAtual()
    }));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let valorFormatado = value;

    // Aplicar máscaras específicas para cada campo
    switch (name) {
      case 'dataConsulta':
        valorFormatado = formatarData(value);
        break;
      case 'horaConsulta':
        valorFormatado = formatarHora(value);
        break;
      case 'pressaoArterial':
        valorFormatado = formatarPressao(value);
        break;
      case 'temperatura':
        valorFormatado = formatarTemperatura(value);
        break;
      case 'saturacao':
        valorFormatado = formatarSaturacao(value);
        break;
      case 'freqCardiaca':
        valorFormatado = formatarFreqCardiaca(value);
        break;
      case 'freqRespiratoria':
        valorFormatado = formatarFreqRespiratoria(value);
        break;
      default:
        break;
    }

    setFormData((prev) => ({ ...prev, [name]: valorFormatado }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Preparar dados para a API conforme a rota /api/consultas
      const dadosConsulta = {
        id_paciente: parseInt(id),
        nome_paciente: paciente?.nome_paciente || '',
        data_consulta: converterDataParaAPI(formData.dataConsulta),
        hora_consulta: formData.horaConsulta,
        pressao_arterial: formData.pressaoArterial || null,
        temperatura: formData.temperatura ? parseFloat(formData.temperatura) : null,
        saturacao_oxigenio: formData.saturacao ? parseInt(formData.saturacao) : null,
        frequencia_cardiaca: formData.freqCardiaca ? parseInt(formData.freqCardiaca) : null,
        frequencia_respiratoria: formData.freqRespiratoria ? parseInt(formData.freqRespiratoria) : null,
        relatorio_consulta: formData.relatorio || null
      };

      // Enviar consulta para a API
      const response = await axios.post("http://localhost:5000/api/consultas", dadosConsulta);
      
      console.log('Consulta salva com sucesso:', response.data);
      alert("Consulta realizada com sucesso e salva no histórico!");
      
      // Redirecionar para a lista de pacientes
      navigate("/listapacientes");
      
    } catch (error) {
      console.error('Erro ao salvar consulta:', error);
      alert("Erro ao salvar consulta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="consulta-container">
      <h1 className="titulo-consulta">Consulta do Paciente</h1>
      <div className="nome-paciente">
        <div className="linha-decorativa"></div>
        <span>{paciente ? paciente.nome_paciente : 'Carregando...'}</span>
        <div className="linha-decorativa"></div>
      </div>
      
      <form onSubmit={handleSubmit} className="consulta-form">
        <div className="linha-superior">
          <div className="campo-data-hora">
            <label>Data da Consulta</label>
            <input
              type="text"
              name="dataConsulta"
              value={formData.dataConsulta}
              onChange={handleChange}
              className="campo-data"
              maxLength="10"
              placeholder="DD/MM/AAAA"
            />
            
            <label>Hora da Consulta</label>
            <input
              type="text"
              name="horaConsulta"
              value={formData.horaConsulta}
              onChange={handleChange}
              className="campo-hora-input"
              maxLength="5"
              placeholder="HH:MM"
            />
          </div>

          <div className="campo-info-vitais">
            <label>Informações Vitais</label>
            <div className="info-vitais">
              <div className="campo-vital">
                <span>Pressão Arterial</span>
                <input
                  type="text"
                  name="pressaoArterial"
                  value={formData.pressaoArterial}
                  onChange={handleChange}
                  placeholder="120/80"
                  className="campo-vital-input"
                  maxLength="6"
                />
              </div>
              <div className="campo-vital">
                <span>Temperatura</span>
                <input
                  type="text"
                  name="temperatura"
                  value={formData.temperatura}
                  onChange={handleChange}
                  placeholder="36.5"
                  className="campo-vital-input"
                  maxLength="4"
                />
              </div>
              <div className="campo-vital">
                <span>Saturação de Oxigênio</span>
                <input
                  type="text"
                  name="saturacao"
                  value={formData.saturacao}
                  onChange={handleChange}
                  placeholder="98"
                  className="campo-vital-input"
                  maxLength="2"
                />
              </div>
              <div className="campo-vital">
                <span>Frequência Cardíaca</span>
                <input
                  type="text"
                  name="freqCardiaca"
                  value={formData.freqCardiaca}
                  onChange={handleChange}
                  placeholder="72"
                  className="campo-vital-input"
                  maxLength="3"
                />
              </div>
              <div className="campo-vital">
                <span>Frequência Respiratória</span>
                <input
                  type="text"
                  name="freqRespiratoria"
                  value={formData.freqRespiratoria}
                  onChange={handleChange}
                  placeholder="16"
                  className="campo-vital-input"
                  maxLength="2"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="campo-relatorio">
          <label>Relatório da Consulta</label>
          <textarea
            name="relatorio"
            value={formData.relatorio}
            onChange={handleChange}
            placeholder="Digite aqui o relatório da consulta..."
            className="campo-relatorio-textarea"
          ></textarea>
        </div>

        <button type="submit" className="botao-salvar" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar Consulta'}
        </button>
      </form>
    </div>
  );
}
