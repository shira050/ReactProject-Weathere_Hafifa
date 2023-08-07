import React from 'react'
import { Link } from 'react-router-dom'
import '../comps/css/header.css' 

export default function Haeder() {
  return (
    <nav class=" d-flex justify-content-around bg-dark">
      <div class="container-fluid p-3">
        <Link class="navLink" to='/'>ראשי</Link> 
        <Link class="navLink" to='/history'>היסטוריה</Link>
      </div>
    </nav>
  )
}
