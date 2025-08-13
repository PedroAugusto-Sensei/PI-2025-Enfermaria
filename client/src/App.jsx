// import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./pages/Login/login"
import CadPaciente from "./pages/Pacientes/CadastroPaciente/cadastropaciente"
import Consulta from "./pages/Pacientes/Consulta/consulta"
import ConsultaEnfermaria from "./pages/Consulta/consulta"
import Historico from "./pages/Pacientes/Historico/historico";
import ListPacientes from "./pages/Pacientes/Lista/listapacientes";
import CadEnfermeiro from "./pages/CadastroEnfermeiro/cadastroenfermeiro";


function App() {
  return (
    <>
      <Router>
        {/* Navegação temporária para testar */}
        <nav style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
          <Link to="/" style={{ marginRight: '10px' }}>Login</Link>
          <Link to="/consulta-enfermaria" style={{ marginRight: '10px' }}>Consulta Enfermaria</Link>
          <Link to="/consulta" style={{ marginRight: '10px' }}>Consulta Pacientes</Link>
          <Link to="/cadastropaciente" style={{ marginRight: '10px' }}>Cadastro Paciente</Link>
          <Link to="/cadastroenfermeiro" style={{ marginRight: '10px' }}>Cadastro Enfermeiro</Link>
          <Link to="/historico" style={{ marginRight: '10px' }}>Histórico</Link>
          <Link to="/listapacientes" style={{ marginRight: '10px' }}>Lista Pacientes</Link>
        </nav>

        <Routes>
           <Route path="/cadastropaciente" element={<CadPaciente />} />
          <Route path="/" element={<Login />} />
          <Route path="/cadastroenfermeiro" element={<CadEnfermeiro />} />
          <Route path="/consulta" element={<Consulta />} />
          <Route path="/consulta-enfermaria" element={<ConsultaEnfermaria />} />
          <Route path="/historico" element={<Historico />} />
          <Route path="/listapacientes" element={<ListPacientes />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
