import React, { useState } from 'react';
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



export default function ModalSoliders(props) {
    const [basicModal, setBasicModal] = useState(false);
    let soliders=props.soliders;

    const toggleShow = () => setBasicModal(!basicModal);

    return (
        <>
            <MDBBtn onClick={toggleShow}>הצג חיילים</MDBBtn>
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <div className=' col-4 row'>
                            <div className='col'>
                                <i class="fas fa-arrow-right-arrow-left"></i>
                            </div>
                            <div className='col'>
                                <MDBModalTitle>חיילי המדור</MDBModalTitle>
                                <p>{new Date().toLocaleString()}</p>
                                <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                            </div>
                        </div>


                        <MDBModalBody>
                            {soliders.map(solider=>
                                <SoliderCard item={solider}/>)}
                        </MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleShow}>
                                Close
                            </MDBBtn>
                            <MDBBtn>Save changes</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}