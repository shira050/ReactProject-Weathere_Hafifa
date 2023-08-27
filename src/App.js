import Login from './comps/login';

import { BrowserRouter, Route, Link, Routes } from 'react-router-dom'; 
import Main from './comps/main';
import Haeder from './comps/weathere/haeder';
import Mador from './comps/mador/mador';
import './App.css';

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
