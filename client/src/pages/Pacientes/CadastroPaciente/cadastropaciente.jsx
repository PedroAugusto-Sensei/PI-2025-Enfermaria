import React from "react";
import Header from "../../../components/Header/Header.jsx";
import Footer from "../../../components/Footer/footer.jsx";
import "./cadastropaciente.css";

export default function CadastroPaciente() {
      return (
    <div className="pagina">
        <main>
            <h2>Cadastro do Paciente</h2>
            <form className="formulario">
     <div className="linha">
     <div className="campo">
        <label>Nome completo</label>
        <input type="text" />
        </div>
     <div className="campo">
            <label>Sexo</label>
    <select>
            <option>Selecione</option>
            <option>Masculino</option>
            <option>Feminino</option>
            <option>Outro</option>
     </select>
  </div>
</div>
         <div className="linha">
         <div className="campo">
               <label>Endereço</label>
               <input type="text" />
</div>
        <div className="campo">
             <label>Data de Nascimento</label>
             <input type="date" />
            </div>

</div>
        <div className="linha">
        <div className="campo">
              <label>Email</label>
              <input type="email" />
            </div>
            <div className="campo">
              <label>Telefone</label>
              <input type="tel" />
            </div>
          </div>

 <div className="linha">
            <div className="campo">
              <label>Nome do responsável</label>
              <input type="text" />
            </div>
            <div className="campo">
              <label>Nome da responsável</label>
              <input type="text" />
            </div>
          </div>

          <h3>Informações extras</h3>

           <div className="linha">
            <div className="campo">
              <label>O paciente fuma?</label>
              <select>
                <option>Selecione</option>
                <option>Sim</option>
                <option>Não</option>
              </select>
            </div>
            <div className="campo">
              <label>O paciente tem comorbidades?</label>
              <input type="checkbox" />
            </div>
          </div>

            </form>
        </main>
    </div>
    
)
}















