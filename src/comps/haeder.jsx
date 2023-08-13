import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import '../comps/css/header.css' 
import { CityContext } from '../context/cityContext';

export default function Haeder() {
  const { historySearch} = useContext(CityContext);

  return (
    <nav class=" d-flex justify-content-around bg-dark">
      <div class="container-fluid p-3">
        <Link class="navLink" to='/'>ראשי</Link> 
        <Link class="navLink" to='/history'>היסטוריה-{historySearch.length}</Link>
      </div>
    </nav>
  )
}
