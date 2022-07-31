import React from 'react'

const NavLayout = ({children}) => {
  return (
    <div>
        <header className='header'>
          <div className="logo">
            <img src="./assets/interview.png" alt="logo" className='logo-img' />
            <div className="logo-title">
            get interview ready
            </div>
          </div>
        </header>


        {children}
        
        <footer
        style={{
          position: "fixed",
          bottom: "0",
          width: "100%",
          textAlign: "center",
          boxShadow: "var(--bs-gray)",
          borderTop: "1px solid #F1F5F9",
          background: "white"
        }}
        className="landing-footer"
      >
        <div className="flex flex-center">
          <img src="./assets/hashnode.png" alt="" />
          <div className="m-md">X</div>
          <img src="./assets/planetscale.jpg" alt="" />
        </div>
      </footer>
    </div>
  )
}

export default NavLayout