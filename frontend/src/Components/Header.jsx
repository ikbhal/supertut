import React from 'react'
import '../Styles/header.css'
import {FaBars} from 'react-icons/fa'

const Header = () => {
  return (
    <div className='header-container'>
      <h2>superTut</h2>
      <div className="right-nav">
        <button className='btn-class'>Tutor LogIn</button>
        <button className='btn-class'>Student LogIn</button>
      </div>
        <FaBars className='bars' />
    </div>
  )
}

export default Header