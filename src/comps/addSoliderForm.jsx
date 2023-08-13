import React, { useState, useContext } from 'react';
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { UserContext } from '../context/userContext';

export default function AddSoliderForm() {
  const { soliders, setSoliders } = useContext(UserContext);
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [gender, setGender] = useState('');

  const addNewSolider = (newSolider) => {
    debugger
    setSoliders([...soliders, newSolider]);
    alert('חייל/ת נוסף/ה בהצלחה!');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newSoldier = {
        First_Name: name,
        Mispar_Ishi: id,
        Gender: gender,
    };

    addNewSolider(newSoldier);

    // Clear input fields after submission
    setName('');
    setId('');
    setGender('');
  };

  // Disable submit button until all fields are filled
  const isSubmitDisabled = !name || !id || !gender;

  return (
    <form onSubmit={handleSubmit}>
      <MDBInput
        wrapperClass='mb-4'
        id='First_Name'
        type='text'
        placeholder='שם החייל'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <MDBInput
        wrapperClass='mb-4'
        id='Mispar_Ishi'
        type='number'
        placeholder='מספר אישי'
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <div className='mb-4'>
        <select
        id='Gender'
          className='form-select'
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value=''>בחר מין</option>
          <option value='זכר'>ז</option>
          <option value='נקבה'>נ</option>
        </select>
      </div>
      <MDBBtn type='submit' className='bg-light text-dark' disabled={isSubmitDisabled}>
        הוספה
      </MDBBtn>
    </form>
  );
}
