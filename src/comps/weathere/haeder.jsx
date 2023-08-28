import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/header.css';
import { USER } from '../../services/apiBasic';
import { UserContext } from '../../context/userContext';

export default function Header() {
  const { currentUser, updateUser } = useContext(UserContext);

  let localUser;
  const nav = useNavigate();
  if (localStorage[USER]) {
    localUser = JSON.parse(localStorage[USER]);
  }
  const onLogOut = () => {
    if (window.confirm('האם אתה בטוח שברצונך להתנתק?')) {
      localStorage.removeItem(USER);
      updateUser(null)
      nav('/');
    }
  };

  return (
    <nav className="bg-dark p-2 container-fluid">
      <div className="container d-flex justify-content-between"> {/* Use justify-content-between here */}
        <div className="text-start">
          <Link className="navLink" to="/">
            ראשי
          </Link>
          {localUser && (
            <Link className="navLink" to="/mador">
              מדור
            </Link>
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
