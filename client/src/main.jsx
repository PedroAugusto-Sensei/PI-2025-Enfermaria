import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './pages/CadastroEnfermeiro/cadastroenfermeiro.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
