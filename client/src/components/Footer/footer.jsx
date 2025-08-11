import React from 'react';
import './Footer.css'; // Importa o CSS externo

export default function Footer() {
  return (
    <div className="footer-container">
      <footer className="footer">
        <div className="footer-left">
          <img
            src="\" // Substitua com o caminho correto da logo
            alt="Instituto Federal"
            className="if-logo"
          />
          <img src="/assets/imagens/IFClogo.png" alt="Instituto Federal" className="if-logo" />
          <div className="if-text">
            <strong>INSTITUTO FEDERAL</strong><br />
            Catarinense<br />
            Campus Concórdia
          </div>
        </div>

        <div className="footer-right">
          <div className="footer-copy">
            © 2025 grupo 3 PI. Todos os direitos reservados.
          </div>
          <div className="footer-pattern">
            oioioioioioioioioioioioioioioioioioioioio<br />
            ioioioioioioioioioioioioioioioioioioioioi<br />
            oioioioioioioioioioioioioioioioioioioioioi
          </div>
        </div>
      </footer>
    </div>
  );
}
