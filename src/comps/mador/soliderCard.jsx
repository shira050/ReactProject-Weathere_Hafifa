import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import '../css/soliderCard.css'
import OfficerIcon from '../icons/officer';
export default function SoliderCard(props) {
  let currentSolider = props.solider;
  const { solider, isSelected, toggleSelect } = props;

  const handleSelect = () => {
    toggleSelect(solider.Mispar_Ishi);
  };

  return (
    <div className={`m-1 profileCard col-md-2 ${isSelected ? 'selected-card ' : ''}`} onClick={handleSelect}>
      <div className='col-4 cardProfile'>
        <img
          width={'100%'}
          className='imgProfile'
          src={
            currentSolider.Gender === 'ז'
              ? "data:image/png;base64,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"
              : "https://www.w3schools.com/howto/img_avatar2.png"
          }
       
       />
       {currentSolider.Is_Officer && (
             <div className='officerIcon bg-light text-center'>
             <OfficerIcon/>
             </div>
        )}

       

      </div>
      <div className='col'>
        <p>{currentSolider.Last_Name} {currentSolider.First_Name}</p>
        <p>{currentSolider.Rank}, {currentSolider.Age} </p>
        <p>{currentSolider.Rank}, {currentSolider.Role} </p>
      </div>

    </div>
  );
}