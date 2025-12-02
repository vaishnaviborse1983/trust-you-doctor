import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../Patient/components/pages/Navbar';
import { ref, onValue } from 'firebase/database';
import { db } from './firebase';
import './ProfileNavbar.css';
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

const ProfileNavbar = () => {
  const { id } = useParams();
  const [activeLink, setActiveLink] = useState('qualifications');
  const [showAchievements, setShowAchievements] = useState(false);
  const [qualificationsData, setQualificationsData] = useState(null);
  const [achievementsData, setAchievementsData] = useState(null);
  const [licenseData, setLicenseData] = useState(null);


  useEffect(() => {
    // Fetch qualifications
    const doctorRef = ref(db, `doctor/${id}`);
    onValue(doctorRef, (snapshot) => {
      try {
        console.log('Fetching data for doctor:', id);
        console.log('Snapshot:', snapshot.val());
  
        if (snapshot.exists()) {
          const doctorData = snapshot.val();
          const qualifications = doctorData.Qualification1.split(', ');
          setQualificationsData(qualifications);
          console.log('Fetched doctor qualifications data:', qualifications);
        } else {
          console.log('No doctor found in the database.');
        }
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    });
  
    // Fetch license
    const licenseRef = ref(db, `License/${id}`);
    onValue(licenseRef, (snapshot) => {
      try {
        console.log('Fetching license data for doctor:', id);
        console.log('Snapshot:', snapshot.val());
  
        if (snapshot.exists()) {
          const licenseData = snapshot.val();
          setLicenseData(licenseData);
          console.log('Fetched license data:', licenseData);
        } else {
          console.log('No license data found in the database.');
        }
      } catch (error) {
        console.error('Error fetching license data:', error);
      }
    });
  }, [id]);
  
  
  
  useEffect(() => {
    const achievementRef = ref(db, `Achievement/${id}`);
    onValue(achievementRef, (snapshot) => {
      try {
        console.log('Fetching data for doctor:', id);
        console.log('Snapshot:', snapshot.val());

        if (snapshot.exists()) {
          const data = snapshot.val();
          setAchievementsData(data);
          console.log('Fetched achievement data:', data);
        } else {
          console.log('No achievement found in the database.');
        }
      } catch (error) {
        console.error('Error fetching achievements data:', error);
      }
    });
  }, [id]);


  const handleNavLinkClick = (link) => {
    setActiveLink(link);

    if (link === 'achievements') {
      setShowAchievements(true);
    } else {
      // Hide Achievements component for other links
      setShowAchievements(false);
    }
  
  };

  return (
      <div className="profile-containers">
      <nav className="profile-navbars">
        <div
          className={`navbar-link ${activeLink === 'qualifications' ? 'active' : ''}`}
          onClick={() => handleNavLinkClick('qualifications')}
        >
          Qualifications & License
        </div>
        <div
          className={`navbar-link ${activeLink === 'achievements' ? 'active' : ''}`}
          onClick={() => handleNavLinkClick('achievements')}
        >
          Achievements
        </div>
        {/* <div
          className={`navbar-link ${activeLink === 'clinic' ? 'active' : ''}`}
          onClick={() => handleNavLinkClick('Blogs')}
        >
          Blogs
        </div> */}
        <div
          className={`navbar-link ${activeLink === 'photos' ? 'active' : ''}`}
          onClick={() => handleNavLinkClick('photos')}
        >
          Photos
        </div>
        <div
          className={`navbar-link ${activeLink === 'feedback' ? 'active' : ''}`}
          onClick={() => handleNavLinkClick('feedback')}
        >
          Reviews / Feedback
        </div>
      </nav>
      
      <div className="content-container">
      {/* Content for Qualifications */}
      {activeLink === 'qualifications' && (
  <div className="content">
    <p>
      {qualificationsData ? (
        `Qualifications: ${qualificationsData.join(', ')}`
      ) : (
        'Loading qualifications...'
      )}
    </p>
    {licenseData &&
      Object.keys(licenseData).map((key) => {
        if (key.startsWith('url')) {
          const index = key.replace('url', '');
          return (
            <div key={index} className="license-item">
              <div className="license-image-container">
                <img
                  src={licenseData[key]}
                  alt={`License ${index}`}
                  className="license-image"
                />
              </div>
            </div>
          );
        }
        return null;
      })}
  </div>
)}


{/* Content for Achievements */}
{activeLink === 'achievements' && (
  <div className="content">
    {Object.keys(achievementsData).map((achievementKey) => {
      const urls = [];
      const texts = [];

      for (let i = 1; i <= 6; i++) {
        const urlKey = `url${i}`;
        const textKey = `text${i}`;

        if (achievementsData[achievementKey][urlKey]) {
          urls.push(achievementsData[achievementKey][urlKey]);
          texts.push(achievementsData[achievementKey][textKey]);
        }
      }

      return (
        <div key={achievementKey} className="achievement-item">
          {urls.map((url, index) => (
            <div key={index} className="certificate-image-container">
              <img
                src={url}
                alt={`Certificate ${index + 1}`}
                className="certificate-image"
              />
              <div className="achievement-text">
                <p>
                  <span className="bold-text">{texts[index]}</span>
                  <br />
                <span className="normal-text">
              {/* Add description if it exists in your data */}
              {achievementsData[achievementKey].description}
            </span>
              </p>
              </div>
            </div>
          ))}
        </div>
      );
    })}
  </div>
)}

{/*      
    <div className="achievement-item">
      <div className="certificate-image-container">
        <img src="https://th.bing.com/th/id/OIP.D2k-Na_xHuk9pOiODojN7wHaFu?pid=ImgDet&rs=1" alt="Certificate" className="certificate-image" />
      </div>
      <div className="achievement-text">
        <p>
        <span className="bold-text">Certified as Best Doctor</span> <br />
          <span className="normal-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna 
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
            ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit 
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
            occaecat cupidatat non proident, sunt in culpa qui officia 
            deserunt mollit anim id est laborum.
          </span>
        </p>
      </div>
    </div>
    <div className="achievement-item">
      <div className="certificate-image-container">
        <img src="https://thumbs.dreamstime.com/b/doctor-winning-award-15469492.jpg" alt="Certificate" className="certificate-image" />
      </div>
      <div className="achievement-text">
        <p>
        <span className="bold-text">Awrded as Best Surgeon</span> <br />
          <span className="normal-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna 
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
            ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit 
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
            occaecat cupidatat non proident, sunt in culpa qui officia 
            deserunt mollit anim id est laborum.
          </span>
        </p>
      </div>
    </div>

  </div>
)} */}

{/* Content for Blog */}
{/* {activeLink === 'Blogs' && (
  <div className="content">
    <div className="blog-cards"> */}
      {/* Card 1 */}
      {/* <div className="blog-card">
        <div className="blog-image">
        <img src="https://blog.udemy.com/wp-content/uploads/2014/04/shutterstock_100422550.jpg" alt="Blogs" className="blog-image" />
        </div>
        <div className="blog-details">
          <h3>Blog Title 1</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna 
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
          </p>
        </div>
      </div> */}

      {/* Card 2 */}
      {/* <div className="blog-card">
        <div className="blog-image">
        <img src="https://blog.udemy.com/wp-content/uploads/2014/04/shutterstock_100422550.jpg" alt="Blogs" className="blog-image" />
        </div>
        <div className="blog-details">
          <h3>Blog Title 2</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna 
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
          </p>
        </div>
      </div> */}

      {/* Card 3 */}
      {/* <div className="blog-card">
        <div className="blog-image">
        <img src="https://blog.udemy.com/wp-content/uploads/2014/04/shutterstock_100422550.jpg" alt="Blogs" className="blog-image" />
        </div>
        <div className="blog-details">
          <h3>Blog Title 3</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna 
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
          </p>
        </div>
      </div> */}

      {/* Card 4 */}
      {/* <div className="blog-card">
        <div className="blog-image">
        <img src="https://blog.udemy.com/wp-content/uploads/2014/04/shutterstock_100422550.jpg" alt="Blogs" className="blog-image" />
        </div>
        <div className="blog-details">
          <h3>Blog Title 4</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna 
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
          </p>
        </div>
      </div> */}

      {/* Card 5 */}
      {/* <div className="blog-card">
        <div className="blog-image">
        <img src="https://blog.udemy.com/wp-content/uploads/2014/04/shutterstock_100422550.jpg" alt="Blogs" className="blog-image" />
        </div>
        <div className="blog-details">
          <h3>Blog Title 5</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna 
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
          </p>
        </div>
      </div>
    </div>
  </div>
)} */}



{/* Content for Photos */}
{activeLink === 'photos' && (
  <div className="content">
    <div className="photo-grid">
      <div className="photo-item">
        <img src="https://th.bing.com/th/id/OIP.QPhymEdbwApKuKXI0lwMJAHaE8?pid=ImgDet&rs=1" alt="Photo 1" />
      </div>
      <div className="photo-item">
        <img src="https://th.bing.com/th/id/OIP.pRPqwwCUBnRNlH9eZpdGgAHaJQ?pid=ImgDet&w=1280&h=1600&rs=1" alt="Photo 2" />
      </div>
      <div className="photo-item">
        <img src="https://th.bing.com/th/id/OIP.bjCVKDGn7LmTVrlSuuVrdwHaE8?pid=ImgDet&rs=1" alt="Photo 3" />
      </div>
      <div className="photo-item">
        <img src="https://i.pinimg.com/originals/22/b1/51/22b151a34969c50faed7d44df66cd8ea.jpg" alt="Photo 4" />
      </div>
      <div className="photo-item">
        <img src="https://assets.thehansindia.com/h-upload/2019/10/22/228691-medical-camp.jpg" alt="Photo 4" />
      </div>
    </div>
  </div>
)}

       {/* Content for Reviews / Feedback */}
       {activeLink === 'feedback' && (
        <div className="content">
            <div className="review-cards">
            {/* Sample review card */}
            <div className="review-card">
              <div className="user-photo"></div>
              <div className="user-info">
                <h3>User Name</h3>
                <p>Feedback or comment goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>

            {/* Repeat similar structure for other reviews */}
          </div>
        </div>
      )}
    </div>
    </div>
    
  );
};

export default withRouter(ProfileNavbar);
