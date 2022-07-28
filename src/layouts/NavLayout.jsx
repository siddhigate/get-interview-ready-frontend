import React from 'react'

const NavLayout = ({children}) => {
  return (
    <div>
        <header className='header'>
          <div className="logo">
            <img src="./assets/logo.png" alt="logo" className='logo-img' />
            <div className="logo-title">
            get interview ready
            </div>
          </div>
        </header>


        {children}
    </div>
  )
}

export default NavLayout