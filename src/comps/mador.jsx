import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { doApiGet } from '../services/apiBasic';
import ModalSoliders from './modalSoliders';


function Mador() {
  const [soliders, setSoliders] = useState([]);
  const getSoliders = async () => {
    try {
      let res = await doApiGet('http://localhost:3001/getAllSoldiers');
      //  && res.status === 200
      if (res) {
        setSoliders(res.data);
      } else {
        alert('שגיאה בטעינת חיילים אנא נסה מאוחר יותר!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSoliders();
  }, []);

  return (
    <div className="container-fluid  text-center ">
      <div className="container py-5">
        {soliders.length > 0 && 
        <ModalSoliders soliders={soliders}/>
        // <button type="button" class="btn btn-secondary btn-rounded">הצג חיילים</button>
        }
      </div></div>

  )
}

export default Mador