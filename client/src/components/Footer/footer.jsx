import React from 'react';
import './Footer.css'; 
import ifLogo from '../../assets/imagens/IFC Concordia logo.png';

export default function Footer() {
  console.log('ifLogo =>', ifLogo);
  return (
    <div className="footer-container">
      <footer className="footer">
        <div className="footer-left">
          <img src={ifLogo} alt="Instituto Federal" className="if-logo" />
        </div>

        <div className="footer-right">
          <div className="footer-copy">
            © 2025 grupo 3 PI. Todos os direitos reservados.
          </div>
          <div className="footer-pattern">
            Contribuintes: Pedro Augusto, João Pramio,<br /> Ezequiel Chitolina,
            André Gabiati, Carlos e Emily Lermen.<br />
            Professores auxiliares: Danimar e Guilherme Sperb.
          </div>
        </div>
      </footer>
    </div>
  );
}
