
import React from 'react'
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify }
  from 'react-icons/bs'

function Header({ OpenSidebar }) {
  return (
    <header className='header'>
      <div className='menu-icon'>
        <BsJustify className='icon' onClick={OpenSidebar} />
      </div>
      <div className='header-left'>
        {/* <BsSearch  className='icon'/> */}
      </div>
      <div className='header-right'>
        {/* <BsFillBellFill className='icon'/>
            <BsFillEnvelopeFill className='icon'/> */}
        <div className='d-flex justify-content-center align-items-center'>
          <BsPersonCircle className='icon' />
          <h6>Akanksha Machcha</h6>
        </div>
      </div>
    </header>
  )
}

export default Header