import './Botao.css';

export default function Botao({variante = "claro", ...props }) {
  return (
    <button className={`botao ${variante}`} {...props}>
    </button>
  );
}
