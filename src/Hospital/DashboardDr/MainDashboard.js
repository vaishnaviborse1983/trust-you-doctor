import React from 'react'
import '../css/maindashboard.css';
import { useState } from 'react'
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home';

const MainDashboard = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (

    <div>
      <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <Home />
      </div>
    </div>
  )
}

export default MainDashboard