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
      <div className="coluna nome">{nome}</div>
      <div className="coluna curso">{curso}</div>
      <div className="coluna botoespaciente">
        <Botao children="Histórico" variante="claro" onClick={handleHistorico}/>
        <Botao children="Consultar" variante="claro" onClick={handleConsultar}/>
      </div>
    </div>
  );
};

export default ListaPaciente;
