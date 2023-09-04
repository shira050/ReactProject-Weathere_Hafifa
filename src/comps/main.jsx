import React, { useContext, useEffect } from 'react'
import Login from './login'
import { USER } from '../services/apiBasic';
import {  loginToSystem } from '../services/apiService';
import { UserContext } from '../context/userContext';
import Home from './weathere/Home';

function Main() {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    let localUser;

    const getUser = async () => {
        if (localStorage[USER]) {
            localUser = JSON.parse(localStorage[USER]);
        }
        let res = await  loginToSystem(localUser);
        return res;
    }

    useEffect(() => {
        const fetchData = async () => {
            if (localStorage[USER]) {
                let res = await getUser();
               await res && setCurrentUser(res.data);
            }
        };

        fetchData();
    }, []);



    return (
        <>
            {localStorage[USER] ? (
                <Home></Home>
            ) : (
                <Login></Login>
            )}
        </>
    );
}

export default Main;
