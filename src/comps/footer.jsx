import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter className='bg-dark text-center text-white w-100' style={{position:'absolute',bottom:0}}>
   
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
       Weather Hafifa<strong> Shira Chadad</strong> : © 2023 
        
      </div>
    </MDBFooter>
  );
}