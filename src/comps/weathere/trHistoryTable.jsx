import React, { useContext } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { CityContext } from '../../context/cityContext';
import { Link, useNavigate } from 'react-router-dom';
import '../css/historyTable.css'
import '../css/search.css'

function TrHistoryTable(props) {
    let x = props.x, i = props.i, prevCity = props.prevCity;
    const { historySearch, setHistorySearch, setCurrentCity, currentCity } = useContext(CityContext);
    const nav = useNavigate();
    return (
        <> <tr>
            <th scope='row'>{i + 1}</th>
            <td>{x.city}</td>
            <td>מדינה</td>
            <td>יבשת</td>
            <td>

                {currentCity && x.city == currentCity.city && <span
                    className='eventSearchBotton'
                    onClick={() => {
                        setCurrentCity(prevCity);
                        nav('/');
                    }} style={{ color: 'red' }}> בטל בחירה </span>}

                {(x.city == 'Jerusalem' && x.city != currentCity.city) && <span
                    className='eventSearchBotton'
                    onClick={() => {
                        setCurrentCity(x);
                        nav('/');
                    }}> הפוך לראשי</span>}

                |<span 
                className='eventSearchBotton'
                onClick={() => {
                    x.city == currentCity.city && setCurrentCity(prevCity);
                    historySearch.splice(i, 1);
                    alert("נמחק בהצלחה!");
                    nav('/');
                }} style={{ color: 'red' }}>מחיקה מההיסטורייה</span>

            </td>
        </tr></>)
}

export default TrHistoryTable