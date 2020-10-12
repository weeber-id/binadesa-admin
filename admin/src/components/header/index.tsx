import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { LogoTelukJambe } from '../../assets';
import { useUserDispatch, useUserState } from '../../contexts/user-context';
import { fetchRequest } from '../../hooks/use-request';
import { urlServer } from '../../utils/urlServer';

const Header: React.FC = () => {
  const { level, name } = useUserState();
  const history = useHistory();
  const dispatch = useUserDispatch();

  useEffect(() => {
    (async () => {
      const { error, response } = await fetchRequest(
        `${urlServer}/admin/account`
      );

      if (
        error === 'Bad Request' ||
        error === 'Anda harus login untuk melakukan task ini.'
      ) {
        alert('Anda harus login untuk mengakses halaman ini');
        history.replace('/');
      } else if (level.length === 0 && name.length === 0) {
        const data = await response?.json();
        let adminLevel = '';
        if (data.data.level === 0) adminLevel = 'Super Admin';
        dispatch({
          type: 'SET_USER',
          state: { ...data.data, level: adminLevel },
        });
      }
    })();
    // eslint-disable-next-line
  }, [history, dispatch]);

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
            <div className="navbar__name">{name}</div>
            <div className="navbar__email">{level}</div>
          </div>
          <div className="navbar__avatar"></div>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
