import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './pages/Pacientes/Lista/listapacientes'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
