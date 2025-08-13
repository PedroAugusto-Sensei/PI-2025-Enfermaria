import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './pages/Login/login.jsx'
import Teste from './pages/Pacientes/Historico/historico.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Teste />
  </StrictMode>,
)
