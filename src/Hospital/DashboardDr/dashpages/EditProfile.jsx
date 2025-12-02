import * as React from 'react';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import doctorProfile from '../../image/doctorPrfile.jpg';
import dp from '../../image/dp.png';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { auth, app, storage, database } from '../../Firebase/firebase.config';
import { getDownloadURL, ref as ref_storage, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { getDatabase, ref, get, set, onValue } from 'firebase/database';
import './editprofile.css';
import SideNav from '../SideNav';
import { toast, Toaster } from "react-hot-toast";
import { useHistory } from 'react-router-dom/cjs/react-router-dom';



const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const EditProfile = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [getUrl, setgetUrl] = useState('');

  const { id } = useParams();
  const [image, setImage] = useState("")
  const [user, setUser] = useState({
    Name: '',
    Email: '',
    Mobile: '',
    Discription: '',
    Speciality: '',
    Speciality2: '',
    Speciality3: '',
    Speciality4: '',
    Address: '',
    City: '',
    State: '',
    Locality: '',
    OwnerName: '',
    ContactNo: '',
  })
  const [formValues, setFormValues] = useState({});

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const putData = (key, data) => set(ref(database, key), data);

  const handleImageUpload = async () => {
    const imgRef = ref_storage(storage, `Profile/Hospital/${id}/Profile`);
    const uploadTask = uploadBytesResumable(imgRef, imageFile);
    //Handle the promise returned by uploadBytesResumable
    uploadTask
      .then((snapshot) => {
        console.log('Upload complete', snapshot);

        // Use snapshot.ref instead of data.ref_storage
        getDownloadURL(snapshot.ref).then((url) => {
          // setUrl(url);
          setImageUrl(url);

          console.log('Download URL:', url);
          alert("Data uploaded succesfully, Please refresh the page")
          putData(`Profile/Hospital/${id}/Profile`, { url: url })
          // console.log(text1);
        });
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
  };



  useEffect(() => {

    onValue(ref(database, `Profile/Hospital/${id}/Profile`), (snapshot) => {
      if (snapshot.exists()) {
        setgetUrl(snapshot.val().url);

      } else {
        // Handle the case when the data doesn't exist
        console.error(`Data for License/${id}/1 does not exist.`);
      }
    });


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
            setFormValues(fetchedData);
            // console.log(fetchedData);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Get a reference using database.ref()
      const userRef = ref(database, 'Hospital/' + id);

      // Use the set function on the reference object
      await set(userRef, formValues);

      toast.success("Profile Updated Successfully..!");

      if (imageFile) {
        await handleImageUpload();

        // Update the user data with the image URL
        setFormValues((prevFormValues) => ({
          ...prevFormValues,
          image: imageUrl,
        }));
      }

      // Update the user data without the image URL
      await set(userRef, formValues);

      // toast.success('Profile Updated Successfully..!');


    } catch (error) {
      toast.error('Error updating profile data');
    }
  };


  const data = (e) => {
    const { value, name } = e.target;
    setFormValues((prevFormValues) => {
      return {
        ...prevFormValues,
        [name]: value
      };
    });
  };

  const history = useHistory();
  const [loading, setLoading] = useState(false); // Add loading state
  const handleLogout = async () => {
    try {
      setLoading(true);
      await auth.signOut();
      setLoading(false);
      // You can redirect to the login page or any other desired behavior after logout
      history.replace('/');
    } catch (error) {
      setLoading(false);
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <SideNav id={id} />

        <div>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }} style={{ width: '90vw' }}>
            <DrawerHeader />
            <div className=''>
              <Toaster toastOptions={{ duration: 4000 }} />
              <Form onSubmit={handleSubmit}>
                <h1 style={{ margin: '2vh', marginBottom: '4vh', color: '#135078' }}>My Profile</h1>
                <div>
                  <div className='row mainContainer' >
                    {
                      getUrl !== '' ? <div className='col-3'>
                        <img src={getUrl} className='profileimg' />
                      </div> : <div className='col-3'>
                        <img src={dp} className='profileimg' />
                      </div>
                    }
                    <div className='col-9 mt-4' >
                      <div className='w-100'>
                        <h1 className='heading'>{formValues.Name}</h1>
                      </div>
                      <div className='row w-100 mt-3'>
                        <h4 className=''>Owner Name : {formValues.OwnerName}</h4>
                      </div>
                      {/* <div className='row w-100 mt-3'>
                        <h5 className='para'>Qualification : {formValues.Qualification1}</h5>
                      </div> */}
                      <div className='row w-100 mt-3'>
                        <h5 className='para'>Speciality : {formValues.Speciality}  {formValues.Speciality2}  {formValues.Speciality3}  {formValues.Speciality4}</h5>
                      </div>
                      <div className='row w-100'>
                        <p className='desr mt-0 para'>Description  :   {formValues.Description}</p>
                      </div>


                    </div>
                  </div>

                  <div className='row mt-5 childContainer'>
                    <h3>Profile Photo</h3>
                    <div className='row mt-4'>
                      <div className='col-4'>
                        <Form.Group>
                          <Form.Label className='label'>Upload Photo</Form.Label>
                          <Form.Control
                            type='file'
                            accept='image/*'
                            onChange={handleImageChange}
                          />
                        </Form.Group>
                      </div>
                      <div className='col-4'>
                        <Button
                          variant='primary'
                          onClick={handleImageUpload}
                          className='mt-3'
                        >
                          Upload Photo
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className='row mt-5 childContainer'>
                    <h3>Hospital Details</h3>
                    <div className='row mt-4'>
                      <div className='col-6'>

                        <Form.Group>
                          <Form.Label className='label'>Hospital Name</Form.Label>
                          <Form.Control className='pControl' name="Name" type="text" value={formValues.Name} onChange={data} placeholder="Hospital Name" />
                        </Form.Group>

                      </div>

                      <div className='col-6'>

                        <Form.Group >
                          <Form.Label className='label'>Owner Name</Form.Label>
                          <Form.Control className='pControl' name="OwnerName" type="text" value={formValues.OwnerName} onChange={data} placeholder="Owner Name" />
                        </Form.Group>

                      </div>

                    </div>

                    <div className='row mt-3'>

                      <div className='col'>

                        <Form.Group >
                          <Form.Label className="label">Hospital Address</Form.Label>
                          <Form.Control className='pControl' name="Address" type="text" value={formValues.Address} onChange={data} placeholder="Address" />
                        </Form.Group>

                      </div>


                    </div>


                    <div className='row mt-3'>
                      <div className='col-4'>
                        <Form.Group className="mb-3">
                          <Form.Label className='label'>Email</Form.Label>
                          <Form.Control className='pControl' disabled type="text" value={formValues.Email} onChange={data} placeholder="Email" />
                        </Form.Group>
                      </div>
                      <div className='col-4'>

                        <Form.Group className="mb-3" >
                          <Form.Label className='label'>Contact Number 1</Form.Label>
                          <Form.Control className='pControl' disabled type="text" value={formValues.Mobile} onChange={data} placeholder="Contact" />
                        </Form.Group>
                      </div>
                      <div className='col-4'>

                        <Form.Group className="mb-3" >
                          <Form.Label className='label'>Contact Number 2</Form.Label>
                          <Form.Control className='pControl' name="ContactNo" type="text" value={formValues.ContactNo} onChange={data} placeholder="You can add one more contact number" />
                        </Form.Group>
                      </div>


                    </div>
                    <div className='row'>
                      <div className='col-3'>
                        <Form.Group className="mb-3" >
                          <Form.Label className='label'>Speciality/ </Form.Label>
                          <Form.Control className='pControl' name='Specilaity' type="text" value={user.Speciality} onChange={data} placeholder="Primary Speciality " />
                        </Form.Group>
                      </div>
                      <div className='col-3'>
                        <Form.Group className="mb-3" >
                          <Form.Label className='label'>You can Add more than one Speciality</Form.Label>
                          {/* <Form.Control className='pControl mt-3' name='Specilaity2' type="text" value={user.Speciality2} onChange={data} placeholder="You can Add One or More Speciality" />
                        */}
                          <Form.Select
                            className='pControl '
                            name='Specilaity2'
                            onChange={data}
                            value={user.Speciality2}
                            aria-label="Default select example"
                          >

                            <option value="Allergists/Immunologists">Allergists/Immunologists</option>
                            <option value="Anesthesiologists">Anesthesiologists</option>
                            <option value="Cardiologists">Cardiologists</option>
                            <option value="Colon and Rectal Surgeons">Colon and Rectal Surgeons</option>
                            <option value="Critical Care Medicine Specialists">Critical Care Medicine Specialists</option>
                            <option value="Dermatologists">Dermatologists</option>
                            <option value="Endocrinologists">Endocrinologists</option>
                            <option value="Emergency Medicine Specialists">Emergency Medicine Specialists</option>
                            <option value="Family Physicians">Family Physicians</option>
                            <option value="Gastroenterologists">Gastroenterologists</option>
                            <option value="Geriatric Medicine Specialists">Geriatric Medicine Specialists</option>
                            <option value="Hospice and Palliative Medicine Specialists">Hospice and Palliative Medicine Specialists</option>
                            <option value="Infectious Disease Specialists">Infectious Disease Specialists</option>
                            <option value="Internists">Internists</option>
                            <option value="Medical Geneticists">Medical Geneticists</option>
                            <option value="Nephrologists">Nephrologists</option>
                            <option value="Neurologists">Neurologists</option>
                            <option value="Obstetricians and Gynecologists">Obstetricians and Gynecologists</option>
                            <option value="Oncologists">Oncologists</option>
                            <option value="Ophthalmologists">Ophthalmologists</option>
                            <option value="Osteopaths">Osteopaths</option>
                            <option value="Otolaryngologists">Otolaryngologists</option>
                            <option value="Pathologists">Pathologists</option>
                            <option value="Pediatricians">Pediatricians</option>
                            <option value="Physiatrists">Physiatrists</option>
                            <option value="Plastic Surgeons">Plastic Surgeons</option>
                            <option value="Podiatrists">Podiatrists</option>
                            <option value="Preventive Medicine Specialists">Preventive Medicine Specialists</option>
                            <option value="Psychiatrists">Psychiatrists</option>
                            <option value="Pulmonologists">Pulmonologists</option>
                            <option value="Radiologists">Radiologists</option>
                            <option value="Rheumatologists">Rheumatologists</option>
                            <option value="Sleep Medicine Specialists">Sleep Medicine Specialists</option>
                            <option value="Sports Medicine Specialists">Sports Medicine Specialists</option>
                            <option value="General Surgeons">General Surgeons</option>
                            <option value="Urologists">Urologists</option>

                            <option value="Ayurveda">Ayurveda</option>
                            <option value="Wellness">Wellness</option>

                            <option value="Homeopathy">Homeopathy</option>
                            <option value="Yoga and wellness">Yoga and wellness</option>
                            <option value="Nutritionist">Nutritionist</option>

                          </Form.Select>

                        </Form.Group>
                      </div>
                      <div className='col-3'>
                        <Form.Group className="mb-3" >
                          <Form.Label className='label'></Form.Label>
                          <Form.Select
                            className='pControl mt-3'
                            name='Specilaity3'
                            onChange={data}
                            value={user.Speciality3}
                            aria-label="Default select example"

                          >

                            <option value="Allergists/Immunologists">Allergists/Immunologists</option>
                            <option value="Anesthesiologists">Anesthesiologists</option>
                            <option value="Cardiologists">Cardiologists</option>
                            <option value="Colon and Rectal Surgeons">Colon and Rectal Surgeons</option>
                            <option value="Critical Care Medicine Specialists">Critical Care Medicine Specialists</option>
                            <option value="Dermatologists">Dermatologists</option>
                            <option value="Endocrinologists">Endocrinologists</option>
                            <option value="Emergency Medicine Specialists">Emergency Medicine Specialists</option>
                            <option value="Family Physicians">Family Physicians</option>
                            <option value="Gastroenterologists">Gastroenterologists</option>
                            <option value="Geriatric Medicine Specialists">Geriatric Medicine Specialists</option>
                            <option value="Hospice and Palliative Medicine Specialists">Hospice and Palliative Medicine Specialists</option>
                            <option value="Infectious Disease Specialists">Infectious Disease Specialists</option>
                            <option value="Internists">Internists</option>
                            <option value="Medical Geneticists">Medical Geneticists</option>
                            <option value="Nephrologists">Nephrologists</option>
                            <option value="Neurologists">Neurologists</option>
                            <option value="Obstetricians and Gynecologists">Obstetricians and Gynecologists</option>
                            <option value="Oncologists">Oncologists</option>
                            <option value="Ophthalmologists">Ophthalmologists</option>
                            <option value="Osteopaths">Osteopaths</option>
                            <option value="Otolaryngologists">Otolaryngologists</option>
                            <option value="Pathologists">Pathologists</option>
                            <option value="Pediatricians">Pediatricians</option>
                            <option value="Physiatrists">Physiatrists</option>
                            <option value="Plastic Surgeons">Plastic Surgeons</option>
                            <option value="Podiatrists">Podiatrists</option>
                            <option value="Preventive Medicine Specialists">Preventive Medicine Specialists</option>
                            <option value="Psychiatrists">Psychiatrists</option>
                            <option value="Pulmonologists">Pulmonologists</option>
                            <option value="Radiologists">Radiologists</option>
                            <option value="Rheumatologists">Rheumatologists</option>
                            <option value="Sleep Medicine Specialists">Sleep Medicine Specialists</option>
                            <option value="Sports Medicine Specialists">Sports Medicine Specialists</option>
                            <option value="General Surgeons">General Surgeons</option>
                            <option value="Urologists">Urologists</option>

                            <option value="Ayurveda">Ayurveda</option>
                            <option value="Wellness">Wellness</option>

                            <option value="Homeopathy">Homeopathy</option>
                            <option value="Yoga and wellness">Yoga and wellness</option>
                            <option value="Nutritionist">Nutritionist</option>

                          </Form.Select>
                        </Form.Group>
                      </div>
                      <div className='col-3'>
                        <Form.Group className="mb-3" >
                          <Form.Label className='label'></Form.Label>
                          <Form.Select
                            className='pControl mt-3'
                            name='Specilaity4'
                            value={user.Speciality4}
                            onChange={data}
                            aria-label="Default select example"
                          >

                            <option value="Allergists/Immunologists">Allergists/Immunologists</option>
                            <option value="Anesthesiologists">Anesthesiologists</option>
                            <option value="Cardiologists">Cardiologists</option>
                            <option value="Colon and Rectal Surgeons">Colon and Rectal Surgeons</option>
                            <option value="Critical Care Medicine Specialists">Critical Care Medicine Specialists</option>
                            <option value="Dermatologists">Dermatologists</option>
                            <option value="Endocrinologists">Endocrinologists</option>
                            <option value="Emergency Medicine Specialists">Emergency Medicine Specialists</option>
                            <option value="Family Physicians">Family Physicians</option>
                            <option value="Gastroenterologists">Gastroenterologists</option>
                            <option value="Geriatric Medicine Specialists">Geriatric Medicine Specialists</option>
                            <option value="Hospice and Palliative Medicine Specialists">Hospice and Palliative Medicine Specialists</option>
                            <option value="Infectious Disease Specialists">Infectious Disease Specialists</option>
                            <option value="Internists">Internists</option>
                            <option value="Medical Geneticists">Medical Geneticists</option>
                            <option value="Nephrologists">Nephrologists</option>
                            <option value="Neurologists">Neurologists</option>
                            <option value="Obstetricians and Gynecologists">Obstetricians and Gynecologists</option>
                            <option value="Oncologists">Oncologists</option>
                            <option value="Ophthalmologists">Ophthalmologists</option>
                            <option value="Osteopaths">Osteopaths</option>
                            <option value="Otolaryngologists">Otolaryngologists</option>
                            <option value="Pathologists">Pathologists</option>
                            <option value="Pediatricians">Pediatricians</option>
                            <option value="Physiatrists">Physiatrists</option>
                            <option value="Plastic Surgeons">Plastic Surgeons</option>
                            <option value="Podiatrists">Podiatrists</option>
                            <option value="Preventive Medicine Specialists">Preventive Medicine Specialists</option>
                            <option value="Psychiatrists">Psychiatrists</option>
                            <option value="Pulmonologists">Pulmonologists</option>
                            <option value="Radiologists">Radiologists</option>
                            <option value="Rheumatologists">Rheumatologists</option>
                            <option value="Sleep Medicine Specialists">Sleep Medicine Specialists</option>
                            <option value="Sports Medicine Specialists">Sports Medicine Specialists</option>
                            <option value="General Surgeons">General Surgeons</option>
                            <option value="Urologists">Urologists</option>

                            <option value="Ayurveda">Ayurveda</option>
                            <option value="Wellness">Wellness</option>

                            <option value="Homeopathy">Homeopathy</option>
                            <option value="Yoga and wellness">Yoga and wellness</option>
                            <option value="Nutritionist">Nutritionist</option>

                          </Form.Select>
                        </Form.Group>
                      </div>
                    </div>

                    <div className='row mt-3'>

                      <div className='col-4'>
                        <Form.Group className="mb-3" >
                          <Form.Label className="label">Locality</Form.Label>
                          <Form.Control className='pControl' type="text" name="Locality" value={formValues.City} onChange={data} placeholder="Add your Clinic Locality" />
                        </Form.Group>
                      </div>

                      <div className='col-4'>
                        <Form.Group className="mb-3">
                          <Form.Label className="label">City</Form.Label>
                          <Form.Control className='pControl' type="text" name="City" value={formValues.City} onChange={data} placeholder="City" />
                        </Form.Group>
                      </div>
                      <div className='col-4'>

                        <Form.Group className="mb-3" >
                          <Form.Label className="label">State</Form.Label>
                          <Form.Control className='pControl' type="text" name="State" value={formValues.State} onChange={data} placeholder="State" />
                        </Form.Group>
                      </div>
                    </div>


                    <div className='row mt-3'>
                      <div className='col-12'>
                        <Form.Group>
                          <Form.Label className="label">Description</Form.Label>
                          <Form.Control className='pControl' style={{ height: '10vh' }} name="Description" type="text" value={formValues.Description} onChange={data} placeholder="Describe About Your Clinic and Yourself. " />
                        </Form.Group>
                      </div>
                    </div>

                    <div className='row'>
                      <div className='col-4'>

                        <Form.Group className="mb-3" >
                          <button type='submit' className='btn btn-primary mt-3 mb-0'>Submit</button>
                        </Form.Group>
                      </div>
                    </div>

                  </div>

                </div>
              </Form>
            </div>


          </Box>
        </div >
      </Box >
    </>
  )
}

export default EditProfile