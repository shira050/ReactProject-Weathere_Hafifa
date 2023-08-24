import React, { useContext, useState } from 'react';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBIcon } from 'mdb-react-ui-kit';
import './css/login.css';
import { doApiLogin } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

function Login() {
    const [userName, setuserName] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { currentUser, updateUser } = useContext(UserContext);

    const nav = useNavigate();
    let user = {
        name: userName,
        password: password
    }

    const validateForm = () => {
        const errors = {};

        // Validate userName
        if (!userName.trim()) {
            errors.userName = 'userName is required';
        } else if (!/^(?=[a-zA-Zא-ת0-9._]{3,8}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(userName)) {
            errors.userName = 'Invalid userName format';
        }

        // Validate password
        if (!password.trim()) {
            errors.password = 'Password is required';
        }

        setErrors(errors);

        return Object.keys(errors).length === 0; // Return true if there are no errors
    };

    const login = async () => {
        const isValid = validateForm();

        if (isValid) {
            
            // Perform login with API call
           let res= await doApiLogin(user);           
           if(res&&res.status==200){
               localStorage.setItem('user', JSON.stringify(user));
               updateUser(res.data);
           alert('Welcome ' + userName);
           nav('/');
           }
           else{
               alert("אחד או יותר מהפרטים שגוי...")
           }
        }
    };

    return (
        <MDBContainer fluid>
            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                <MDBCol col='12'>
                    <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
                        <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
                            <h2 className='fw-bold mb-2 text-uppercase'>Login</h2>
                            <p className='text-white-50 mb-5'>Please enter your name and password!</p>

                            {errors.userName && <div className='text-danger'>{errors.userName}</div>}

                            <MDBInput
                                wrapperClass='mb-4 mx-5 w-100'
                                labelClass='text-white'
                                label='userName '
                                id='formControlLg'
                                type='text'
                                size='lg'
                                value={userName}
                                onChange={(e) => setuserName(e.target.value)}
                                error={errors.userName}
                            />

                            {errors.password && <div className='text-danger'>{errors.password}</div>}

                            <MDBInput
                                wrapperClass='mb-4 mx-5 w-100'
                                labelClass='text-white'
                                label='Password'
                                id='formControlLg'
                                type='password'
                                size='lg'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={errors.password}
                            />

                            <MDBBtn outline className='mx-2 px-5' color='white' size='lg' onClick={login}>
                                Login
                            </MDBBtn>

                            {/* icons for social media */}
                            <div className='d-flex flex-row mt-3 mb-5'>
                                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                                    <MDBIcon fab icon='facebook-f' size='lg' />
                                </MDBBtn>

                                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                                    <MDBIcon fab icon='twitter' size='lg' />
                                </MDBBtn>

                                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                                    <MDBIcon fab icon='google' size='lg' />
                                </MDBBtn>
                            </div>
                            {/* end icons for social media */}

                            <div>
                                <p className='mb-0'>
                                    Don't have an account? <a href='#!' className='text-white-50 fw-bold'>Sign Up</a>
                                </p>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Login;
