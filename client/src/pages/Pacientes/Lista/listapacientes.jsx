import Footer from "../../../components/Footer/footer.jsx";
import Botao from "../../../components/botao/Botao.jsx";
import Header from "../../../components/Header/Header.jsx";
import ListaPaciente from "../../../components/Item/item.jsx";
import SearchBar from "../../../components/barrapesquisa/barrapesquisa.jsx";

export default function Pacientes() {
  const pacientes = [
    { nome: "Fulano da Silva", turma: "E.M - 2F" },
    { nome: "Fulano Machado", turma: "Servidor" },
    { nome: "Fulano Dalle Laste", turma: "Superior Matemática" },
    { nome: "Fulano Mior", turma: "E.M - 1E" },
    { nome: "Fulano Chitolina", turma: "Superior - Ciências da Computação" },
    { nome: "Fulano Schneider", turma: "Servidor" },
    { nome: "Fulano Bósio", turma: "E.M - 1G" }
  ];

  return (
    <div className="pagina-pacientes">

      <Header titulo="Enfermaria IFC" />

      <h2 className="titulo-pagina">Pacientes</h2>

      <div className="barra-acoes">
        <Botao children="Cadastrar +" variante="escuro" />
        <SearchBar placeholder="Pesquisar" botaoBuscar />
      </div>

      <div className="lista-pacientes">
        {pacientes.map((p, index) => (
          <ListaPaciente
            key={index}
            nome={p.nome}
            turma={p.turma}
            historico
            consultar
          />
        ))}
      </div>

      <Footer />
    </div>
  );
}
