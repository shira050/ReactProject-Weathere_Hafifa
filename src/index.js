import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'mdbreact/dist/css/mdb.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from './context/userContext';
import { CityProvider } from './context/cityContext';
import * as process from 'process';

(window).global = window;
(window).process = process;
(window).Buffer = [];


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.Fragment>
  <UserProvider>
    <CityProvider>
   <App /> 
   </CityProvider>
  </UserProvider> 
  
  // </React.Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
