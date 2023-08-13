import React, { useState, useContext } from 'react';
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { UserContext } from '../context/userContext';

export default function AddSoliderForm() {
  const { soliders, setSoliders } = useContext(UserContext);
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [gender, setGender] = useState('');

  const addNewSolider = (newSolider) => {
    setSoliders([...soliders, newSolider]);
    alert('חייל/ת נוסף/ה בהצלחה!');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newSoldier = {
      name: name,
      id: id,
      gender: gender,
    };

    addNewSolider(newSoldier);

    // Clear input fields after submission
    setName('');
    setId('');
    setGender('');
  };

  // Disable submit button until all fields are filled
  const isSubmitDisabled = !name || !id || !gender;

  const handleIdChange = (e) => {
    // Allow only numbers
    const inputValue = e.target.value.replace(/\D/g, '');
    setId(inputValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <MDBInput
        wrapperClass='mb-4'
        id='name_solider'
        type='text'
        placeholder='שם החייל'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <MDBInput
        wrapperClass='mb-4'
        id='id_solider'
        type='text' // Change the input type to 'text'
        placeholder='מספר אישי'
        value={id}
        onChange={handleIdChange} // Use the custom handler for ID input
      />
      <div className='mb-4'>
        <select
          className='form-select'
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value=''>בחר מין</option>
          <option value='ז'>ז</option>
          <option value='נ'>נ</option>
        </select>
      </div>
      <MDBBtn type='submit' className='bg-light text-dark ' disabled={isSubmitDisabled}>
        הוספה
      </MDBBtn>
    </form>
  );
}
