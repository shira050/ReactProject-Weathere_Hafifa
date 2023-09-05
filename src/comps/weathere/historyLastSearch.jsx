import React, { useContext } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { CityContext } from '../../context/cityContext';
import { Link, useNavigate } from 'react-router-dom';
import TrHistoryTable from './trHistoryTable';

export default function HistoryLastSearch() {
    const { historySearch, setHistorySearch, updateCurrentCity, currentCity } = useContext(CityContext);
    const nav = useNavigate();

    return (
        <div className="container-fluid text-center ">
            <div className="container py-5">
                <MDBTable className=''>
                    <MDBTableHead>
                        <tr>
                            <th scope='col'></th>
                            <th scope='col'>עיר</th>
                            <th scope='col'>מדינה</th>
                            <th scope='col'>יבשת</th>
                            <th scope='col'>פעולות</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {historySearch.map((x, i) =>
                           <TrHistoryTable x={x} i={i} prevCity={i>1&&historySearch[i-1]}/>
                        )}

                    </MDBTableBody>
                </MDBTable>
            </div></div>
    );
}