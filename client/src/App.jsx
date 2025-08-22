// import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Footer from "./components/Footer/footer.jsx";
import Login from "./pages/Login/login"
import CadPaciente from "./pages/Pacientes/CadastroPaciente/cadastropaciente"
import Consulta from "./pages/Consulta/consulta"
import Historico from "./pages/Pacientes/Historico/historico";
import ListPacientes from "./pages/Pacientes/Lista/listapacientes";
import CadEnfermeiro from "./pages/CadastroEnfermeiro/cadastroenfermeiro";


// Componente para proteger rotas privadas
function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const enfermeiro = localStorage.getItem('enfermeiro');

  // Se não estiver logado ou não tiver dados do enfermeiro, redireciona para login
  if (!isLoggedIn || !enfermeiro) {
    alert('Você não tem permissão para acessar essa página sem estar logado!')
    return <Navigate to="/" replace />;
  }

  return children;
}

// Componente para redirecionar usuários logados da página de login
function PublicRoute({ children }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const enfermeiro = localStorage.getItem('enfermeiro');

  return children;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicRoute children={<Login />} />} />
          <Route path="/cadastropaciente" element={<ProtectedRoute children={<CadPaciente />} />} />
          <Route path="/cadastroenfermeiro" element={<PublicRoute children={<CadEnfermeiro />} />} />
          <Route path="/consulta" element={<ProtectedRoute children={<Consulta />} />} />
          <Route path="/historico/:id" element={<ProtectedRoute children={<Historico />} />} />
          <Route path="/listapacientes" element={<ProtectedRoute children={<ListPacientes />} />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
