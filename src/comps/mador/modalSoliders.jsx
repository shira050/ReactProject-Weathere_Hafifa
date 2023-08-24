import { useState } from 'react';
import {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBContainer,
    MDBModalFooter,
} from 'mdb-react-ui-kit';
import AddSoliderForm from './addSoliderForm';
import { UserContext } from '../../context/userContext';
import { useContext } from 'react';
import { useEffect } from 'react';
import ArrowIcon from '../icons/arowIcon';
import '../../comps/css/modalSoliders.css'
import SelectedCardsEvents from './selectedCardsEvents';
import SelectSortBy from './selectSortBy';
import DisplaySoliders from './displaySoliders';





export default function ModalSoliders() {
    const [basicModal, setBasicModal] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
    const { soliders, updateSoliders } = useContext(UserContext);
    const [groupedBy, setGroupedBy] = useState({});
    const [isUpdated, setIsUpdated] = useState(false);//האם יש שינויים לשמירה בשרת

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleString());
        }, 20000);

        return () => clearInterval(interval);
    }, [soliders]);




    const toggleShow = () => {
        (basicModal && isUpdated) ? window.confirm('שים לב שישנם שינויים שלא נשמרו!') && setBasicModal(!basicModal) : setBasicModal(!basicModal);
    }

    return (
        <>
            <button onClick={toggleShow}>הצג חיילים</button>

            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                <MDBModalDialog style={{ maxWidth: '75%', height: '90vh' }}>
                    <MDBModalContent >
                        <button className='btn-close p-3' color='none' onClick={toggleShow}></button>
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
                                <SelectSortBy soliders={soliders} setGroupedBy={setGroupedBy} />

                                <DisplaySoliders groupedBy={groupedBy} />
                            </div>
                        </MDBModalBody>

                        <MDBModalFooter>
                            <SelectedCardsEvents isUpdated={isUpdated} setIsUpdated={setIsUpdated}
                                basicModal={basicModal} setBasicModal={setBasicModal} />
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}