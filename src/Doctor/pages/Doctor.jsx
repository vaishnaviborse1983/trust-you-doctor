import React from 'react';
//import DoctorComponent from './DoctorComponent';
import FindDoctorSearchBar from './SearchComponent';
import DoctorComp from './DoctorComp';
//import Advertisement from './Advertisement';
import Navbar from '../../Patient/components/pages/Navbar';
import Categories from '../../Patient/components/pages/Categories';
import Fotter from '../../Patient/components/pages/Fotter';

function DoctorList() {
  const handleSearch = (searchParams) => {
    // Implement your search logic based on the searchParams
    console.log('Search Parameters:', searchParams);
    // You can make an API call or perform the search operation here
  };
  return (
    <div>
      <Navbar />
      {/* Use the DoctorComponent here */}
      <FindDoctorSearchBar onSearch={handleSearch} />
      <Categories /> 
      <div>
        <div className='row'>
        <div className='col-8'>
          <DoctorComp />
        </div>
        </div>
        
        <div className='col-4'>
    {/* Right side container with image */}
    <div style={{ width: '25%' }}>
      <img
        src="https://th.bing.com/th/id/OIP.Kq0Jx87q5HLEzjQKYHmbyAHaLH?pid=ImgDet&rs=1"
        alt="Right Side Image"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      </div>
      </div>
    </div>
     
      
      {/* You can also pass props to DoctorComponent if needed */}
      {/* <DoctorComponent someProp="value" /> */}
    </div>
  );
  <Fotter />
}

export default DoctorList;