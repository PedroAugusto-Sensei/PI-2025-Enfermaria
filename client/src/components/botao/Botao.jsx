import './Botao.css';

export default function Botao({ children, variante = "claro", onClick, ...props }) {
  return (
    <button 
      className={`botao ${variante}`} 
      onClick={onClick} 
      {...props}
    >
      {children}
    </button>
  );
}
