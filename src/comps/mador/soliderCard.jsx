import React from 'react';
import '../css/soliderCard.css'
import { ReactComponent as ProfilPicWoman } from '../icons/woman.svg'
import { ReactComponent as ProfilPicMan } from '../icons/man.svg'
import { ReactComponent as OfficerIcon } from '../icons/officer.svg'


export default function SoliderCard(props) {
  let currentSolider = props.solider;
  const { solider, isSelected, toggleSelect } = props;

  const handleSelect = () => {
    toggleSelect(solider);
  };


  return (
    <div className={`profileCard ${isSelected ? 'selected-card ' : ''}`} onClick={handleSelect}>
      <div className='avatar'>

        <div className='imgHolder'>
          {currentSolider.Gender === 'ז' ?
            <ProfilPicMan className='imgProfile' /> :
            <ProfilPicWoman className='imgProfile' />
          }

          {currentSolider.Is_Officer && (
            <OfficerIcon className='officerIcon' />
          )}
        </div>

      </div>
      <div className='text-small'>
        <p className='text-bold'>{currentSolider.Last_Name} {currentSolider.First_Name}</p>
        <p >{currentSolider.Rank}, {currentSolider.Age} </p>
        <p >{currentSolider.Rank}, {currentSolider.Role} </p>
      </div>

    </div>
  );
}