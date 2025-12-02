import React from "react";
import Navbar from '../../Patient/components/pages/Navbar';
import FindDoctorSearchBar from './SearchComponent';
import Categories from '../../Patient/components/pages/Categories';
import trustydoc from '../image/trustydoc.png';
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import info from '../image/info.jpg';

const DoctorSearch = ({ doctors }) => {

  return (
    <div>
      <Navbar />
      <FindDoctorSearchBar />
      <Categories />

      <div className="features-container" style={{ marginTop: '20px', border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <div style={{ padding: '10px', textAlign: 'center', color: 'maroon', marginBottom: '10px' }}>
      <h2>Features</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center', marginLeft: '200px' }}>
        <button style={{ marginRight: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', marginBottom: '10px', marginLeft: '5px', marginTop: '10px' }}>
          <img src="https://icon-library.com/images/tap-icon/tap-icon-6.jpg" alt="Button 1" style={{ width: '30px', height: '30px', marginBottom: '5px', margin: '0', objectFit: 'cover' }} />
          <span>Connect to Best Doctors in your area at one tap</span>
        </button>

        <button style={{ marginRight: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', marginBottom: '10px', marginLeft: '5px', marginTop: '10px' }}>
          <img src="https://th.bing.com/th/id/R.50c28a69e0db8c3ad35b535483d469b2?rik=242%2bsji%2fvJPoZg&riu=http%3a%2f%2fwww.vhv.rs%2ffile%2fmax%2f2%2f26550_appointment-icon-png.png&ehk=97QZGSSW6f4RWMDnIXTSkEUugyTu87oMvD4G1Yfqito%3d&risl=&pid=ImgRaw&r=0" alt="Button 2" style={{ width: '30px', height: '30px', marginBottom: '5px', margin: '0', objectFit: 'cover' }} />
          <span>Book Appointments at one tap</span>
        </button>

        <button style={{ marginRight: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', marginBottom: '10px', marginLeft: '5px', marginTop: '10px' }}>
          <img src="https://thumbs.dreamstime.com/b/opd-letter-technology-logo-design-white-background-creative-initials-concept-252399777.jpg" alt="Button 2" style={{ width: '30px', height: '30px', marginBottom: '5px', margin: '0', objectFit: 'cover' }} />
          <span>Book OPD at one tap</span>
        </button>

        <button style={{ marginRight: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', marginBottom: '10px', marginLeft: '5px', marginTop: '10px' }}>
          <img src="https://th.bing.com/th/id/OIP.FWM4M7lun2SH49EHJkf9tQHaHa?pid=ImgDet&rs=1" alt="Button 2" style={{ width: '30px', height: '30px', marginBottom: '5px', margin: '0', objectFit: 'cover' }} />
          <span>5000+ Doctors connected</span>
        </button>
      </div>
    </div>

    <div style={{ textAlign: 'right' }}>
      <img src={trustydoc} alt="Feature" style={{ width: '100%', height: '500px', margin: '0' }} />
    </div>
  </div>
</div>


      <div className="articles-container">
  <div style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', border: '1px solid #ccc', borderRadius: '8px', background: 'Lightyellow', marginBottom: '50px' }}>
    
  <img src = {info} alt="Articles" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
  </div>
</div>


       <div className="articles-container">
  <div style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', border: '1px solid #ccc', borderRadius: '8px', background: 'Lightyellow', marginBottom: '50px' }}>
    
  <img src = {info} alt="Articles" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
  </div>
</div>     
     
      {/* <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'space-between', border: '1px solid #ccc', borderRadius: '8px', padding: '20px', background: '#e0f7fa' }}>
       
        <div style={{ flex: '1', border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden', textAlign: 'center', background: 'white' }}>
          <img src="https://th.bing.com/th/id/OIP.QS-CCn0STlg3cuZpvC9YxwHaHa?pid=ImgDet&rs=1" alt="Card 1" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
          <span> <h4> CANCER </h4> <br />
          <p> Cancer is a generic term for a large group of diseases that can affect any part of the body. Other terms used are malignant tumours and neoplasms. One defining feature of cancer is the rapid creation of abnormal cells that grow beyond their usual boundaries, and which can then invade adjoining parts of the body and spread to other organs; the latter process is referred to as metastasis. Widespread metastases are the primary cause of death from cancer.<br />
           </p>

          </span>
        </div>

       
        <div style={{ flex: '1', border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden', textAlign: 'center', marginLeft: '10px', background: 'white' }}>
          <img src="https://th.bing.com/th/id/OIP.oWDAxDNiSQShx15TGTLSPgHaE7?pid=ImgDet&rs=1" alt="Card 2" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
          <span> <h4>DIABETES</h4> <br />
          <p> Diabetes is a chronic disease that occurs either when the pancreas does not produce enough insulin or when the body cannot effectively use the insulin it produces. Insulin is a hormone that regulates blood glucose. Hyperglycaemia, also called raised blood glucose or raised blood sugar, is a common effect of uncontrolled diabetes and over time leads to serious damage to many of the body's systems, especially the nerves and blood vessels. <br />
            </p>

          </span>
        </div>

       
        <div style={{ flex: '1', border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden', textAlign: 'center', marginLeft: '10px', background: 'white' }}>
          <img src="https://th.bing.com/th/id/OIP.yHunijHKoAdJSwK6EicohgHaIA?pid=ImgDet&rs=1" alt="Card 3" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
          <span> <h4>KIDNEY STONES</h4> <br />
          <p> A kidney stone is a hard object that is made from chemicals in the urine. There are four types of kidney stones: calcium oxalate, uric acid, struvite, and cystine. A kidney stone may be treated with shockwave lithotripsy, uteroscopy, percutaneous nephrolithomy or nephrolithotripsy. Common symptoms include severe pain in lower back, blood in your urine, nausea, vomiting, fever and chills, or urine that smells bad or looks cloudy. <br />
          </p>

          </span>
        </div>

       
        <div style={{ flex: '1', border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden', textAlign: 'center', marginLeft: '10px', background: 'white' }}>
          <img src="https://th.bing.com/th/id/OIP.kJOhIKBjEgMNtxisCo4KfAHaFQ?pid=ImgDet&rs=1" alt="Card 4" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
          <span> <h4>BLOOD PRESSURE</h4> <br />
          <p>Hypertension, also known as high or raised blood pressure, is a condition in which the blood vessels have persistently raised pressure. Blood is carried from the heart to all parts of the body in the vessels. Each time the heart beats, it pumps blood into the vessels. Blood pressure is created by the force of blood pushing against the walls of blood vessels (arteries) as it is pumped by the heart. The higher the pressure, the harder the heart has to pump.  <br />
           </p>

          </span>
        </div>

        
        <div style={{ flex: '1', border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden', textAlign: 'center', marginLeft: '10px', background: 'white' }}>
          <img src="https://th.bing.com/th/id/OIP.QgSFLuZsprpys71buUXU2QHaFj?pid=ImgDet&rs=1" alt="Card 5" style={{ width: '100%', height: '200px', objectFit: 'contain' }} />
          <span> <h4>Dementia</h4> <br />
          <p> Dementia is a syndrome that can be caused by a number of diseases which over time destroy nerve cells and damage the brain, typically leading to deterioration in cognitive function (i.e. the ability to process thought) beyond what might be expected from the usual consequences of biological ageing. While consciousness is not affected, the impairment in cognitive function is commonly accompanied, and occasionally preceded, by changes in mood, emotional control, behaviour, or motivation. <br />
            </p>

          </span>
        </div>
      </div>



     */}
      <div className="register-container">
  <div style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', border: '1px solid #ccc', borderRadius: '8px', background: 'Lightyellow', marginBottom: '50px' }}>
    <h1 style={{ fontSize: '75px', fontWeight: 'bold', width: '100%', textAlign: 'center', color: 'maroon', marginBottom: '20px' }}>Register today on TRUST YOU Doctor</h1>

    <img src="https://th.bing.com/th/id/OIP.NWpvFqa7RL3YgBOHBGRlMwHaD4?pid=ImgDet&rs=1" alt="Register Image" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
  </div>
</div>

    </div>
  );
};

export default withRouter(DoctorSearch);
