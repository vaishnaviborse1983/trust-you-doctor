import React from 'react'
import '../css/Navbar.css';
const Marquee = () => {
  return (
    <div className="alert-text marquee-container">
      
        <marquee style={{ color: "white" }} scrollamount="7">
          India's healthcare industry has been growing at a Compound Annual Growth Rate of around 22% since 2016, EMR,EHR standards to be adopted by empaneled Hospitals, as notifies by MOHFW; The Cabinet, in its meeting held on 26.04.2023, approved the proposal for establishment of 157 new nursing colleges in the country; India’s progress on Childhood Pneumonia was presented by the Indian delegation at 2nd Global Forum on Childhood Pneumonia on 26-27th April, 2023 at Madrid, Spain.

        </marquee>
    
    </div>
  )
}

export default Marquee
