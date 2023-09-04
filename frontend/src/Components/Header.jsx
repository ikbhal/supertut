import React from 'react'
import '../Styles/header.css'

const Header = () => {
  return (
    <div className='header-container'>
      <h2>superTut</h2>
      <div className="right-nav">
        <button className='btn-class'>Tutor LogIn</button>
        <button className='btn-class'>Student LogIn</button>
      </div>

    </div>
  )
}

export default Header