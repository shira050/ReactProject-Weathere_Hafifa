import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody } from 'mdbreact';

export default function Alert(props) {

  return (
    <div className=' card p-3 d-flex align-items-center justify-content-center m-0' style={alertStyle}>
      <h2>{props.titel ||'!שגיאה'}</h2>
      <p>{props.message}</p>
      <button className='btn btn-danger' onClick={() => {
        props.setError({
          titel: "",
          message: ""
        })
      }}>אישור</button>
    </div>
  )
}


const alertStyle = {
  position: 'absolute',
  background:' #ffffff!important',
  zIndex: '999',
boxShadow:' 0px 2px 4px 0px rgba(0, 0, 0, 0.12)'
        }