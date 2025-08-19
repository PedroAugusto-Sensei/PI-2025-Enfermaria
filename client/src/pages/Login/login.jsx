import React from "react";
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


        <form className="form-login">
          <h3>Login</h3>
          <label>Email</label>
          <input type="email" />
          <label>Senha</label>
          <input type="password" />
          <Botao variante="escuro">Entrar</Botao>

        </form>
      </div>
      <Footer />
    </>
  );
}
