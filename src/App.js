import Login from './comps/login';

import './App.css';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom'; 

import Home from './comps/Home';
import { Switch } from '@headlessui/react';
import Main from './comps/main';
import HistoryLastSearch from './comps/historyLastSearch';
import Haeder from './comps/haeder';
import Footer from './comps/footer';


function App() {
  
  return (

     <div style={{direction:'rtl' }}>
     <BrowserRouter>
     <Haeder/>
      <Routes>
          <Route index element={<Main />} />
          <Route path="/login" element={<Login />}/>  
          <Route path="/history" element={<HistoryLastSearch />}/>              
          <Route path="*" element={()=>{return <h1>not found!!</h1>}} /> 
      </Routes>
      <Footer/>
    </BrowserRouter>
     </div>
  );
}

export default App;
