import * as React from 'react';
import Box from '@mui/material/Box';
import { toast, Toaster } from 'react-hot-toast';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Form from 'react-bootstrap/Form';
import SideNav from '../SideNav';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { auth, app, storage, database, putData } from '../../Firebase/firebase.config';
import { getDatabase, ref, get, push, set, onValue } from 'firebase/database';
import { ref as ref_storage, uploadBytes, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { update } from 'firebase/database';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Payment = () => {
  const { id } = useParams();
  const [user, setUser] = useState();
  const [feesList, setFeesList] = useState([]);
  const [image, setIamge] = useState('');
  const [url, setUrl] = useState('')
  const [urlDecsription, setDescriptionTxt] = useState()
  const [ChatConsultantFees, setChatConsultantFees] = useState('')
  const [fee, setFee] = useState({
    Symptom: '',
    Fees: '',
  });
  const history = useHistory();

  const handleDelete = async (feeId) => {
    try {
      const databaseRef = ref(database, `doctor/${id}/fees/${feeId}`);

      // Remove the fee from the database
      await set(databaseRef, null);

      // Update the feesList state immediately
      setFeesList((prevFeesList) => prevFeesList.filter((fee) => fee.id !== feeId));

      toast.success('Fees Deleted Successfully..!');
    } catch (error) {
      console.error('Error deleting fee:', error);
    }
  };


  const handleImageSubmit = () => {
    const imgRef = ref_storage(storage, `QR/${id}`);
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
          putData(`QR/${id}`, { url: url })
        });
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
    toast.success("QR code stored successfully..!");

  }


  useEffect(() => {
    // Fetch existing data from Firebase on component mount
    const fetchData = async () => {
      try {
        if (id) {
          const databaseRef = getDatabase(app);

          // Use the ref function on the database reference
          const snapshot = await get(ref(databaseRef, `doctor/${id}`));
          const fetchedData = snapshot.val();

          if (fetchedData) {
            setUser(fetchedData);
            // console.log(fetchedData);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const databaseRef = ref(database, `doctor/${id}/fees`);

          const snapshot = await get(databaseRef);
          const feesData = snapshot.val();

          if (feesData) {
            // Convert feesData object to an array for easier rendering
            const feesArray = Object.entries(feesData).map(([key, value]) => ({
              id: key,
              ...value,
            }));

            setFeesList(feesArray);
          }
        }
      } catch (error) {
        console.error('Error fetching fees data:', error);
      }
    };

    fetchData();
  }, [id]);

  const data = (e) => {
    const { value, name } = e.target;
    setFee((prevFormValues) => {
      return {
        ...prevFormValues,
        [name]: value,
      };
    });
  };
  useEffect(() => {
    onValue(ref(database, `QR/${id}`), (snapshot) => {
      if (snapshot.exists()) {
        setDescriptionTxt(snapshot.val().url);
        console.log(snapshot.val().url);
      } else {
        // Handle the case when the data doesn't exist
        console.error(`Data for description does not exist.`);
      }
    });
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const databaseRef = ref(database, `doctor/${id}/fees`);

      // Use push to add a new entry to the array
      const newFeeRef = push(databaseRef);

      // Set the new entry's data
      await set(newFeeRef, fee);

      // Update the feesList state immediately
      setFeesList((prevFeesList) => [...prevFeesList, { id: newFeeRef.key, ...fee }]);

      toast.success('Fees and Description Updated Successfully..!');
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleChatSubmit = () => {
    const reference = ref(getDatabase(app), `doctor/${id}`); // Replace with your actual path
    update(reference, {
      ChatConsultantFees: ChatConsultantFees,
    })
      .then(() => {
        toast.success('Amount Successfully stored');
      })
      .catch((error) => {
        toast.error('Error updating Amount:', error);
      });
  };

  const handleNext = () => {
    history.push(`/Article/${id}`)
  }
  return (
    <>
      <Box sx={{ display: 'flex' }} style={{ width: '90vw' }}>
        <SideNav id={id} />

        <div>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <div className="" style={{ width: '90vw' }}>
              <Toaster toastOptions={{ duration: 4000 }} />
              <h1>Payment Details</h1>
              <div style={{ boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px' }}>
                {/* Upload QR Code Section */}
                <div className='container-xxl p-2'>
                  <div>Upload your QR code to collect Fees from patients</div>
                  <div className='col-12 col-md-12' >
                    <Form.Group className="mb-2 mt-3 d-flex align-items-center my-auto">

                      <Form.Control className='pControl w-md-25 w-sm-50' style={{ width: '50%' }} type="file" name="QR" onChange={(e) => setIamge(e.target.files[0])} />
                      <button type='submit' onClick={handleImageSubmit} className='btn btn-primary' style={{ marginLeft: '3rem', padding: '0.8rem' }} >Save</button>
                    </Form.Group>
                  </div>

                </div>
                <hr />

                <div className='col-12 col-md-4 p-3'>
                  <div>Add Consultancy Fees to chat with patients</div>
                  <Form.Group className="mb-3 d-flex justify-content-center align-items-center mt-3">

                    <Form.Control
                      className='pControl'
                      type="text"
                      name="ChatConsultantFees"
                      onChange={(e) => { setChatConsultantFees(e.target.value) }}
                      placeholder='Add amount'
                    />
                    <button type='submit' onClick={handleChatSubmit} className='btn btn-primary' style={{ marginLeft: '3rem', padding: '0.8rem' }} >Save</button>
                  </Form.Group>
                </div>

                <hr />
                {/* Symptoms and Fees Form */}
                <Form onSubmit={handleSubmit} className='container-xxl mt-4'>
                  <div className="row">
                    <div className='col-12'>
                      <div style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#333' }}>
                        You can add multiple symptoms and fees.
                      </div>
                    </div>
                    <div className='col-12 col-md-4'>
                      <Form.Group className="mb-3">
                        <h5><Form.Label className='label' style={{ color: '#126ca8' }}>Type Symptoms</Form.Label></h5>
                        <Form.Control className='pControl' type="text" name="Symptom" onChange={data} placeholder="Fever, Cough,...etc" />
                      </Form.Group>
                    </div>
                    <div className='col-12 col-md-4'>
                      <Form.Group className="mb-3">
                        <h6><Form.Label className='label' style={{ color: '#126ca8' }}>Enter Fees here According to Symptoms</Form.Label></h6>
                        <Form.Control className='pControl' type="text" name="Fees" onChange={data} placeholder="" />
                      </Form.Group>
                    </div>



                    <div className='col-12 col-md-4'>
                      <Form.Group className="mb-3">
                        <h6><Form.Label className='label' style={{ color: '#126ca8' }}></Form.Label></h6>
                        <button type='submit' className='btn btn-primary' style={{ padding: '1.8vh', paddingLeft: '4vh', paddingRight: '4vh', marginTop: '0.5rem' }}>Save</button>
                      </Form.Group>
                    </div>
                  </div>
                </Form>
              </div>
              <div>
                {/* Display Fees Table and Image */}
                <div className='row'>
                  <div className='col-12'>
                    <div className="d-flex text-center mt-5">
                      <table bordered borderColor="primary" className="table table-striped table-bordered text-center" style={{ width: '100%' }}>
                        <thead className="thead-dark">
                          <tr>
                            <th scope="col">Symptom</th>
                            <th scope="col">Fees</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {feesList.map((fee) => (
                            <tr key={fee.id}>
                              <td>{fee.Symptom}</td>
                              <td>{fee.Fees}</td>
                              <td>
                                <button
                                  onClick={() => handleDelete(fee.id)}
                                  className="btn btn-danger"
                                  style={{ padding: '0.5rem' }}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className='col-12'>
                    <img src={urlDecsription} width='50%' />
                  </div>
                </div>
              </div>




            </div>
          </Box>

          <Button
            variant='primary'
            onClick={handleNext}
            style={{ width: '5rem', marginTop: '2rem', marginLeft: '3rem' }}
          >
            Next
          </Button>
        </div>
      </Box>
    </>
  );
};

export default Payment;
