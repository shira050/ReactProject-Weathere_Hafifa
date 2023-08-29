import React, { useContext, useEffect } from 'react'
import Login from './login'
import { USER } from '../services/apiBasic';
import { doApiLogin } from '../services/apiService';
import { UserContext } from '../context/userContext';
import Home from './weathere/Home';

function Main() {
    const { currentUser, updateUser } = useContext(UserContext);
    let localUser;

    const getUser = async () => {
        debugger
        if (localStorage[USER]) {
            localUser = JSON.parse(localStorage[USER]);
        }
        let res = await doApiLogin(localUser);
        return res;
    }

    useEffect(() => {
        const fetchData = async () => {
            if (localStorage[USER]) {
                let res = await getUser();
               await res && updateUser(res.data);
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
