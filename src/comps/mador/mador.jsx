import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { doApiGet } from '../../services/apiBasic';
import ModalSoliders from './modalSoliders';
import { UserContext } from '../../context/userContext';

//error bug
function Mador() {
  const { soliders, updateSoliders } = useContext(UserContext);
  const getSoliders = async () => {
    try {
      let res = await doApiGet('http://localhost:3001/getAllSoldiers');//env
      //  && res.status === 200
      if (res) {
        updateSoliders(res.data);
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
        {soliders.length > 0 ? <ModalSoliders />
          : <p>שגיאה בשליפת חיילים</p>
        }
      </div></div>

  )
}

export default Mador