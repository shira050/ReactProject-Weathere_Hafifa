import React, { useContext, useState } from 'react';
import { Button, Card, Input } from 'antd';
import './css/login.css'; 
import {  loginToSystem } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { currentUser, setCurrentUser } = useContext(UserContext);

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

        return Object.keys(errors).length === 0;
    };

    const login = async () => {
        const isValid = validateForm();

        if (isValid) {

            let res = await loginToSystem(user);
            if (res && res.status === 200) {
                localStorage.setItem('user', JSON.stringify(user));
                setCurrentUser(res.data);
                alert('Welcome ' + userName);
                nav('/');
            }
            else if (!res) {
                alert("יש לנו שגיאה בשרת נסה מאוחר יותר....")
            }
            else {
                alert("אחד או יותר מהפרטים שגוי...")
            }
        }
    }


    return (
        <div className="login-container">
            <Card className="login-card">
                <div className="login-card-content">
                    <h2 className="login-header">הירשם</h2>
                    <p className="login-subheader">הכנס שם משתמש ומספר אישי</p>

                    <Input
                        className="mb-5"
                        placeholder="שם משתמש"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    {errors.userName && <div className="error-message">{errors.userName}</div>}

                    <Input.Password
                        className="mb-5"
                        placeholder="מספר אישי"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <div className="error-message">{errors.password}</div>}

                    <Button type="primary" size="large" onClick={login} style={{ width: '100px', alignSelf: 'center' }}>
                        הירשם
                    </Button>

                </div>
            </Card>
        </div>
    );
    }

    export default Login;

