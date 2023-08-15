import { useState } from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';
import SoliderCard from './soliderCard';
import AddSoliderForm from './addSoliderForm';
import * as React from "react";
import { UserContext } from '../context/userContext';
import { useContext } from 'react';
import { useEffect } from 'react';
import ArrowIcon from './icons/arowIcon';




export default function ModalSoliders() {
    const [basicModal, setBasicModal] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
    const { soliders, updateSoliders } = useContext(UserContext);
    const [groupedBy, setGroupedBy] = useState({});

    const groupBy = (arr, property, separator = '-') => {
        return arr.reduce((groups, item) => {
            const value = property === 'Rank+Role' ? `${item.Rank}${separator}${item.Role}` : item[property];
            if (!groups[value]) {
                groups[value] = [];
            }
            groups[value].push(item);
            return groups;
        }, {});
    };

    const sortSolidersBy = async (sortBy) => {
        const newGroupedBy = groupBy(soliders, sortBy, sortBy === 'Rank+Role' ? ',' : undefined);
        await setGroupedBy(newGroupedBy);
    };


    const toggleShow = () => setBasicModal(!basicModal);

    useEffect(() => {
        sortSolidersBy('City_Location');

        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleString());
        }, 20000);

        return () => clearInterval(interval);
    }, [soliders]);



    return (
        <>
            <MDBBtn onClick={toggleShow}>הצג חיילים</MDBBtn>
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                <MDBModalDialog style={{ maxWidth: '75%' }}>
                    <MDBModalContent >
                        <MDBBtn className='btn-close p-3' color='none' onClick={toggleShow}></MDBBtn>
                        <hr></hr>
                        <div className='row  text-end m-3'>
                            <div className='col-1 ' style={{ background: '#9370DB' }}>
                                <ArrowIcon />
                            </div>
                            <div className='col'>
                                <MDBModalTitle>חיילי המדור</MDBModalTitle>
                                <p>{currentTime}</p>
                            </div>
                        </div>


                        <MDBModalBody>
                            <AddSoliderForm />
                            <div className='row text-end'>
                                <div className='mb-4'>
                                    <label>סדר לפי:</label>
                                    <select
                                        className=''
                                        onChange={(e) => { debugger; sortSolidersBy(e.target.value) }}
                                    >
                                        <option value=''> בחר </option>
                                        <option value='City'> עיר</option>
                                        <option value='Gender'>מין</option>
                                        <option value='City_Location'>מיקום עיר בארץ</option>
                                        <option value='Rank+Role'>תפקיד+דרגה  </option>
                                    </select>
                                </div>

                                {Object.keys(groupedBy).map((title) => (
                                    <>
                                        <h5>{title}</h5>
                                        {groupedBy[title].map((solider) => (
                                            <SoliderCard key={solider.Mispar_Ishi} solider={solider} />
                                        ))}
                                    </>
                                ))}





                            </div>
                        </MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleShow}>
                                שמירה
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}