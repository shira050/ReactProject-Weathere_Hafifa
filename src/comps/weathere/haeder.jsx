import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import '../css/header.css'
import { USER } from '../../services/apiBasic';

export default function Haeder() {
  let localUser;
  if(localStorage[USER]){
    localUser= JSON.parse(localStorage[USER]);
}
  return (
    <nav dir="rtl" class="bg-dark p-2">
      <div class="container-fluid">
        <Link class="navLink" to='/'>ראשי</Link>
       {localUser&& <Link class="navLink" to='/mador'>מדור</Link>}
      </div>
    </nav>
  )
}
