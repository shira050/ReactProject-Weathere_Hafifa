import React, { useState, useContext } from 'react';
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { UserContext } from '../context/userContext';

export default function AddSoliderForm(props) {
  const { soliders, updateSoliders } = useContext(UserContext);
  const [newSolider, setNewSolider] = useState({
    Mispar_Ishi: '',
    User_Name: '',
    First_Name: '',
    Last_Name: ' ',
    Gender: '',
    Role: 'קפ"ט',
    Rank: 'סרן',
    City: 'רמת גן',
    City_Location: 'מרכז',
    Is_Officer: true,
    Age: 19,

  });
  const [errorSolider, setErrorSolider] = useState({
    Mispar_Ishi: '',
    User_Name: '',
    First_Name: '',
    Last_Name: ' ',
    Gender: '',
  });

  const handleInputChange = (field, value) => {
    setNewSolider({ ...newSolider, [field]: value });
  };
  const validInputChange = (field,field_value, validation,error) => {
    let isValid=validation.test(field_value);
    if(isValid){
      setErrorSolider({ ...errorSolider, [field]:''});
    }
    else{
      setErrorSolider({ ...errorSolider, [field]:error});
    }
    handleInputChange(field, field_value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!newSolider.First_Name || !newSolider.User_Name || !newSolider.Mispar_Ishi || !newSolider.Gender) {
      alert('Please fill in all fields.');
      return;
    }

    updateSoliders([...soliders, newSolider]);
    props.changeIsUpdated(true);
    alert('חייל/ת נוסף/ה בהצלחה!');

    setNewSolider({
      Mispar_Ishi: '',
      User_Name: '',
      First_Name: '',
      Last_Name: ' ',
      Gender: '',
      Role: 'קפ"ט',
      Rank: 'סרן',
      City: 'רמת גן',
      City_Location: 'מרכז',
      Is_Officer: true,
      Age: 19,
    });
  };
console.log(errorSolider);
  return (
    <form onSubmit={handleSubmit}>
      <MDBInput
        wrapperClass='mb-4'
        id='name_solider'
        type='text'
        placeholder='שם החייל'
        value={newSolider.First_Name}
        onChange={(e) => 
          validInputChange(
            'First_Name',
            e.target.value,
            /^(?=[a-zA-Zא-ת0-9._]{3,8}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
            'שם אינו תקין'
          )
        }
      />
      <p className='text-danger'>{errorSolider.First_Name}</p>
      <MDBInput
        wrapperClass='mb-4'
        id='user_name'
        type='text'
        placeholder='שם משתמש'
        value={newSolider.User_Name}
        onChange={(e) => 
          validInputChange(
            'User_Name',
            e.target.value,
            /^[a-zA-Zא-ת]+$/,
            'שם משתמש יכיל אותיות בלבד'
          )
        }
      />
      <p className='text-danger'>{errorSolider.User_Name}</p>
      <MDBInput
        wrapperClass='mb-4'
        id='id_solider'
        type='text'
        placeholder='מספר אישי'
        value={newSolider.Mispar_Ishi}
        onChange={(e) =>
          validInputChange(
            'Mispar_Ishi',
            e.target.value,
            /^\d{9}$/,
            'מספר אישי חייב להיות באורך 9 ספרות'
          )
        }
      />
      <p className='text-danger'>{errorSolider.Mispar_Ishi}</p>
      <div className='mb-4'>
        <select
          className='form-select'
          value={newSolider.Gender}
          onChange={(e) => handleInputChange('Gender', e.target.value)}
        >
          <option value=''>בחר מין</option>
          <option value='ז'>ז</option>
          <option value='נ'>נ</option>
        </select>
      </div>
      
        <MDBBtn type='submit' className='bg-light text-dark '
        disabled={errorSolider.First_Name.length>0  || errorSolider.Mispar_Ishi.length>0 || errorSolider.User_Name.length>0||(!newSolider.First_Name || !newSolider.User_Name || !newSolider.Mispar_Ishi || !newSolider.Gender)}
        >
          הוספה
        </MDBBtn>
    </form>
  );
}
