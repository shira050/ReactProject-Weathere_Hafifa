import React from 'react'
import { Link } from 'react-router-dom'
import './css/header.css'

export default function Haeder() {
  return (
    <nav dir="rtl" class="bg-dark p-2">
      <div class="container-fluid">
        <Link class="navLink" to='/'>ראשי</Link>
        <Link class="navLink" to='/mador'>מדור</Link>
      </div>
    </nav>
  )
}
