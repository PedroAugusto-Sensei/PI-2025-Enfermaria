import './item.css';
import Botao from "../../components/botao/Botao.jsx";

const ListaPaciente = ({ nome, curso }) => {
  return (
    <div className="paciente">
      <span className="nome">{nome}</span>
      <span className="curso">{curso}</span>
      <div className="botoespaciente">
        <Botao children="Histórico" variante="claro"/>
        <Botao children="Consultar" variante="claro"/>
      </div>
    </div>
  );
};

export default ListaPaciente;