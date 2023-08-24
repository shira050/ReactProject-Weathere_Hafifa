import React, { useContext } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { CityContext } from '../context/cityContext';
import { Link, useNavigate } from 'react-router-dom';
import '../comps/css/historyTable.css'

function TrHistoryTable(props) {
    let x=props.x,i=props.i,prevCity=props.prevCity;
    const { historySearch, setHistorySearch, updateCurrentCity, currentCity } = useContext(CityContext);
    const nav = useNavigate();
  return (
    <> <tr>
    <th scope='row'>{i + 1}</th>
    <td>{x.city}</td>
    <td>מדינה</td>
    <td>יבשת</td>
    <td>

        {currentCity && x.city == currentCity.city && <button
            onClick={() => {
                updateCurrentCity(prevCity);
                nav('/');
            }} style={{ color: 'red' }}> בטל בחירה </button>}
      
        {(x.city == 'Jerusalem' && x.city != currentCity.city) && <button to='' onClick={() => {
            updateCurrentCity(x);
             nav('/');
        }}> הפוך לראשי</button>}
       
        |<button onClick={() => {
            x.city == currentCity.city&& updateCurrentCity(prevCity);
            historySearch.splice(i, 1);
            alert("נמחק בהצלחה!");
            nav('/');
        }} style={{ color: 'red' }}>מחיקה מההיסטורייה</button>

    </td>
</tr></>  )
}

export default TrHistoryTable