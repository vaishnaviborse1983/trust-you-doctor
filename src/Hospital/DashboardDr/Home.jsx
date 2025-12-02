import React from 'react'
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill }
  from 'react-icons/bs'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import {  useParams } from "react-router-dom";


function Home() {
const { id } = useParams();

  const [user,setUser] =  useState({
    Name:'',
    Discription:'',
    Qualification :'',
    Speciality :'',
    ClinicName:'',
    ClinicAddress:''
  })

  const data = (e) => {
    const { value, name } = e.target;
    setUser(() => {
      return {
        ...user,
        [name]: value
      };
    });
  }
  return (
    <main className='main-container' style={{ color: 'black' }}>
      <h1>Edit Profile</h1>
      <div className=' container-sm w-75 mx-auto row'>
        <Form>
          <div className='row' style={{marginTop:'5vh'}}>

            <div className='col-6'>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={user.Name} placeholder="Name" />
              </Form.Group>
            </div>
            <div className='col-6'>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Discription</Form.Label>
                <Form.Control type="text" value={user.Discription} placeholder="Discription" />
              </Form.Group>
            </div>

          </div>
         
          <div className='row'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Qualification</Form.Label>
              <Form.Control type="text" value={user.Qualification} placeholder="qualification" />
            </Form.Group>
          </div>
          <div className='row'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Speciality</Form.Label>
              <Form.Control type="text" value={user.Speciality} placeholder="Speciality" />
            </Form.Group>
          </div>

          <div className='row'>
            <div className='col-6'>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Clinic Name</Form.Label>
                <Form.Control type="text" value={user.ClinicName} placeholder="Clinic Name" />
              </Form.Group>
            </div>
            <div className='col-6'>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Clinic Address</Form.Label>
                <Form.Control type="text" value={user.ClinicAddress} placeholder="Clinic address" />
              </Form.Group>
            </div>
          

          </div>
          <div>
            <button className='btn btn-primary'>Edit Profile</button>
          </div>


        </Form>
      </div>


    </main>
  )
}

export default Home