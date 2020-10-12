import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useUserDispatch } from './contexts/user-context';
import { fetchRequest } from './hooks/use-request';
import {
  Berita,
  Keluhan,
  LoginPage,
  Pengajuan,
  PengajuanDetail,
  CreateUpdateBerita,
} from './pages';
import KeluhanDetail from './pages/keluhan-detail';
import { urlServer } from './utils/urlServer';

function App() {
  const userDispatch = useUserDispatch();

  useEffect(() => {
    (async () => {
      const { response } = await fetchRequest(`${urlServer}/admin/account`);
      if (response?.status === 200) {
        const data = await response.json();
        let adminLevel = '';
        if (data.data.level === 0) adminLevel = 'Super Admin';
        userDispatch({
          type: 'SET_USER',
          state: { ...data.data, level: adminLevel },
        });
      }
    })();
  }, [userDispatch]);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/pengajuan" exact component={Pengajuan} />
        <Route path="/keluhan" exact component={Keluhan} />
        <Route path="/berita" exact component={Berita} />
        <Route path="/pengajuan/:id" exact component={PengajuanDetail} />
        <Route path="/berita/create" exact component={CreateUpdateBerita} />
        <Route path="/keluhan/:id" exact component={KeluhanDetail} />
      </Switch>
    </div>
  );
}

export default App;
