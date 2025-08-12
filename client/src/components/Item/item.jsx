import './item.css';

const ListaPaciente = ({ nome, curso }) => {
  return (
    <div className="paciente">
      <span className="nome">{nome}</span>
      <span className="curso">{curso}</span>
      <div className="patient-buttons">
        <button className="btn-historico">Histórico</button>
        <button className="btn-consultar">Consultar</button>
      </div>
    </div>
  );
};

export default ListaPaciente;