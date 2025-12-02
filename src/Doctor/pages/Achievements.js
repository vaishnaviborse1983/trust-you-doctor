import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../Patient/components/pages/Navbar';
import { ref, onValue } from 'firebase/database';
import { db } from './firebase';
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

const Achievements = () => {
  const { id } = useParams();
  const [achievementsData, setAchievementsData] = useState(null);

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

  return (
    <div>
      <Navbar />
      {achievementsData && (
        <div>
          {Object.keys(achievementsData).map((achievementKey) => (
            <div key={achievementKey}>
              <h2>{achievementsData[achievementKey].text1}</h2>
              <img src={achievementsData[achievementKey].url1} alt={`Achievement ${achievementKey}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default withRouter(Achievements);
