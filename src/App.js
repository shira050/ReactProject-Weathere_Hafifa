import Login from './comps/login';

import './App.css';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom'; 

import Home from './comps/Home';
import { Switch } from '@headlessui/react';
import Main from './comps/main';
import Haeder from './comps/haeder';
import Mador from './comps/mador';

function App() {
  
  return (

     <>
     <BrowserRouter>
     <Haeder/>
      <Routes>
          <Route index element={<Main />} />
          <Route path="/login" element={<Login />}/>        
          <Route path="/mador" element={<Mador />}/>        
          <Route path="*" element={()=>{return <h1>not found!!</h1>}} /> 
      </Routes>
    </BrowserRouter>
     </>
  );
}

export default App;
