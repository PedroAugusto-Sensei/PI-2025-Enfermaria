import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header.jsx";
import Footer from "../../../components/Footer/footer.jsx";
import Botao from "../../../components/botao/Botao.jsx";
import "./cadastropaciente.css";
import axios from "axios";

export default function CadastroPaciente() {
  const [nome_paciente, setNomePaciente] = useState("");
  const [sexo, setSexo] = useState("");
  const [endereco, setEndereco] = useState("");
  const [data_nascimento, setDataNascimento] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [nome_responsavel1, setNomeresponsavel1] = useState("");
  const [nome_responsavel2, setNomeresponsavel2] = useState("");
  const [fuma, setFuma] = useState(false);
  const [comorbidades, setComorbidades] = useState("");

  const navigate = useNavigate();

  // máscara para telefone
  const handleTelefoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // remove não números

    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    if (value.length <= 10) {
      value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else {
      value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    }

    setTelefone(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/pacientes", {
        nome_paciente,
        sexo,
        endereco,
        data_nascimento,
        email,
        telefone,
        nome_responsavel1,
        nome_responsavel2,
        fuma,
        comorbidades
      });
      alert("Paciente cadastrado com sucesso!");
      setNomePaciente("");
      setSexo("");
      setEndereco("");
      setDataNascimento("");
      setEmail("");
      setTelefone("");
      setNomeresponsavel1("");
      setNomeresponsavel2("");
      setFuma(false);
      setComorbidades("");

      navigate("/listapacientes");

    } catch (error) {
      alert("Erro ao cadastrar paciente!");
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <main className="cadastro-paciente">
        <h2>Cadastro do Paciente</h2>
        <form className="formulario" onSubmit={handleSubmit}>
          <h3 className="titulos-guia">Informações básicas</h3>
          <div className="dados-basicos">
            <div className="coluna1">
              <div className="linha">
                <div className="campo">
                  <label>Nome completo</label>
                  <input
                    type="text"
                    placeholder="Ex: João da Silva"
                    value={nome_paciente}
                    onChange={e => setNomePaciente(e.target.value)}
                  />
                </div>
                <div className="campo">
                  <label>Sexo</label>
                  <select value={sexo} onChange={e => setSexo(e.target.value)}>
                    <option value="">Selecione</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
              </div>
              <div className="linha">
                <div className="campo">
                  <label>Endereço</label>
                  <input
                    type="text"
                    placeholder="Rua, nº, Bairro, Cidade"
                    value={endereco}
                    onChange={e => setEndereco(e.target.value)}
                  />
                </div>
                <div className="campo">
                  <label>Data de Nascimento</label>
                  <input
                    type="date"
                    value={data_nascimento}
                    onChange={e => setDataNascimento(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="coluna2">
              <div className="linha">
                <div className="campo">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="exemplo@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className="campo">
                  <label>Telefone</label>
                  <input
                    type="text"
                    placeholder="(99) 99999-9999"
                    value={telefone}
                    onChange={handleTelefoneChange}
                  />
                </div>
              </div>

              <div className="linha">
                <div className="campo">
                  <label>Nome do responsável</label>
                  <input
                    type="text"
                    placeholder="Ex: José Silva"
                    value={nome_responsavel1}
                    onChange={e => setNomeresponsavel1(e.target.value)}
                  />
                </div>
                <div className="campo">
                  <label>Nome da responsável</label>
                  <input
                    type="text"
                    placeholder="Ex: Maria Silva"
                    value={nome_responsavel2}
                    onChange={e => setNomeresponsavel2(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <h3 className="titulos-guia">Informações extras</h3>

          <div className="linha" id="linha-extra">
            <div className="campo">
              <label>O paciente fuma?</label>
              <select value={fuma ? "Sim" : "Não"} onChange={e => setFuma(e.target.value === "Sim")}>
                <option value="Não">Não</option>
                <option value="Sim">Sim</option>
              </select>
            </div>
            <div className="campo">
              <label>O paciente tem comorbidades?</label>
              <input
                type="text"
                placeholder="Ex: Hipertensão, Diabetes..."
                value={comorbidades}
                onChange={e => setComorbidades(e.target.value)}
              />
            </div>
          </div>
          <Botao type="submit" children="Cadastrar" />
        </form>
        <Footer />
      </main>
    </>
  );
}
