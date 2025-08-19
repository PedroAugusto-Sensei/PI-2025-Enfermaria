import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../../components/Footer/footer.jsx";
import Botao from "../../../components/botao/Botao.jsx";
import Header from "../../../components/Header/Header.jsx";
import ListaPaciente from "../../../components/Item/item.jsx";
import SearchBar from "../../../components/barrapesquisa/barrapesquisa.jsx";

import "./listapacientes.css";

export default function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Buscar pacientes do backend
  const fetchPacientes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/pacientes');
      setPacientes(response.data);
      setErro("");
    } catch (error) {
      console.error('Erro ao buscar pacientes:', error);
      setErro("Erro ao carregar pacientes. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Buscar pacientes por nome
  const searchPacientes = async (nome) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/pacientes/buscar?nome=${nome}`);
      setPacientes(response.data);
      setErro("");
    } catch (error) {
      console.error('Erro ao buscar pacientes:', error);
      setErro("Erro ao buscar pacientes. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Carregar pacientes ao montar o componente
  useEffect(() => {
    fetchPacientes();
  }, []);

  // Função para lidar com a busca
  const handleSearch = (termo) => {
    setSearchTerm(termo);
    if (termo.trim()) {
      searchPacientes(termo);
    } else {
      fetchPacientes(); // Se o termo estiver vazio, carrega todos
    }
  };

  return (
    <>
      <div className="pagina-pacientes">
        <Header titulo="Enfermaria IFC" />

        <h2 className="titulo-pagina">Pacientes</h2>

        <div className="barra-acoes">
          <Botao children="Cadastrar +" variante="escuro" />
          <SearchBar 
            placeholder="Pesquisar pacientes" 
            buttonLabel="Buscar"
            onSearch={handleSearch}
          />
        </div>

        {loading && (
          <div className="loading">
            <p>Carregando pacientes...</p>
          </div>
        )}

        {erro && (
          <div className="erro">
            <p>{erro}</p>
          </div>
        )}

        {!loading && !erro && pacientes.length === 0 && (
          <div className="sem-pacientes">
            <p>Nenhum paciente encontrado.</p>
          </div>
        )}

        {!loading && !erro && pacientes.map((paciente) => (
          <ListaPaciente 
            key={paciente.id_paciente}
            nome={paciente.nome_paciente}
            curso={`${paciente.sexo} - ${paciente.email}`}
            id={paciente.id_paciente}
          />
        ))}
      </div>

      <Footer />
    </>
  );
}
