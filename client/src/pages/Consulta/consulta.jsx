
import React, { useState } from "react";
import "./consulta.css";

export default function ConsultaPaciente() {
  const [form, setForm] = useState({
    nome: "",
    dataConsulta: "",
    horaConsulta: "",
    pressao: "",
    temperatura: "",
    saturacao: "",
    freqCardiaca: "",
    freqRespiratoria: "",
    relatorio: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Dados enviados:", form);
    alert("Consulta salva com sucesso!");
  }

  return (
    <div className="consulta-container">
      <header className="topo">
        <h1>Enfermaria IFC - Página de Consultas</h1>
      </header>

      <main className="conteudo">
        <h2>Consulta do Paciente</h2>
        <p>Esta é a página de consultas da enfermaria</p>

        <form onSubmit={handleSubmit}>
          <div className="linha">
            <input
              type="text"
              name="nome"
              placeholder="Nome do Paciente"
              value={form.nome}
              onChange={handleChange}
            />
          </div>

          <div className="linha">
            <div className="campo">
              <label>Data da Consulta</label>
              <input
                type="date"
                name="dataConsulta"
                value={form.dataConsulta}
                onChange={handleChange}
              />
            </div>

            <div className="campo">
              <label>Hora da Consulta</label>
              <input
                type="time"
                name="horaConsulta"
                value={form.horaConsulta}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="linha vitais">
            <label>Informações Vitais</label>
            <div className="grid-vitais">
              <div>
                <span>Pressão Arterial</span>
                <input
                  type="text"
                  name="pressao"
                  value={form.pressao}
                  onChange={handleChange}
                />
              </div>
              <div>
                <span>Temperatura</span>
                <input
                  type="text"
                  name="temperatura"
                  value={form.temperatura}
                  onChange={handleChange}
                />
              </div>
              <div>
                <span>Saturação de O₂</span>
                <input
                  type="text"
                  name="saturacao"
                  value={form.saturacao}
                  onChange={handleChange}
                />
              </div>
              <div>
                <span>Frequência Cardíaca</span>
                <input
                  type="text"
                  name="freqCardiaca"
                  value={form.freqCardiaca}
                  onChange={handleChange}
                />
              </div>
              <div>
                <span>Frequência Respiratória</span>
                <input
                  type="text"
                  name="freqRespiratoria"
                  value={form.freqRespiratoria}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="linha">
            <label>Relatório da Consulta</label>
            <textarea
              name="relatorio"
              value={form.relatorio}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit">Salvar Consulta</button>
        </form>
      </main>

      <footer className="rodape">
        <p>Footer da página de consultas</p>
      </footer>
    </div>
  );
}
