// 

import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from './Patient/components/pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import LoginFormUser from './Patient/components/pages/Login/LoginFormUser';
import Register from './Patient/components/pages/Register/Register';

import DrLogin from './Doctor/Login/DrLogin';

import HospitalLogin from './Hospital/Login/HospitalLogin';
import HospitalReg from './Hospital/Register/HospitalReg';
import About from './About/About';
import Contact from './Contact/Contact';
import Login from './Patient/components/pages/Login';

import SideNav from './Doctor/DashboardDr/SideNav';
import Payment from './Doctor/DashboardDr/dashpages/Payment';
import EditProfile from './Doctor/DashboardDr/dashpages/EditProfile';
import Qualification from './Doctor/DashboardDr/dashpages/Qualification';
import Achievement from './Doctor/DashboardDr/dashpages/Achievement';
import Article from './Doctor/DashboardDr/dashpages/Article';
import Licence from './Doctor/DashboardDr/dashpages/License';
import Schedule from './Doctor/DashboardDr/dashpages/Schedule';
import Germany from './Patient/components/pages/Germany';
import USA from './Patient/components/pages/USA';
import Australia from './Patient/components/pages/Australia';
import HosEditProfile from './Hospital/DashboardDr/dashpages/EditProfile';
import HosSideNav from './Hospital/DashboardDr/SideNav';
import HosPayment from './Hospital/DashboardDr/dashpages/Payment';
import Rennovation from './Test/Rennovation';

import FeaturesDr from './Doctor/pages/FeaturesDr';
import MainSlide from './Patient/components/pages/MainSlide';
import Yoga from './Yoga&Wellness/Yoga';
import Footer from './Footer/Footer'

import SearchDoctor from './Patient/components/SearchDoctor/SearchDoctor';
import DoctorProfile from './Patient/components/SearchDoctor/DoctorProfile';

import ForgotPassword from './Doctor/ForgotPassword/ForgotPassword';
import OtpVerification from './Doctor/ForgotPassword/OtpVerification';
import FetchData from './Doctor/ForgotPassword/FetchData';
import PatientHistoryDisplay from './Doctor/DashboardDr/dashpages/PatientHistoryDisplay'

import ForgotPasswordPatient from './Patient/components/ForgotPassword/ForgotPasswordPatient';
import OtpVerificationPatient from './Patient/components/ForgotPassword/OtpVerificationPatient';
import FetchDataPatient from './Patient/components/ForgotPassword/FetchDataPatient';

import WorkExperience from './Patient/components/pages/WorkExperience';
import Appointment from './Doctor/DashboardDr/dashpages/Appointment';
import History from './Doctor/DashboardDr/dashpages/History';

import BookAppointmentPatient from './Patient/components/SearchDoctor/BookAppointment/BookAppointmentPatient';
import DrArticle from './Article/DisplayArticle';
import ArticleDetails from './Article/ArticleDetails';
import Placement from './Placement/Placement';
import { AuthProvider } from './Patient/AuthContext';

import Profile from './Patient/components/Dash/Profile';
import AppointmentCheck from './Patient/components/Dash/AppointmentCheck';
import HistoryView from './Patient/components/Dash/HistoryView';
import Reports from './Patient/components/Dash/Reports';
import Request from './Patient/components/Dash/Request';
import JobApplicationForm from './Placement/JobApplicationForm';
import ChatPatient from './Patient/components/Dash/Chat';
import ChatDoctor from './Doctor/DashboardDr/dashpages/ChatDoctor';
import ConsultFees from './Doctor/DashboardDr/dashpages/ConsultFees';

import ChatMain from './Patient/components/Dash/Chat/ChatMain';
import AddDoctorChat from './Patient/components/Dash/Chat/AddDoctorChat';

import DoctorCareerAustralia from './Careers/doctorcareer/DoctorCareerAustralia';
import DoctorCareerUSA from './Careers/doctorcareer/DoctorCareerUSA'
import DoctorCareerGermany from './Careers/doctorcareer/DoctorCareerGermany'
import DentistCareerAustralia from './Careers/dentistcareer/DentistCareerAustralia';
import DentistCareerGermany from './Careers/dentistcareer/DentistCareerGermany';
import DentistCareerUSA from './Careers/dentistcareer/DentistCareerUSA';
import NurseCareerAustraila from './Careers/nursecareer/NurseAustraliaCareer';
import NurseGermanyCareer from './Careers/nursecareer/NurseGermanyCareer';
import NurseUsaCareer from './Careers/nursecareer/NurseUsaCareer';
import PharmamedicalCareerAustralia from './Careers/paramedicalcareer/ParamedicalAustralia';
import PharmamedicalCareerGermany from './Careers/paramedicalcareer/ParamedicalGermany';
import PharmamedicalCareerUSA from './Careers/paramedicalcareer/ParamedicalUSA';
import GermanLearning from './Careers/LanguageLearning/GermanLearning';
import Toefllearning from './Careers/LanguageLearning/TOEFLLearning';
import PhysiotherapyUSA from './Careers/physiotheraphy/PhysiotherapyUSA';
import PhysiotherapyGermany from './Careers/physiotheraphy/PhysiotherapyGermany';
import PhysiotherapyAustralia from './Careers/physiotheraphy/PhysiotherapyAustralia';
import TreatmentIndia from './Careers/TreatmentIndia.jsx';
import PatientDocumentUpload from './Patient/components/pages/Patientdocumentupload .jsx';


function App() {
  return (
    <div className="main">
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            {/* ✅ Login Register Routes */}
            <Route path="/patient-login">
              <LoginFormUser />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            {/* ✅ Unified Registration for all roles */}
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/patient-register">
              <Register />
            </Route>
            <Route path="/doctor-register">
              <Register />
            </Route>
            <Route path="/hospital-register">
              <Register />
            </Route>
            <Route path="/doctor-login">
              <DrLogin />
            </Route>
            <Route path='/hospital-login'>
              <HospitalLogin />
            </Route>
            <Route path='/hospital-register'>
              <HospitalReg />
            </Route>
            <Route path='/DoctorFeatures'>
              <FeaturesDr />
            </Route>

            {/* Career Routes */}
            <Route path='/Doctor/Australia'>
              <DoctorCareerAustralia/>
            </Route>
            <Route path='/Doctor/USA'>
              <DoctorCareerUSA/>
            </Route>
            <Route path='/Doctor/Germany'>
              <DoctorCareerGermany/>
            </Route>
            <Route path='/Dentist/Australia'>
              <DentistCareerAustralia/>
            </Route>
            <Route path='/Dentist/Germany'>
              <DentistCareerGermany/>
            </Route>
            <Route path='/Dentist/USA'>
              <DentistCareerUSA/>
            </Route>
            <Route path='/Nurse/Australia'>
              <NurseCareerAustraila/>
            </Route>
            <Route path='/Nurse/Germany'>
              <NurseGermanyCareer/>
            </Route>
            <Route path='/Nurse/USA'>
              <NurseUsaCareer/>
            </Route>
            <Route path='/Para/Australia'>
              <PharmamedicalCareerAustralia />
            </Route>
            <Route path='/Para/USA'>
              <PharmamedicalCareerUSA />
            </Route>
            <Route path='/Para/Germany'>
              <PharmamedicalCareerGermany/>
            </Route>
            <Route path="/physio/USA">
              <PhysiotherapyUSA/>
            </Route>
            <Route path="/physio/germany">
              <PhysiotherapyGermany/>
            </Route>
            <Route path="/physio/Australia">
              <PhysiotherapyAustralia/>
            </Route>

            {/* Language Learning */}
            <Route path="/learning/germanlang">
              <GermanLearning/>
            </Route>
            <Route path="/learning/toefllang">
              <Toefllearning/>
            </Route>

            <Route path='/treatment/india'>
              <TreatmentIndia />
              </Route>

              <Route path='/patient/documents'>
                <PatientDocumentUpload />
              </Route>              

            {/* Doctors Dashboard */}
            <Route path='/profile/:id'>
              <EditProfile />
            </Route>
            <Route path='/payment/:id'>
              <Payment />
            </Route>
            <Route path='/Qualification/:id'>
              <Qualification />
            </Route>
            <Route path='/Achievement/:id'>
              <Achievement />
            </Route>
            <Route path='/Article/:id'>
              <Article />
            </Route>
            <Route path='/PatientsHistory/:id'>
              <PatientHistoryDisplay />
            </Route>
            <Route path='/Licence/:id'>
              <Licence />
            </Route>
            <Route path='/Schedule/:id'>
              <Schedule />
            </Route>
            <Route path='/Appointment/:id'>
              <Appointment />
            </Route>
            <Route path='/History/:id'>
              <History />
            </Route>
            <Route path='/ChatDoctor/:id'>
              <ChatDoctor />
            </Route>
            <Route path='/ConsultantFees/:id'>
              <ConsultFees />
            </Route>
            <Route path='/SideNav/:id'>
              <SideNav />
            </Route>

            <Route path="/main" component={MainSlide} />

            {/* Patient Search And Book Appointment */}
            <Route path='/SDoctor'>
              <SearchDoctor />
            </Route>
            <Route path='/SDoctorProfile/:id'>
              <DoctorProfile />
            </Route>
            <Route path='/ForgotPassword'>
              <ForgotPassword />
            </Route>
            <Route path='/otp-verification/:mobile'>
              <OtpVerification />
            </Route>
            <Route path='/ResetPassword/:mobile'>
              <FetchData />
            </Route>
            <Route path='/BookAppointment/:id'>
              <BookAppointmentPatient />
            </Route>

            {/* Patients Dashboard */}
            <Route path='/AppointmentCheck/:id'>
              <AppointmentCheck />
            </Route>
            <Route path='/HistoryView/:id'>
              <HistoryView />
            </Route>
            <Route path='/Reports/:id'>
              <Reports />
            </Route>
            <Route path='/Request/:id'>
              <Request />
            </Route>
            <Route path='/ChatPatient/:doctorId/:id'>
              <ChatPatient />
            </Route>
            <Route path='/pr/:id'>
              <Profile />
            </Route>
            <Route path='/Chat/:id'>
              <ChatMain />
            </Route>
            <Route path='/SearchDoctorChat/:id'>
              <AddDoctorChat />
            </Route>

            {/* Patient Forgot Password */}
            <Route path='/ForgotPasswordPatient'>
              <ForgotPasswordPatient />
            </Route>
            <Route path='/otp-verificationPatient/:mobile'>
              <OtpVerificationPatient />
            </Route>
            <Route path='/ResetPasswordPatient/:mobile'>
              <FetchDataPatient />
            </Route>

            {/* Other Pages */}
            <Route path="/Renovation" component={Rennovation} />
            <Route path='/About'>
              <About />
            </Route>
            <Route path='/Contact'>
              <Contact />
            </Route>
            <Route path='/Footer'>
              <Footer />
            </Route>
            <Route path='/GermanyCourses'>
              <Germany />
            </Route>
            <Route path='/USACourses'>
              <USA />
            </Route>
            <Route path='/AustraliaCourses'>
              <Australia />
            </Route>
            <Route path='/Yoga'>
              <Yoga />
            </Route>
            <Route path='/WorkExperience'>
              <WorkExperience />
            </Route>
            <Route path='/DoctorArticles'>
              <DrArticle />
            </Route>
            <Route path='/article-details/:type'>
              <ArticleDetails />
            </Route>
            <Route path='/Placement'>
              <Placement />
            </Route>
            <Route path="/JobApplicationForm/:jobTitle" component={JobApplicationForm} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;