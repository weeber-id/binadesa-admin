import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useUserDispatch } from '../../contexts/user-context';
import { fetchRequest } from '../../hooks/use-request';
import { urlServer } from '../../utils/urlServer';

const Sidebar = () => {
  const dispatch = useUserDispatch();
  const history = useHistory();
  const handleLogout = async () => {
    await fetchRequest(`${urlServer}/logout`, { method: 'POST' });
    dispatch({ type: 'DELETE_USER' });

    history.replace('/login?type=logout');
  };

  return (
    <div className="sidebar">
      <div className="sidebar__lists">
        <NavLink
          className="sidebar__link"
          activeClassName="active"
          to="/pengajuan"
        >
          <div className="sidebar__list">Data Pengajuan</div>
        </NavLink>
        <NavLink
          className="sidebar__link"
          activeClassName="active"
          to="/keluhan"
        >
          <div className="sidebar__list">Keluhan</div>
        </NavLink>
        <NavLink
          className="sidebar__link"
          activeClassName="active"
          to="/berita"
        >
          <div className="sidebar__list">Berita</div>
        </NavLink>
      </div>
      <div onClick={handleLogout} className="sidebar__logout">
        Logout
      </div>
    </div>
  );
};

export default Sidebar;
