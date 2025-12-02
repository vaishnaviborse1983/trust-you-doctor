import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { ref, get, onValue } from 'firebase/database';
import 'firebase/database';
import { db } from './firebase';  
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";


const FindDoctorSearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [selectedSpeciality, setSelectedSpeciality] = useState(null);
  const [value, setValue] = useState(null);
  const [doctors, setDoctor] = useState([]);

  const fetchDataFromFirebase = async (doctor) => {
    try {
      const dataRef = ref(db, 'doctor/'); 
      onValue(dataRef, (snapshot) => {
        const data = snapshot.val();
        const doctorList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        console.log('Fetched Doctors:', doctorList);
        setDoctor(doctorList);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data using onValue
        const fetchDoctor = ref(db, 'doctor/');
        onValue(fetchDoctor, (snapshot) => {
          const data = snapshot.val();
          const doctorList = Object.keys(data).map((key) => ({id: key, ...data[key],
          }));

          const filteredDoctor = selectedSpeciality
          ? doctorList.filter((doctor) => doctor.Speciality === selectedSpeciality)
          : doctorList;

        console.log('Fetched Doctors:', filteredDoctor);
        setDoctor(filteredDoctor);
      });
    } catch (error) {
      console.error('Error fetching Doctors:', error);
    }
  };
    fetchData();
  }, [selectedSpeciality]); 

  const Speciality = () => {
    return (
      <div>
        {value ? (
         
          doctors.map((doctor) => {
            console.log('Doctor Object:', doctor); 
            return (
              <div key={doctor.id}>
                <h3>{doctor.Name}</h3>
                <p>{doctor.Speciality}</p>
                <p>{doctor.Address}</p>
              
              </div>
                );
              })
              ) : (
         
          <h1>Select a specialty to fetch data</h1>
        )}
      </div>
    );
  };

  const handleSearch = async () => {
    try {
  
      const selectedSpecialities = value ? value.map(doctor => doctor.value) : null;
      console.log('Selected Option Values:', selectedSpecialities);
  
      if (selectedSpecialities) {
        const snapshot = await ref(db, 'doctor/');
        const data = (await get(snapshot)).val();
        //console.log('Fetched Data:', data);
  
        if (data) {
          const doctorList = Object.keys(data).map(key => ({ id: key, ...data[key] }));
  
      
          const filteredDoctors = doctorList.filter(
            doctor => selectedSpecialities.includes(doctor.Speciality)
          );
          
           if (onSearch) {
            console.log('Data to be passed:', filteredDoctors);
            onSearch(filteredDoctors);
          }
        } else {
          console.warn('No doctors found in the database');
        }
      } else {
        console.warn('No options selected');
      }
    } catch (error) {
      console.error('Error fetching data from Firebase:', error);
    }
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div
      style={{
        backgroundImage: `url(https://media.istockphoto.com/photos/stethoscope-on-the-table-picture-id894125638?k=6&m=894125638&s=612x612&w=0&h=fNBGWtaIgsozReq8U9g-qFpty0KyT79oWfo-_aYapoM=)`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        height: '65vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'relative', 
      }}
    >
      <h1 style={{ color: '#FFFFFF', zIndex: 1 }}>Find the Best Doctors !!</h1>
      <div style={{ width: '80%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <label style={{ color: '#FFFFFF', marginRight: '10px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          Location:
          <select 
            value={location} 
            onChange={handleLocationChange} 
            style={{ 
              marginLeft: '5px', 
              width: '100%', 
              margin: '0', 
              padding: '10px',
              borderRadius: '5px',  
              fontSize: '16px', 
            }}
          >
            <option value="">Select Location</option>
            <option value="location1">Pune</option>
            <option value="location2">Mumbai</option>
            <option value="location3">Bangalore</option>
            <option value="location4">Hyderabad</option>
            <option value="location5">Chennai</option>
            <option value="location6">Nashik</option>
            <option value="location7">Kolhapur</option>
            <option value="location8">Akola</option>
            <option value="location9">Bhusawal</option>
        
          </select>
        </label>
        <label style={{ color: '#FFFFFF', marginRight: '10px', width: '100%', margin: '0', padding: '10px' }}>
          Search:
          <Select
              options={[
                { value: 'Cardiologist', label: 'Cardiologist' },
                { value: 'Neurologoist', label: 'Neurologist' },
                { value: 'Gastroenterologist', label: 'Gastroenterologist' },
                { value: 'Orthopedician', label: 'Orthopedician' },
                { value: 'Gynecologist', label: 'Gynecologist' },
                { value: 'Dermatalogist', label: 'Dermatalogist' },
                { value: 'Ophthalmology', label: 'Ophthalmology' },
                { value: 'Pediatrician', label: 'Pediatrician' },
                { value: 'Endocrinologist', label: 'Endocrinologist' },
                { value: 'Oncologist', label: 'Oncologist' },
                { value: 'Urologist', label: 'Urologist' },
                { value: 'Nephrologist', label: 'Nephrologist' },
                { value: 'Pulmonologist', label: 'Pulmonologist' },
                { value: 'Rheumatalogist', label: 'Rheumatalogist' },
                { value: 'Neurosurgeon', label: 'Neurosurgeon' },
                { value: 'Radiologist', label: 'Radiologist' },
                { value: 'Neonatologist', label: 'Neonatologist' },
                { value: 'Plastic Surgeon', label: 'Plastic Surgeon' },
                { value: 'Vascular Surgeon', label: 'Vascular Surgeon' },
                { value: 'Psychiatrist', label: 'Psychiatrist' },
                { value: 'Dentist', label: 'Dentist' },
                { value: 'Ayurveda', label: 'Ayurveda' },
                { value: 'Homeopathy', label: 'Homeopathy' },
                { value: 'Physiotherapist', label: 'Physiotherapist' },
                { value: 'Other', label: 'Other' },
                { value: 'Sexology', label: 'Sexology' },
                { value: 'Veterinary / Pet Dr.', label: 'Veterinary / Pet Dr.' },

              ]}
              value={value}
              onChange={(selectedOption) =>
                {
                  console.log('Selected Option:', selectedOption);
                  setValue(selectedOption);
                } }
              isMulti
              isSearchable
              noOptionsMessage={() => 'Not found'}
              isDisabled={false}
              styles={{
                control: (provided) => ({
                  ...provided,
                  width: '900px',
                  fontSize: '20px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  padding: '5px',
                  margin: '0',
                  color: '#fff',
                  border: '1px solid #ccc',
                }),
                option: (provided) => ({
                  ...provided,
                  color: 'black',
                }),
              }}
            />
          </label>

        <a href="/doctor" style={{ textDecoration: 'none' }}>
        <button
          onClick={handleSearch}
          style={{
            backgroundColor: '#126ca8',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            padding: '10px',
            fontSize: '16px',
            cursor: 'pointer',
            marginLeft: '5px', 
          }}
        >
          Search
        </button>
        </a>
      </div>
    </div>
  );
};

export default withRouter(FindDoctorSearchBar);
