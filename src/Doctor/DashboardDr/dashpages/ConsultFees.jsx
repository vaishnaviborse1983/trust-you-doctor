import * as React from 'react';
import Box from '@mui/material/Box';
import { toast, Toaster } from 'react-hot-toast';
import { styled } from '@mui/material/styles';
import SideNav from '../SideNav';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { auth, app, storage, database, putData } from '../../Firebase/firebase.config';
import { ref as ref_storage, uploadBytes, uploadBytesResumable, getDownloadURL } from 'firebase/storage';


const ConsultFees = () => {
  const { id } = useParams();
  const [image, setIamge] = useState('');
  const [url, setUrl] = useState('')


  const handleImageSubmit = () => {
    const imgRef = ref_storage(storage, `QR/consult/${id}/ConsultFees`);
    const uploadTask = uploadBytesResumable(imgRef, image);
    //Handle the promise returned by uploadBytesResumable
    uploadTask
      .then((snapshot) => {
        console.log('Upload complete', snapshot);

        // Use snapshot.ref instead of data.ref_storage
        getDownloadURL(snapshot.ref).then((url) => {
          setUrl(url);
          console.log('Download URL:', url);
          alert("Data uploaded succesfully, Please refresh the page")
          putData(`QR/consult/${id}/ConsultFees`, { url: url })
        });
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
    toast.success("QR code stored successfully..!");

  }
  useEffect(()=>{
    console.log('Consultant',id)
  },[id])

  return (
    <>
      <Box sx={{ display: 'flex' }} style={{ width: '90vw' }}>
        <SideNav id={id} />
        <div style={{ marginTop: '10vh' }}>
          <div>
            <Form>
              <Form.Group className="mb-3">
                <h5><Form.Label className='label' style={{ color: '#135078' }}>Upload your QR code to collect Consultant Fees from patients</Form.Label></h5>
                <Form.Control className='pControl' type="file" name="QR" onChange={(e) => setIamge(e.target.files[0])} />
              </Form.Group>

              <Form.Group className="mb-3">
                <button type='submit' onClick={handleImageSubmit} className='btn btn-primary mt-4' style={{ padding: '1vh', paddingLeft: '4vh', paddingRight: '4vh' }}>Submit</button>
              </Form.Group>
            </Form>
          </div>
        </div>
      </Box>
    </>
  )
}

export default ConsultFees
