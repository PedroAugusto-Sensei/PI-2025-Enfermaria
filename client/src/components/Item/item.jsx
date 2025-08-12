import './item.css';

const ListaPaciente = ({ nome, curso }) => {
  return (
    <div className="paciente">
      <span className="nome">{nome}</span>
      <span className="curso">{curso}</span>
      <div className="patient-buttons">
        <button children="Histórico" variante="escuro"/>
        <button children="Consultar" variante="escuro"/>/
      </div>
    </div>
  );
};

export default ListaPaciente;