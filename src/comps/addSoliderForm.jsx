import React, { useState, useContext } from 'react';
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { UserContext } from '../context/userContext';

export default function AddSoliderForm() {
  const { soliders, updateSoliders } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: '',
    userName: '',
    id: '',
    gender: '',
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name || !formData.userName || !formData.id || !formData.gender) {
      alert('Please fill in all fields.');
      return;
    }

    const newSoldier = {
      ...formData,
      Mispar_Ishi: generateMisparIshi(), // Generate a unique ID
      First_Name: 'יותם', // Static value
      Last_Name: 'גבריאל', // Static value
      Role: 'קפ"ט', // Static value
      Rank: 'סרן', // Static value
      City: 'רמת גן', // Static value
      City_Location: 'מרכז', // Static value
      Is_Officer: true, // Static value
      Age: 28, // Static value
    };

    updateSoliders([...soliders, newSoldier]);
    alert('חייל/ת נוסף/ה בהצלחה!');

    // Clear input fields after submission
    setFormData({
      name: '',
      userName: '',
      id: '',
      gender: '',
    });
  };

  // Generate a unique Mispar_Ishi (you can implement your own logic)
  const generateMisparIshi = () => {
    // Implement your own logic to generate a unique ID
    return Math.floor(Math.random() * 10000000).toString();
  };

  return (
    <form onSubmit={handleSubmit}>
      <MDBInput
        wrapperClass='mb-4'
        id='name_solider'
        type='text'
        placeholder='שם החייל'
        value={formData.name}
        onChange={(e) => handleInputChange('name', e.target.value)}
      />
      <MDBInput
        wrapperClass='mb-4'
        id='user_name'
        type='text'
        placeholder='שם משתמש'
        value={formData.userName}
        onChange={(e) => handleInputChange('userName', e.target.value)}
      />
      <MDBInput
        wrapperClass='mb-4'
        id='id_solider'
        type='text' // Change the input type to 'text'
        placeholder='מספר אישי'
        value={formData.id}
        onChange={(e) => handleInputChange('id', e.target.value)}
      />
      <div className='mb-4'>
        <select
          className='form-select'
          value={formData.gender}
          onChange={(e) => handleInputChange('gender', e.target.value)}
        >
          <option value=''>בחר מין</option>
          <option value='ז'>ז</option>
          <option value='נ'>נ</option>
        </select>
      </div>
      <MDBBtn type='submit' className='bg-light text-dark '>
        הוספה
      </MDBBtn>
    </form>
  );
}
