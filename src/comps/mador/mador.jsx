import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { getRquest } from '../../services/apiBasic';
import ModalSoliders from './modalSoliders';
import { UserContext } from '../../context/userContext';

function Mador() {
  const { soliders, updateSoliders } = useContext(UserContext);
  const [error, setError] = useState();

  const getSoliders = async () => {
    try {
      let res = await getRquest(`http://localhost:${process.env.REACT_APP_API_PORT}/getAllSoldiers`);
      //  && res.status === 200
      if (res) {
        updateSoliders(res.data);
      } else {
        alert('שגיאה בטעינת חיילים אנא נסה מאוחר יותר!');
      }
    } catch (error) {
      console.error(error);
      setError(error)

    }
  };

  useEffect(() => {
    getSoliders();
  }, []);

  return (
    <div className="container-fluid  text-center ">
      <div className="container py-5">
        {soliders.length > 0 ? <ModalSoliders />
           : (error) && ( <p>שגיאה בשליפת חיילים</p>)
        }
      </div></div>

  )
}

export default Mador