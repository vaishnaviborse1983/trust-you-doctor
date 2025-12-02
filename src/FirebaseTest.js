import React, { useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

const FirebaseTest = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "test"));
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} =>`, doc.data());
        });
      } catch (error) {
        console.error("Error connecting to Firestore:", error);
      }
    };
    fetchData();
  }, []);

  return <h2>Firebase connection test — check console</h2>;
};

export default FirebaseTest;
