import React from 'react';
import { Link } from 'react-router-dom';
import { LogoTelukJambe } from '../../assets';

const Header: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__brand">
          <Link to="/">
            <LogoTelukJambe />
          </Link>
        </div>
        <div className="navbar__brand-mobile">
          <Link to="/">
            <LogoTelukJambe />
          </Link>
        </div>
        <ul className="navbar__lists">
          <div className="navbar__user-info">
            <div className="navbar__name">admin</div>
            <div className="navbar__email">admin@admin.com</div>
          </div>
          <div className="navbar__avatar"></div>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
