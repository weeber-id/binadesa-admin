import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="max-width-1200 footer__container">
        <div className="footer__desa">
          <div className="footer__nama-desa">Desa TelukJambe</div>
          <div className="footer__alamat">
            Jl. Sukagalih, Telukjambe, Kec. Telukjambe Tim., Kabupaten Karawang,{' '}
            <br />
            Jawa Barat 41361
          </div>
        </div>
        <div className="footer__developed-by">
          Developed by{' '}
          <a href="http://weeber.id" target="_blank" rel="noopener noreferrer">
            Weeber
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
