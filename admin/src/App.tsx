import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
  Berita,
  Keluhan,
  LoginPage,
  Pengajuan,
  PengajuanDetail,
} from './pages';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/pengajuan" exact component={Pengajuan} />
        <Route path="/keluhan" exact component={Keluhan} />
        <Route path="/berita" exact component={Berita} />
        <Route path="/pengajuan/:id" exact component={PengajuanDetail} />
      </Switch>
    </div>
  );
}

export default App;
