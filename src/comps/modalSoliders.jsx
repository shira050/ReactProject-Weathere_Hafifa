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




export default function ModalSoliders() {
    const [basicModal, setBasicModal] = useState(false);
    const {soliders, setSoliders} = useContext(UserContext);

    const toggleShow = () => setBasicModal(!basicModal);

    return (
        <>
            <MDBBtn onClick={toggleShow}>הצג חיילים</MDBBtn>
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1' >
                <MDBModalDialog >
                    <MDBModalContent>
                        <MDBBtn className='btn-close p-3' color='none' onClick={toggleShow}></MDBBtn>
                        <hr></hr>
                        <div className='row  text-end m-3'>
                            <div className='col-1 ' style={{ background: '#9370DB' }}>
                                <svg
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                    width="100%"
                                    height="100%"

                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M1 8a.5.5 0 01.5-.5h13a.5.5 0 010 1h-13A.5.5 0 011 8zM7.646.146a.5.5 0 01.708 0l2 2a.5.5 0 01-.708.708L8.5 1.707V5.5a.5.5 0 01-1 0V1.707L6.354 2.854a.5.5 0 11-.708-.708l2-2zM8 10a.5.5 0 01.5.5v3.793l1.146-1.147a.5.5 0 01.708.708l-2 2a.5.5 0 01-.708 0l-2-2a.5.5 0 01.708-.708L7.5 14.293V10.5A.5.5 0 018 10z"
                                    />
                                </svg>
                            </div>
                            <div className='col'>
                                <MDBModalTitle>חיילי המדור</MDBModalTitle>
                                <p>{new Date().toLocaleString()}</p>
                            </div>
                        </div>


                        <MDBModalBody>
                            <AddSoliderForm />
                           <div className='row'>
                            {soliders.map(solider =>
                                <SoliderCard solider={solider} />)}
                                </div>
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