import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/footer.jsx";
import Botao from "../../components/botao/Botao.jsx";
import coracao from "../../assets/imagens/coracao.png";
import cruz from "../../assets/imagens/cruz.png";
import estetoscopio from "../../assets/imagens/estetoscopio.png";
import mao from "../../assets/imagens/mao.png";
import pote from "../../assets/imagens/pote.png";
import raio from "../../assets/imagens/raio.png";

import "./login.css";

export default function LoginEnfermeiro() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      setErro("Por favor, preencha todos os campos.");
      return;
    }

    setErro("");
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/login', { 
        email, 
        senha 
      });
      
      console.log("Login realizado com sucesso:", response.data);
      
      // Armazenar dados do enfermeiro no localStorage
      localStorage.setItem('enfermeiro', JSON.stringify(response.data.enfermeiro));
      localStorage.setItem('isLoggedIn', 'true');
      
      // Mostrar mensagem de sucesso
      alert(`Bem-vindo(a), ${response.data.enfermeiro.nome_enfermeiro}!`);
      
      // Redirecionar para a página de lista de pacientes
      navigate('/listapacientes');
      
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      
      if (error.response) {
        // Erro do servidor (4xx, 5xx)
        const errorMessage = error.response.data.erro || "Erro ao fazer login. Tente novamente.";
        setErro(errorMessage);
      } else if (error.request) {
        // Erro de conexão
        setErro("Erro de conexão. Verifique se o servidor está rodando.");
      } else {
        // Outro erro
        setErro("Erro inesperado. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="pagina_login">
        <img src={coracao} alt="" className="icon coracao" />
        <img src={cruz} alt="" className="icon cruz" />
        <img src={estetoscopio} alt="" className="icon estetoscopio" />
        <img src={mao} alt="" className="icon mao" />
        <img src={pote} alt="" className="icon pote" />
        <img src={raio} alt="" className="icon raio" />

        <h2 className="titulo">Bem vindo(a) a Enfermaria IFC</h2>

        <form className="form-login" onSubmit={handleSubmit}>
          <h3>Login</h3>

          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            placeholder="Digite seu email"
          />

          <label>Senha</label>
          <input 
            type="password" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)}
            disabled={loading}
            placeholder="Digite sua senha"
          />

          {erro && <p className="erro-msg">{erro}</p>}

          <Botao 
            variante="escuro" 
            type="submit"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </Botao>
        </form>
      </div>
      <Footer />
    </>
  );
}
