import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import '../css/header.css'
import { UserContext } from '../../context/userContext';

export default function Haeder() {
  const { currentUser } = useContext(UserContext);

  return (
    <nav dir="rtl" class="bg-dark p-2">
      <div class="container-fluid">
        <Link class="navLink" to='/'>ראשי</Link>
       {currentUser&& <Link class="navLink" to='/mador'>מדור</Link>}
      </div>
    </nav>
  )
}
