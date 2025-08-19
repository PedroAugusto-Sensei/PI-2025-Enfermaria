// import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/footer.jsx";
import Login from "./pages/Login/login"
import CadPaciente from "./pages/Pacientes/CadastroPaciente/cadastropaciente"
import Consulta from "./pages/Consulta/consulta"
import Historico from "./pages/Pacientes/Historico/historico";
import ListPacientes from "./pages/Pacientes/Lista/listapacientes";
import CadEnfermeiro from "./pages/CadastroEnfermeiro/cadastroenfermeiro";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/cadastropaciente" element={<CadPaciente />} />
          <Route path="/" element={<Login />} />
          <Route path="/cadastroenfermeiro" element={<CadEnfermeiro />} />
          <Route path="/consulta" element={<Consulta />} />
          <Route path="/historico" element={<Historico />} />
          <Route path="/listapacientes" element={<ListPacientes />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
