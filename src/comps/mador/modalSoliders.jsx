import { useState } from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBContainer,
    MDBModalFooter,
} from 'mdb-react-ui-kit';
import SoliderCard from './soliderCard';
import AddSoliderForm from './addSoliderForm';
import * as React from "react";
import { UserContext } from '../../context/userContext';
import { useContext } from 'react';
import { useEffect } from 'react';
import ArrowIcon from '../icons/arowIcon';
import { UpdateMadorSoliders } from '../../services/apiSoliders';
import '../../comps/css/modalSoliders.css'
import Alert from './alert';





export default function ModalSoliders() {
    const [basicModal, setBasicModal] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
    const { soliders, updateSoliders } = useContext(UserContext);
    const [groupedBy, setGroupedBy] = useState({});
    const [isUpdated, setIsUpdated] = useState(false);
    const [selectedCards, setSelectedCards] = useState([]);
    const [error, setError] = useState({ title: '', messege: '' });

    useEffect(() => {
        sortSolidersBy('City_Location');

        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleString());
        }, 20000);

        return () => clearInterval(interval);
    }, [soliders]);

    const toggleSelect = (id) => {
        if (selectedCards.includes(id)) {
            setSelectedCards(selectedCards.filter((selectedId) => selectedId !== id));
        } else {
            setSelectedCards([...selectedCards, id]);
        }
    };
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


    const toggleShow = () => {
        debugger
        (basicModal && isUpdated) ? window.confirm('שים לב שישנם שינויים שלא נשמרו!') && setBasicModal(!basicModal) : setBasicModal(!basicModal);
    }

    const updateSolidersInServer = async () => {
        if (isUpdated) {

            let res = await UpdateMadorSoliders(soliders);
            console.log(res);

            if (res && res.status == 200) {
                await setIsUpdated(false);
                toggleShow();
            }
            else {
                alert("שגיאה בשמירת חיילים חדשים נסה שוב...")
            }
        }
        else {
            // setError({messege:'אין שינויים לשמירה.',title:'שגיאה!'});
            alert('אין שינויים לשמירה.')
        }

    }


    const clearSelection = () => {
        setSelectedCards([]);
    };
    const handleSelectAll = () => {
        const allIds = soliders.map((solider) => solider.Mispar_Ishi);
        setSelectedCards(allIds);
    };
    const deleteSelectedCards = () => {
        if (selectedCards.length > 0) {
            const updatedSoliders = soliders.filter((solider) => !selectedCards.includes(solider.Mispar_Ishi));
            updateSoliders(updatedSoliders);
            setSelectedCards([]);
            setIsUpdated(true);
        } else {
            alert('לא נבחרו חיילים למחיקה.');
        }
    };

    return (
        <>


            <MDBBtn onClick={toggleShow}>הצג חיילים</MDBBtn>
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                <MDBModalDialog style={{ maxWidth: '75%', height: '90vh' }}>
                    <MDBModalContent >
                        <MDBBtn className='btn-close p-3' color='none' onClick={toggleShow}></MDBBtn>
                        <hr />
                        <div className='d-flex text-end m-3' >
                            <div className=' iconBackground' >
                                <ArrowIcon />

                            </div>
                            <div className='mx-3'>
                                <MDBModalTitle>חיילי המדור</MDBModalTitle>
                                <p>{currentTime}</p>
                            </div>
                        </div>


                        <MDBModalBody>
                            <AddSoliderForm changeIsUpdated={(status) => setIsUpdated(status)} />
                            <div className='row text-end'>
                                <div className='mb-4'>
                                    <label>סדר לפי:</label>
                                    <select
                                        className=''
                                        onChange={(e) => { sortSolidersBy(e.target.value) }}
                                    >
                                        <option value='City'> עיר</option>
                                        <option value='Gender'>מין</option>
                                        <option value='City_Location'>מיקום עיר בארץ</option>
                                        <option value='Rank+Role'>תפקיד+דרגה  </option>
                                    </select>
                                </div>


                                <div className='scroll-container'>
                                    {Object.keys(groupedBy).map((title) => (
                                        <div key={title}>
                                            <h5>
                                                {title === 'ז' || title === 'נ' ?
                                                    (title === 'ז' ? 'זכר' : 'נקבה')
                                                    : title
                                                }
                                            </h5>
                                            <div className='solider-list row'>
                                                {groupedBy[title].map((solider) => (
                                                    <SoliderCard
                                                        key={solider.Mispar_Ishi}
                                                        solider={solider}
                                                        isSelected={selectedCards.includes(solider.Mispar_Ishi)}
                                                        toggleSelect={(id) => toggleSelect(id)}
                                                    />))}
                                            </div>
                                        </div>
                                    ))}
                                </div>






                            </div>
                        </MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={updateSolidersInServer}>
                                שמירה
                            </MDBBtn>
                            <MDBBtn color='secondary' onClick={handleSelectAll}>
                                בחר הכל
                            </MDBBtn>
                            {selectedCards.length > 0 &&
                                <>  <MDBBtn color='secondary' onClick={clearSelection}>
                                    נקה הכל
                                </MDBBtn>
                                    <MDBBtn color='secondary' onClick={deleteSelectedCards}>
                                        מחיקת מסומנים
                                    </MDBBtn>
                                </>}
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
            {/* {error&&<Alert title={error.title} messege={error.messege} setError={setError}/>} */}
        </>
    );
}