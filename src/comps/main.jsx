import React, { useContext, useEffect } from 'react'
import Login from './login'
import Home from './Home'
import { USER } from '../services/apiBasic';
import { doApiLogin } from '../services/apiService';
import { UserContext } from '../context/userContext';

function Main() {
    const { currentUser, updateUser } = useContext(UserContext);
    const getUser = async () => {
        let localUser = JSON.parse(localStorage[USER]);
        let res = await doApiLogin(localUser);
        return res;
    }

    useEffect(() => {
        const fetchData = async () => {
            if (localStorage[USER]) {
                let res = await getUser();
                console.log(res);
                updateUser(res.data);
            }
        };

        fetchData();
    }, []);


   
    return (
        <>
            {currentUser ? (
                <Home></Home>
            ) : (
                <Login></Login>
            )}
        </>
    );
}

export default Main;
