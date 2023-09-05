import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/header.css';
import { USER } from '../services/apiBasic';
import { UserContext } from '../context/userContext';
import { CityContext } from '../context/cityContext';

export default function Header() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { historySearch} = useContext(CityContext);


  let localUser;
  const nav = useNavigate();
  if (localStorage[USER]) {
    localUser = JSON.parse(localStorage[USER]);
  }
  const onLogOut = () => {
    if (window.confirm('האם אתה בטוח שברצונך להתנתק?')) {
      localStorage.removeItem(USER);
      setCurrentUser(null)
      nav('/');
    }
  };

  return (
    <nav className=" navSticky bg-dark p-2 container-fluid">
      <div className="container d-flex justify-content-between"> 
        <div className="text-start">
          <Link className="navLink" to="/">
            ראשי
          </Link>
          {localUser && (

            <>
              <Link className="navLink" to="/mador">
                מדור
              </Link>
              <Link class="navLink" to='/history'>היסטוריה-{historySearch.length}</Link>

            </>
          )}
        </div>
        <div className="text-end">
          {localUser && (
            <Link
              className="navLink"
              onClick={() => onLogOut()}
              to="/"
            >
              התנתקות
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
