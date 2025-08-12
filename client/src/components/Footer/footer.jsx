import React from 'react';
import './Footer.css'; 
import ifLogo from '../../assets/imagens/IFClogo.png';

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
            oioioioioioioioioioioioioioioioioioioioio<br />
            ioioioioioioioioioioioioioioioioioioioioi<br />
            oioioioioioioioioioioioioioioioioioioioioi
          </div>
        </div>
      </footer>
    </div>
  );
}
