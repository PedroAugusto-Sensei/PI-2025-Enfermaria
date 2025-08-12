import './Botao.css';

export default function Botao({children, variante = "claro", ...props }) {
  return (
    <button className={`botao ${variante}`} {...props}>
      {children}
    </button>
  );
}
