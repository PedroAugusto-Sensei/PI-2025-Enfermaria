import Footer from "../../../components/Footer/footer.jsx";
import Botao from "../../../components/botao/Botao.jsx";
import Header from "../../../components/Header/Header.jsx";
import ListaPaciente from "../../../components/Item/item.jsx";
import SearchBar from "../../../components/barrapesquisa/barrapesquisa.jsx";

export default function Pacientes() {

  return (
    <>
        <div className="pagina-pacientes">

        <Header titulo="Enfermaria IFC" />

        <h2 className="titulo-pagina">Pacientes</h2>

        <div className="barra-acoes">
            <Botao children="Cadastrar +" variante="escuro" />
            <SearchBar placeholder="Pesquisar" botaoBuscar />
        </div>

        <ListaPaciente nome='Fulano da Silva' curso='E.M - 2F'/>
        <ListaPaciente nome='Fulano Machado' curso='Servidor'/>
        <ListaPaciente nome='Fulano Dalle Laste' curso='Superior Matemática'/>
        <ListaPaciente nome='Fulano Mior' curso='E.M - 1E'/>
        <ListaPaciente nome='Fulano Chitolina' curso='Superior - Ciências da Computação'/>
        <ListaPaciente nome='Fulano Schneider' curso='Servidor'/>
        <ListaPaciente nome='Fulano Bósio' curso='E.M - 1G'/>
        </div>

        <Footer />
    </>
  );
}
