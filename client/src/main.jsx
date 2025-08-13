import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './pages/Pacientes/Historico/historico'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
