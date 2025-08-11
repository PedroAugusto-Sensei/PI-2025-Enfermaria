import React from "react";
import Footer from "../../components/Footer/footer.jsx";
import Botao from "../../components/botao/Botao.jsx";

import coracao from "../../assets/imagens/coracao.png";
import cruz from "../../assets/imagens/cruz.png";
import estetoscopio from "../../assets/imagens/estetoscopio.png";
import mao from "../../assets/imagens/mao.png";
import pote from "../../assets/imagens/pote.png";
import raio from "../../assets/imagens/raio.png";

import "./cadastroenfermeiro.css";

export default function CadastroEnfermeiro() {
  return (
    <>
    
      <div className="pagina-cadastro">
        <img src={coracao} alt="" className="icon coracao" />
        <img src={cruz} alt="" className="icon cruz" />
        <img src={estetoscopio} alt="" className="icon estetoscopio" />
        <img src={mao} alt="" className="icon mao" />
        <img src={pote} alt="" className="icon pote" />
        <img src={raio} alt="" className="icon raio" />


        <h2 className="titulo">Bem vindo(a) a Enfermaria IFC</h2>


        <form className="form-cadastro">
          <h3>Cadastro</h3>
          <label>Email</label>
          <input type="email" />
          <label>Endereço Institucional</label>
          <input type="text" />
          <label>Senha</label>
          <input type="password" />
          <label>Confirmar Senha</label>
          <input type="password" />
          <Botao texto="Cadastrar" />
        </form>
      </div>
      <Footer />
    </>
  );
}
