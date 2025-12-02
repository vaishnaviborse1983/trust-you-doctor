import React from 'react'
import Navbar from './Navbar'
import Footer from '../../../Footer/Footer';
import mainslide5 from '../image/mainslideimage5.jpeg';
const WorkExperience = () => {
  return (
   <>   
   <Navbar />
    <div className='container'>
        <img  src={mainslide5} className='img-fluid'/>
    </div>
   <Footer />
   </>
  )
}

export default WorkExperience