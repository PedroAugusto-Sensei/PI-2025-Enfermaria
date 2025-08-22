import './item.css';
import { useNavigate } from 'react-router-dom';
import Botao from "../../components/botao/Botao.jsx";

const ListaPaciente = ({ id, nome, curso }) => {
  const navigate = useNavigate();

  const handleHistorico = () => {
    navigate(`/historico/${id}`);
  };

  const handleConsultar = () => {
    navigate(`/consulta/${id}`);
  };

  return (
    <div className="paciente">
      <span className="nome">{nome}</span>
      <span className="curso">{curso}</span>
      <div className="botoespaciente">
        <Botao children="Histórico" variante="claro" onClick={handleHistorico}/>
        <Botao children="Consultar" variante="claro" onClick={handleConsultar}/>
      </div>
    </div>
  );
};

export default ListaPaciente;