import React from 'react'
import { Link } from 'react-router-dom'

export default function Haeder() {
  return (
    <nav dir="rtl" class=" navbar bg-dark">
      <div class="container-fluid">
        <Link class="navbar-brand text-light" to='/'>ראשי</Link>
      </div>
    </nav>
  )
}
