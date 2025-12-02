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
  const [fee, setFee] = useState({
    Symptom: '',
    Fees: '',
  });


  const handleImageSubmit = () => {
    const imgRef = ref_storage(storage, `QR/Hospital/${id}`);
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
          putData(`QR/Hospital/${id}`, { url: url })
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
          const snapshot = await get(ref(databaseRef, `Hospital/${id}`));
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
          const databaseRef = ref(database, `Hospital/${id}/fees`);

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
    onValue(ref(database, `QR/Hospital/${id}`), (snapshot) => {
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
      const databaseRef = ref(database, `Hospital/${id}/fees`);

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

  return (
    <>
      <Box sx={{ display: 'flex' }} style={{ width: '90vw' }}>
        <SideNav id={id} />

        <div>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <div className="" style={{ width: '90vw' }}>
              <Toaster toastOptions={{ duration: 4000 }} />

              <div>
                {/* <h3>Upload Your QR code to collect payment from patient</h3> */}

                <div className='container-xxl' style={{ padding: '4vh', boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px' }}>
                  <div className='col-6'>
                    <Form.Group className="mb-3">
                      <h5><Form.Label className='label' style={{ color: '#135078' }}>Upload your QR code to collect Consulting Fees from patient</Form.Label></h5>
                      <Form.Control className='pControl' type="file" name="QR" onChange={(e) => setIamge(e.target.files[0])} />
                    </Form.Group>
                  </div>
                  <div className='row'>
                    <div className='col-4'>
                      <Form.Group className="mb-3" >
                        <button type='submit' onClick={handleImageSubmit} className='btn btn-primary mt-4' style={{ padding: '1vh', paddingLeft: '4vh', paddingRight: '4vh' }}>Submit</button>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </div>

              <Form onSubmit={handleSubmit} className='container-xxl mt-4' style={{ padding: '4vh', boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px' }}>
                <div className="row">
                  <div className='col-4'>
                    <Form.Group className="mb-3">
                      <h5><Form.Label className='label' style={{ color: '#126ca8' }}>Type Symptoms</Form.Label></h5>
                      <Form.Control className='pControl' type="text" name="Symptom" onChange={data} placeholder="Fever, Cough,...etc" />
                    </Form.Group>
                  </div>
                  <div className='col-4'>
                    <Form.Group className="mb-3" >
                      <h6><Form.Label className='label' style={{ color: '#126ca8' }}>Enter Fees here Accoriding to Symptoms</Form.Label></h6>
                      <Form.Control className='pControl' type="text" name="Fees" onChange={data} placeholder="" />
                    </Form.Group>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-4'>
                    <Form.Group className="mb-3" >
                      <button type='submit' className='btn btn-primary' style={{ padding: '1vh', paddingLeft: '4vh', paddingRight: '4vh' }}>Submit</button>
                    </Form.Group>
                  </div>
                </div>
              </Form>


              <div className='row'>
                <div className='col-6'>
                  <div className="d-flex text-center mt-5">
                    <table bordered borderColor="primary" className="table table-striped table-bordered text-center" style={{ width: '100%' }}>
                      <thead className="thead-dark">
                        <tr>
                          <th scope="col">Symptom</th>
                          <th scope="col">Fees</th>
                        </tr>
                      </thead>
                      <tbody >
                        {feesList.map((fee) => (
                          <tr key={fee.id}>
                            <td>{fee.Symptom}</td>
                            <td>{fee.Fees}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className='col-6'>
                  <img src={urlDecsription} width='50%' />

                </div>
              </div>



            </div>
          </Box>
        </div>
      </Box>
    </>
  );
};

export default Payment;
