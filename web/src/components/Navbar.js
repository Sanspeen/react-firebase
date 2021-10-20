import React from 'react'
import { Link } from 'react-router-dom'
import icon from '../media/icon.png'

export const PublicNavbar = () => (
  <nav>
    <img src = {icon} className = "icon"/>

    <section>
      <Link to="/">Home</Link>
      <Link to="/questions">Questions</Link>
    </section>
  </nav>
)

export const PrivateNavbar = () => (
  <nav>
    <img src = {icon} className = "icon"/>
    <section>
      <Link to="/">Home</Link>
      <Link to="/questions">Questions</Link>
      <Link to="/new">New</Link>
      <Link to="/list">List</Link>
    </section>
  </nav>
)
