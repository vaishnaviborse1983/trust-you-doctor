import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';
import {
    getDatabase,
    ref,
    onValue, set, push, child
} from 'firebase/database';
import DatePicker from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { storage, database } from '../../../config/Firebase/firebase.config';
import Navbar from '../../pages/Navbar';
import { FaClinicMedical } from "react-icons/fa";
import dp from '../image/dp.png';
import Footer from '../../../../Footer/Footer';
import { get } from 'firebase/database';
import { Form } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import { ref as ref_storage, uploadBytes, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import emailjs from '@emailjs/browser';
import { useAuth } from '../../../AuthContext';


const generateTimeSlots = (startTime, endTime, interval) => {
    const timeSlots = [];
    let currentTime = new Date(`2000-01-01T${startTime}`);
    const endTimeObj = new Date(`2000-01-01T${endTime}`);
    const timeFormat = new Intl.DateTimeFormat('en', {
        hour: '2-digit',
        minute: '2-digit',
    });

    while (currentTime <= endTimeObj) {
        timeSlots.push(timeFormat.format(currentTime));
        currentTime.setMinutes(currentTime.getMinutes() + interval);
    }

    return timeSlots;
};





const BookAppointmentPatient = () => {
    const { id } = useParams();

    const { user, login, setUserId } = useAuth();
    const [doctorData, setDoctorData] = useState(null);
    const [profile, setProfile] = useState('');
    const [doctorSchedule, setDoctorSchedule] = useState([]);
    const [doctorHolidays, setDoctorHolidays] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [finalDate, setFinalDate] = useState(null);
    const [finalSlot, setFinalSlot] = useState(null);
    const [AppointmentBooked, setAppointBooked] = useState(false);

    const [slots, setSlots] = useState(false);
    const [appoint, setAppoint] = useState(false);
    const [feesList, setFeesList] = useState([]);

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Pay In Clinic');
    const [QRCode, setQRCode] = useState('');
    const [imageFile, setImageFile] = useState(null);


    const [PatientsData, setPatientsData] = useState({
        Name: '',
        Mobile: '',
        Symptoms: '',
        Age: '',
        Email: '',
        Description: '',
    })
    const [finalPatientsData, setFinalPatientsData] = useState();

    const [availableTimeSlots, setAvailableTimeSlots] = useState({
        morning: [],
        evening: [],
    });
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [time, setTime] = useState()
    const [bookedSlots, setBookedSlots] = useState([]);


    useEffect(() => {
        const fetchDoctorData = () => {
            const doctorRef = ref(database, `doctor/${id}`);

            // Subscribe to changes for the specific doctor ID
            const unsubscribe = onValue(doctorRef, (snapshot) => {
                const data = snapshot.val();
                setDoctorData(data);
            });

            onValue(ref(database, `Profile/${id}/Profile`), (snapshot) => {
                if (snapshot.exists()) {
                    setProfile(snapshot.val().url);
                    // console.log(snapshot.val().url);

                } else {

                }
            });



        };

        fetchDoctorData();
    }, [id]);
    useEffect(() => {
        const fetchDataFees = async () => {
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

        fetchDataFees();
    }, [id]);


    useEffect(() => {
        const fetchDoctorSchedule = async () => {
            try {
                const databaseRef = ref(
                    getDatabase(),
                    `doctor/-NnUEZKY-5UcIK8tgR5u/schedule`
                );
                onValue(databaseRef, (snapshot) => {
                    if (snapshot.exists()) {
                        const scheduleData = snapshot.val();
                        const scheduleArray = [];

                        for (const key in scheduleData) {
                            if (Object.hasOwnProperty.call(scheduleData, key)) {
                                const entry = { id: key, ...scheduleData[key] };
                                entry.startDate = new Date(entry.startDate);
                                entry.endDate = new Date(entry.endDate);
                                scheduleArray.push(entry);
                            }
                        }

                        setDoctorSchedule(scheduleArray);
                    } else {
                        console.error(`Data for doctor schedule does not exist.`);
                    }
                });
            } catch (error) {
                console.error('Error fetching doctor schedule data:', error);
            }
        };

        const fetchDoctorHolidays = async () => {
            try {
                const holidaysRef = ref(
                    getDatabase(),
                    `doctor/-NnUEZKY-5UcIK8tgR5u/holidays`
                );
                onValue(holidaysRef, (snapshot) => {
                    if (snapshot.exists()) {
                        const holidaysData = snapshot.val();
                        const holidaysArray = [];

                        for (const key in holidaysData) {
                            if (Object.hasOwnProperty.call(holidaysData, key)) {
                                const entry = {
                                    id: key,
                                    date: new Date(holidaysData[key].date),
                                };
                                holidaysArray.push(entry);
                            }
                        }

                        setDoctorHolidays(holidaysArray);
                    } else {
                        console.error(`Data for doctor holidays does not exist.`);
                    }
                });
            } catch (error) {
                console.error('Error fetching doctor holidays data:', error);
            }
        };

        const fetchBookedSlots = async () => {
            try {
                const appointmentsRef = ref(
                    getDatabase(),
                    `doctor/-NnUEZKY-5UcIK8tgR5u/appointments`
                );
                onValue(appointmentsRef, (snapshot) => {
                    if (snapshot.exists()) {
                        const appointmentsData = snapshot.val();
                        const bookedSlotsArray = Object.values(appointmentsData).map(
                            (appointment) => appointment
                        );
                        console.log('Booked Slots Data:', bookedSlotsArray);
                        setBookedSlots(bookedSlotsArray);
                    } else {
                        console.error(`Data for doctor appointments does not exist.`);
                    }
                });
            } catch (error) {
                console.error('Error fetching doctor appointments data:', error);
            }
        };

        fetchBookedSlots();
        fetchDoctorSchedule();
        fetchDoctorHolidays();
    }, [id]);


    const isSlotBooked = (slot) => {
        const selectedDateFormatted = selectedDate.toLocaleDateString();

        return bookedSlots.some((appointment) => {
            const appointmentDate = appointment.date;
            const appointmentTimeSlot = appointment.timeSlot;

            console.log('Selected Date:', selectedDateFormatted);
            console.log('Appointment Date:', appointmentDate);
            console.log('Appointment Time Slot:', appointmentTimeSlot);

            return (
                appointmentDate === selectedDateFormatted &&
                appointmentTimeSlot === slot
            );
        });
    };


    useEffect(() => {
        if (selectedDate) {
            const formattedDate = selectedDate.toISOString().split('T')[0];

            const matchingSchedule = doctorSchedule.find((entry) => {
                const startDate = entry.startDate.toISOString().split('T')[0];
                const endDate = entry.endDate.toISOString().split('T')[0];
                const isHoliday = entry.isHolidayField;

                return (
                    formattedDate >= startDate &&
                    formattedDate <= endDate &&
                    !isHoliday
                );
            });

            const isHoliday = doctorHolidays.some((holiday) => {
                const holidayFormattedDate = holiday.date.toISOString().split('T')[0];
                return formattedDate === holidayFormattedDate;
            });

            console.log('Selected Date:', formattedDate);
            setFinalDate(formattedDate)
            console.log('Is Holiday:', isHoliday);

            if (matchingSchedule && !isHoliday) {
                console.log('Matching Schedule:', matchingSchedule);

                const morningSlots = generateTimeSlots(
                    matchingSchedule.morningStartTime,
                    matchingSchedule.morningEndTime,
                    15
                );

                const eveningSlots = generateTimeSlots(
                    matchingSchedule.eveningStartTime,
                    matchingSchedule.eveningEndTime,
                    15
                );

                const availableSlots = {
                    morning: morningSlots,
                    evening: eveningSlots,
                };

                if (
                    Object.keys(availableSlots).some(
                        (slotType) => availableSlots[slotType].length > 0
                    )
                ) {
                    setAvailableTimeSlots(availableSlots);
                } else {
                    setAvailableTimeSlots({ morning: [], evening: [] });
                }
            } else {
                console.log('No Matching Schedule or Holiday');
            }
        }
    }, [selectedDate, doctorSchedule, doctorHolidays]);

    const isDateAvailable = (date) => {
        const formattedDate = date.toISOString().split('T')[0];

        const matchingSchedule = doctorSchedule.find(
            (entry) =>
                formattedDate >= entry.startDate.toISOString().split('T')[0] &&
                formattedDate <= entry.endDate.toISOString().split('T')[0] &&
                !entry.isHoliday
        );

        const isHoliday = doctorHolidays.some(
            (entry) =>
                entry.isHoliday &&
                formattedDate === entry.date.toISOString().split('T')[0]
        );

        return !matchingSchedule && !isHoliday;
    };

    const handleDateChange = (date) => {
        if (!isDateAvailable(date)) {
            setSelectedDate(date);
        } else {
            alert(
                'Doctor is not available on this date or it is a holiday. Please choose another date.'
            );
        }
    };


    const handleTimeSlotSelection = (selectedSlot) => {
        // Handle the logic when a time slot is selected
        console.log(`Selected Time Slot: ${selectedSlot}`);
        setTime(selectedSlot)
        setFinalSlot(selectedSlot)
        setSelectedTimeSlot(selectedSlot);
    };



    const TimeSlotColumn = ({ title, slots, selectedSlot, onSlotSelect, isSlotBooked }) => (
        <div>
            <Typography variant="h6">{title}</Typography>
            {slots.map((slot) => (
                <Button
                    key={slot}
                    variant="outlined"
                    onClick={() => onSlotSelect(slot)}
                    sx={{
                        margin: '5px',
                        backgroundColor: isSlotBooked(slot) ? '#d3d3d3' : selectedSlot === slot ? '#3484F0' : 'white',
                        color: isSlotBooked(slot) ? 'black' : selectedSlot === slot ? 'white' : 'primary',
                        '&:hover': {
                            backgroundColor: isSlotBooked(slot) ? '#3484F0' : '#3484F0',
                            color: isSlotBooked(slot) ? 'black' : 'white',
                        },
                        '&:active': {
                            backgroundColor: 'lightblue', // Change to light blue when clicked
                            color: 'white',
                        },
                    }}
                    disabled={isSlotBooked(slot)}
                >
                    {slot}
                </Button>
            ))}
        </div>
    );

    const data = (e) => {
        const { value, name } = e.target;
        setPatientsData(() => {
            return {
                ...PatientsData,
                [name]: value
            };
        });
    }

    function validateEmail(email) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    }

    function validateIndianMobileNumber(mobileNumber) {
        return /^(\+\d{1,3}[-]?)?\d{10}$/.test(mobileNumber);
    }

    const AppoitnmentUserDetails = () => {

        if (PatientsData.Name === '') {
            toast.error('Name is required', { autoClose: 40000 });
        }
        else if (PatientsData.Email === '') {
            toast.error('Email is required', { autoClose: 40000 });
        }
        else if (!validateEmail(PatientsData.Email)) {
            toast.error('Invalid Email', { autoClose: 40000 });
        }
        else if (!PatientsData.Email.includes('@')) {
            toast.error("Please enter valid email address", { autoClose: 4000 });
        }
        else if (PatientsData.Mobile === '') {
            toast.error("Mobile is required", { autoClose: 4000 });
        }
        else if (!validateIndianMobileNumber(PatientsData.Mobile)) {
            toast.error("Please enter valid Mibile No", { autoClose: 4000 });
        }
        else if (PatientsData.Age && (PatientsData.Age < 1 || PatientsData.Age > 150)) {
            // You can display an error message or take appropriate action
            toast.error('Invalid Age', { autoClose: 40000 });
        }

        else if (PatientsData.Symptoms === '') {
            toast.error("Illness is required", { autoClose: 4000 });
        }
        else {
            setAppoint(true);
            setFinalPatientsData(PatientsData);
            console.log(finalPatientsData);
        }

    }



    const handlePaymentMethodChange = (method) => {
        setSelectedPaymentMethod(method);
        console.log(method);
    };

    useEffect(() => {
        onValue(ref(database, `QR/${id}`), (snapshot) => {
            if (snapshot.exists()) {
                setQRCode(snapshot.val().url);
                console.log(snapshot.val().url);
            } else {
                // Handle the case when the data doesn't exist
                console.error(`Data for QR code does not exist.`);
            }
        });
    }, []);

    const isQRCodeAvailable = QRCode && QRCode.trim() !== '';

    const notifyQRCodeNotAvailable = () => {
        toast.error('This payment method is not available, Please select another payment method', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };


    const handlePayment = () => {



        if (selectedPaymentMethod === 'Pay In Clinic') {
            toast.success('Payment Done');
            console.log(finalDate);
            console.log(selectedDate);




            // ... (other imports and code)

            const appointmentRefDoctor = ref(database, `doctor/${id}/appointments`);
            const patientListRef = ref(database, `doctor/${id}/patientlist`)
            const appointmentRefUser = ref(database, `users/${user.userId}/appointments`);

            // Combine patient data, selected slot, and payment information
            const appointmentData = {
                patientID: user.userId,
                date: selectedDate.toLocaleDateString(),
                timeSlot: time,
                ...finalPatientsData,
                paymentMethod: selectedPaymentMethod,
                // Add more fields as needed
            };

            const patientList = {
                patientID: user.userId,
                Name: finalPatientsData.Name,
                Mobile: finalPatientsData.Mobile,
                Email: finalPatientsData.Email
            }

            const appointmentDataPatient = {
                doctorId: id,
                date: selectedDate.toLocaleDateString(),
                timeSlot: time,
                ...finalPatientsData,
                paymentMethod: selectedPaymentMethod,
                // Add more fields as needed
            };

            // Generate a unique key for the appointment
            const appointmentKey = push(appointmentRefDoctor).key;

            // Push the appointment data to both locations using the same key
            const pushToDatabase = async () => {
                try {
                    await Promise.all([
                        set(child(appointmentRefDoctor, appointmentKey), appointmentData),
                        set(child(appointmentRefUser, appointmentKey), appointmentDataPatient),
                        set(child(patientListRef, appointmentKey), patientList)
                    ]);

                    toast.success('Appointment Booked..!');
                } catch (error) {
                    console.error('Error while booking Appointment:', error);
                    toast.error('Error while booking Appointment..!');
                }
            };

            // Call the function to push data to both locations
            pushToDatabase();



            sendEmailToPatient();
            sendEmailToDoctor();
            setAppointBooked(true);
            return;
        }
        else if (selectedPaymentMethod === 'Online Payment') {
            const paymentKey = push(ref(database, `Payment/Doctor/${id}/AppointmentPayment`)).key;
            const paymentRef = ref_storage(storage, `Payment/Doctor/${id}/AppointmentPayment/${paymentKey}`);

            // Show loading indicator
            toast.info('Processing payment...', { position: 'top-right' });

            uploadBytes(paymentRef, imageFile)
                .then(() => {
                    getDownloadURL(paymentRef)
                        .then((url) => {
                            const appointmentRefDoctor = ref(database, `doctor/${id}/appointments`);
                            const appointmentRefUser = ref(database, `users/${user.userId}/appointments`);

                            // Combine patient data, selected slot, and payment information
                            const appointmentData = {
                                patientID: user.userId,
                                date: selectedDate.toLocaleDateString(),
                                timeSlot: time,
                                ...finalPatientsData,
                                paymentMethod: selectedPaymentMethod,
                                paymentUrl: url,
                                // Add more fields as needed
                            };

                            const appointmentDataPatient = {
                                doctorId: id,
                                date: selectedDate.toLocaleDateString(),
                                timeSlot: time,
                                ...finalPatientsData,
                                paymentMethod: selectedPaymentMethod,
                                paymentUrl: url,
                                // Add more fields as needed
                            };

                            // Generate a unique key for the appointment
                            const appointmentKey = push(appointmentRefDoctor).key;

                            // Push the appointment data to both locations using the same key
                            const pushToDatabase = async () => {
                                try {
                                    await Promise.all([
                                        set(child(appointmentRefDoctor, appointmentKey), appointmentData),
                                        set(child(appointmentRefUser, appointmentKey), appointmentDataPatient)
                                    ]);

                                    toast.success('Appointment Booked..!');
                                } catch (error) {
                                    console.error('Error while booking Appointment:', error);
                                    toast.error('Error while booking Appointment..!');
                                }
                            };

                            // Call the function to push data to both locations
                            pushToDatabase();

                        })
                        .catch((error) => {
                            console.error('Error getting download URL:', error);
                            toast.error('Payment failed');
                        });
                })
                .catch((error) => {
                    console.error('Error uploading image:', error);
                    toast.error('Payment failed');
                });
        }




    };

    const sendEmailToPatient = () => {

        const templateParams = {
            Patient_Email: PatientsData.Email,
            Patient_Name: PatientsData.Name,
            Doctor_Name: doctorData.First + "  " + doctorData.Middle + "  " + doctorData.Last,
            Clinic_Name: doctorData.ClinicName,
            Clinic_Address: doctorData.ClinicAddress,
            Illness: PatientsData.Symptoms,
            Description: PatientsData.Description,
            Contact: PatientsData.Mobile,
            Apn_Date: finalDate,
            Apn_Time: finalSlot,
            Payment_Mode: selectedPaymentMethod,
        };


        emailjs.send('service_zzy6zof', 'template_c2m3r4j', templateParams, 'pB69Z4QJMfM5oTmXO')
            .then((result) => {
                console.log('Patient Email sent..!');
            }, (error) => {
                toast.error('Error Sending Email to Patient..!');

            });

    };
    const sendEmailToDoctor = () => {

        const templateParams = {

            Doctor_Email: doctorData.Email,
            Patient_Name: PatientsData.Name,
            Doctor_Name: doctorData.First + "  " + doctorData.Middle + "  " + doctorData.Last,
            Patient_Email: PatientsData.Email,
            Contact: PatientsData.Mobile,
            Age: PatientsData.Age,
            Illness: PatientsData.Symptoms,
            Description: PatientsData.Description,
            Apn_Date: finalDate,
            Apn_Time: finalSlot,
            Payment_Mode: selectedPaymentMethod,
        };


        emailjs.send('service_zzy6zof', 'template_w03uarr', templateParams, 'pB69Z4QJMfM5oTmXO')
            .then((result) => {
                console.log('Patient Email sent..!');
            }, (error) => {
                toast.error('Error Sending Email to Patient..!');

            });

    };


    return (
        <>
            <Navbar />
            <div className='container-fluid'>
                <ToastContainer />
                <div className='row'>
                    {doctorData && (
                        <div className='col-lg-6 col-sm-12'>

                            <div className='w-75 mx-auto mt-4 p-4 ' style={{ boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px' }}>
                                <div className='row text-center'>
                                    <h2 className='text-dark'>  Doctor Details</h2>
                                    <hr />
                                </div>
                                <div className='row'>
                                    <div className='col text-start'>
                                        {
                                            finalDate ?
                                                <h6>Selected Date : {finalDate}</h6>
                                                : null
                                        }
                                    </div>
                                    <div className='col text-end'>
                                        {
                                            finalSlot ? (
                                                <h6>Selected Time Slot : {finalSlot}</h6>
                                            )

                                                : null
                                        }
                                    </div>
                                    <hr />
                                </div>
                                <div className='row align-items-center justify-content-center m-4'>
                                    {profile !== '' ? (
                                        <img
                                            src={profile}
                                            alt="Doctor Profile"
                                            style={{
                                                height: "12rem",
                                                width: '12rem',
                                                objectFit: "cover",
                                                border: '4px solid white',
                                                boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
                                            }}
                                        />
                                    ) : (
                                        <img
                                            src={dp}
                                            alt="Doctor Profile"
                                            style={{
                                                height: "12rem",
                                                width: '12rem',
                                                objectFit: "cover",
                                                borderRadius: "50%",
                                                border: '4px solid white'
                                            }}
                                        />
                                    )}
                                </div>

                                <div className='row text-center m-2'>
                                    {doctorData.First ?
                                        <h3 style={{ fontWeight: 'bold' }}>{doctorData.Prefix + "  " + doctorData.First + "  " + doctorData.Middle + "  " + doctorData.Last}</h3>
                                        : null
                                    }
                                </div>
                                <div className='row text-center m-2'>
                                    {
                                        doctorData.Speciality ?
                                            <h4>{doctorData.Speciality}</h4>
                                            : null
                                    }
                                </div>
                                <div className='row text-center'>
                                    {
                                        doctorData.Experience ?
                                            <h5>{doctorData.Experience} Years of Experience</h5>
                                            : null
                                    }
                                </div>
                                <div className='row ml-3 pl-3'>
                                    {
                                        doctorData.Description ?
                                            <h6 className='text-jusitfy'>{doctorData.Description}</h6>
                                            : null
                                    }
                                </div>
                                <div>
                                    {
                                        feesList.length !== 0 ?
                                            <div className='row mt-3'>
                                                <div className='col-sm-12'>
                                                    <p style={{ color: 'black', fontSize: '3vh', fontWeight: 'normal', marginLeft: '0' }}>Consulting Fees </p>
                                                    <table bordered borderColor="primary" className="table table-bordered text-center" style={{ width: '100%' }}>
                                                        <thead className="thead-dark">
                                                            <tr>
                                                                <th scope="col">Symptom</th>
                                                                <th scope="col">Fees</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {feesList.map((fee) => (
                                                                <tr key={fee.id}>
                                                                    <td>{fee.Symptom}</td>
                                                                    <td>{fee.Fees}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                    <p style={{ padding: '0', margin: '0', color: 'black', fontWeight: 'normal', fontSize: '1.9vh', fontFamily: 'sans-serif' }}>*These are the basic consulting fees, more charges will be applicable according to treatment</p>
                                                </div>
                                            </div>
                                            : null

                                    }

                                </div>

                            </div>

                        </div>
                    )}
                    <div className='col-lg-6 col-sm-12'>
                        {
                            AppointmentBooked ?
                                <div className='text primary d-flex justify-content-center align-items-center h-50'>
                                    <h3 className='text-primary'> Appointment Booked</h3>
                                </div>
                                :
                                (
                                    <div>
                                        {
                                            appoint ?
                                                <div>



                                                    <div style={{ textAlign: 'center', marginTop: '50px' }}>

                                                        <h2>Select Payment Method</h2>
                                                        <div className="payment-method-options">
                                                            <div className='radioBox'>
                                                                <label className={`payment-method-option ${selectedPaymentMethod === 'Pay In Clinic' ? 'selected' : ''}`}>
                                                                    <input
                                                                        type="radio"
                                                                        name="paymentMethod"
                                                                        value="Pay In Clinic"
                                                                        checked={selectedPaymentMethod === 'Pay In Clinic'}
                                                                        onChange={() => handlePaymentMethodChange('Pay In Clinic')}
                                                                    />
                                                                    Pay in Clinic
                                                                </label>
                                                            </div>

                                                            <div className='radioBox'>
                                                                <label className={`payment-method-option ${selectedPaymentMethod === 'Online Payment' ? 'selected' : ''}`}>
                                                                    <input
                                                                        type="radio"
                                                                        name="paymentMethod"
                                                                        value="Online Payment"
                                                                        checked={selectedPaymentMethod === 'Online Payment'}
                                                                        onChange={() => {
                                                                            if (!isQRCodeAvailable) {
                                                                                notifyQRCodeNotAvailable();
                                                                            }
                                                                            handlePaymentMethodChange('Online Payment');
                                                                        }}
                                                                    />
                                                                    QR Code Payment
                                                                </label>
                                                            </div>
                                                        </div>

                                                        {selectedPaymentMethod === 'Online Payment' && isQRCodeAvailable && (
                                                            <div style={{ marginTop: '20px' }}>
                                                                <h3>Scan the QR Code to Make Payment</h3>
                                                                <img src={QRCode} alt="QR Code" style={{ width: '20vw' }} />
                                                                <Form.Group >
                                                                    <Form.Label className='label'>Upload Screenshot of Payment</Form.Label>
                                                                    <Form.Control
                                                                        type='file'
                                                                        accept='image/*'
                                                                        onChange={handleImageChange}
                                                                    />
                                                                </Form.Group>
                                                            </div>
                                                        )}

                                                        <div style={{ marginTop: '20px' }}>

                                                            <button
                                                                style={{ padding: '10px 20px', fontSize: '16px' }}
                                                                disabled={selectedPaymentMethod === 'Online Payment' && !isQRCodeAvailable}
                                                                onClick={() => handlePayment()}
                                                            >
                                                                Confirm and Pay
                                                            </button>

                                                        </div>
                                                    </div>



                                                </div>
                                                :
                                                <div>
                                                    {
                                                        slots ?
                                                            (
                                                                <div className='w-75 mt-4'>
                                                                    <div className='row text-center text-primary' style={{ marginTop: '3vh' }}>
                                                                        <h4>Enter Patients Details</h4>
                                                                    </div>


                                                                    <div className='row'>

                                                                        <div className='col-md-12 col-xxl-12 col-sm-12'>
                                                                            <Form.Group className="mb-3" controlId="formBasicLastName">
                                                                                <Form.Label>Enter Full Name</Form.Label>
                                                                                <Form.Control type="text" onChange={data} name='Name' placeholder="Name" style={{ fontSize: '2vh', padding: '2vh' }} />
                                                                            </Form.Group>
                                                                        </div>
                                                                    </div>
                                                                    <div className='row'>

                                                                        <div className='col-md-12 col-xxl-12 col-sm-12'>
                                                                            <Form.Group className="mb-3" controlId="formBasicLastName">
                                                                                <Form.Label>Email</Form.Label>
                                                                                <Form.Control type="email" onChange={data} name='Email' placeholder="Email" style={{ fontSize: '2vh', padding: '2vh' }} />
                                                                            </Form.Group>
                                                                        </div>
                                                                    </div>
                                                                    <div className='row'>

                                                                        <div className='col-md-12 col-xxl-12 col-sm-12'>
                                                                            <Form.Group className="mb-3" controlId="formBasicLastName">
                                                                                <Form.Label>Enter Mobile Number</Form.Label>
                                                                                <Form.Control type="text" onChange={data} name='Mobile' placeholder="Mobile Number" style={{ fontSize: '2vh', padding: '2vh' }} />
                                                                            </Form.Group>
                                                                        </div>
                                                                    </div>
                                                                    <div className='row'>

                                                                        <div className='col-md-12 col-xxl-12 col-sm-12'>
                                                                            <Form.Group className="mb-3" controlId="formBasicLastName">
                                                                                <Form.Label>Enter Age</Form.Label>
                                                                                <Form.Control type="number" onChange={data} name='Age' placeholder="Age" style={{ fontSize: '2vh', padding: '2vh' }} />
                                                                            </Form.Group>
                                                                        </div>
                                                                    </div>

                                                                    <div className='row'>

                                                                        <div className='col-md-12 col-xxl-12 col-sm-12'>
                                                                            <Form.Group className="mb-3" controlId="formBasicLastName">
                                                                                <Form.Label>Enter Illness</Form.Label>
                                                                                <Form.Control type="text" onChange={data} name='Symptoms' placeholder="Name of Illness" style={{ fontSize: '2vh', padding: '2vh' }} />
                                                                            </Form.Group>
                                                                        </div>
                                                                    </div>
                                                                    <div className='row'>

                                                                        <div className='col-md-12 col-xxl-12 col-sm-12'>
                                                                            <Form.Group className="mb-3" controlId="formBasicLastName">
                                                                                <Form.Label>Enter Description of Illness </Form.Label>
                                                                                <Form.Control type="text" onChange={data} name='Description' placeholder="Enter Description here ..." style={{ fontSize: '2vh', padding: '2vh' }} />
                                                                            </Form.Group>
                                                                        </div>
                                                                    </div>

                                                                    <div className='row'>
                                                                        <button className='btn btn-primary w-25' type='button' onClick={AppoitnmentUserDetails} > Next</button>
                                                                    </div>

                                                                </div>
                                                            )
                                                            :
                                                            (
                                                                <Box
                                                                    sx={{
                                                                        display: 'flex',
                                                                        flexDirection: 'column',
                                                                        alignItems: 'center',
                                                                        padding: '20px',
                                                                    }}
                                                                >
                                                                    <Paper elevation={3} sx={{ padding: '20px', width: '80%' }}>
                                                                        <Typography className='text-center' variant="h4" gutterBottom>
                                                                            Book an Appointment
                                                                        </Typography>
                                                                        <div sx={{ textAlign: 'center' }}>
                                                                            <Typography variant="h6">Select Date:</Typography>
                                                                            <DatePicker
                                                                                onChange={handleDateChange}
                                                                                value={selectedDate}
                                                                                minDate={new Date()}
                                                                                tileDisabled={({ date }) => {
                                                                                    const formattedDate = date.toLocaleDateString();

                                                                                    // Disable dates after the end date of the last schedule entry
                                                                                    const isAfterEndDate =
                                                                                        doctorSchedule.length > 0 &&
                                                                                        date > doctorSchedule[doctorSchedule.length - 1].endDate;

                                                                                    // Disable holidays
                                                                                    const isHoliday = doctorHolidays.some(
                                                                                        (holiday) => formattedDate === holiday.date.toLocaleDateString()
                                                                                    );

                                                                                    return isAfterEndDate || isHoliday;
                                                                                }}
                                                                            />
                                                                        </div>
                                                                        {selectedDate && (
                                                                            <Grid
                                                                                container
                                                                                justifyContent="space-around"
                                                                                alignItems="center"
                                                                                marginTop="20px"
                                                                            >
                                                                                <Grid item>
                                                                                    <TimeSlotColumn
                                                                                        title="Morning"
                                                                                        slots={availableTimeSlots.morning}
                                                                                        selectedSlot={selectedTimeSlot}
                                                                                        onSlotSelect={handleTimeSlotSelection}
                                                                                        isSlotBooked={isSlotBooked}
                                                                                    />
                                                                                </Grid>
                                                                                <Grid item>
                                                                                    <TimeSlotColumn
                                                                                        title="Evening"
                                                                                        slots={availableTimeSlots.evening}
                                                                                        selectedSlot={selectedTimeSlot}
                                                                                        onSlotSelect={handleTimeSlotSelection}
                                                                                        isSlotBooked={isSlotBooked}
                                                                                    />
                                                                                </Grid>
                                                                            </Grid>
                                                                        )}

                                                                        <div className='row mt-4 pt-4 text-primary'>
                                                                            <div className='col text-start'>
                                                                                {
                                                                                    finalDate ?
                                                                                        <h6>Selected Date : {finalDate}</h6>
                                                                                        : null
                                                                                }
                                                                            </div>
                                                                            <div className='col text-end'>
                                                                                {
                                                                                    finalSlot ? (
                                                                                        <h6>Selected Time Slot : {finalSlot}</h6>
                                                                                    )

                                                                                        : null
                                                                                }
                                                                            </div>
                                                                        </div>

                                                                        <button className='btn btn-primary mt-4 mb-4 p-3' disabled={!finalDate || !finalSlot} onClick={(e) => { setSlots(true) }}> Next </button>
                                                                    </Paper>


                                                                </Box>
                                                            )
                                                    }
                                                </div>
                                        }
                                    </div>
                                )
                        }






                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default BookAppointmentPatient;