import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './comps/login';
import Main from './comps/main';
import Haeder from './comps/weathere/haeder';
import Mador from './comps/mador/mador';
import './App.css';
import { USER } from './services/apiBasic';
import Error404Page from './comps/404Page';

function App() {
  let currentUser;
  if (localStorage[USER]) {
    currentUser = JSON.parse(localStorage[USER]);
  }

  return (
    <>
      <BrowserRouter>
        <Haeder />
        <Routes>
          <Route index element={<Main />} />
          <Route path="/login" element={<Login />} />
          {currentUser && <Route path="/mador" element={<Mador />} />}
          <Route path="*" element={<Error404Page/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
