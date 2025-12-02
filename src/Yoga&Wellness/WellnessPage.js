// WellnessPage.js
import React from 'react';
import YogaPackage from './YogaPackage';

const WellnessPage = () => {
  return (
    <div>
      <h1>Yoga and Wellness Packages</h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        <YogaPackage
          name="Relaxation Retreat"
          description="Escape the hustle and bustle with daily yoga sessions and meditation."
          duration="5 to 7 days"
          price="500"
          imageUrl="https://th.bing.com/th/id/OIP.TN8kidnd_1MEzMtfLxRTdgHaE7?pid=ImgDet&rs=1"
        />

        <YogaPackage
          name="Relaxation Retreat"
          description="Escape the hustle and bustle with daily yoga sessions and meditation."
          duration="5 to 7 days"
          price="500"
          imageUrl="https://th.bing.com/th/id/OIP.TN8kidnd_1MEzMtfLxRTdgHaE7?pid=ImgDet&rs=1"
        />

        <YogaPackage
          name="Relaxation Retreat"
          description="Escape the hustle and bustle with daily yoga sessions and meditation."
          duration="5 to 7 days"
          price="500"
          imageUrl="https://th.bing.com/th/id/OIP.TN8kidnd_1MEzMtfLxRTdgHaE7?pid=ImgDet&rs=1"
        />

        <YogaPackage
          name="Relaxation Retreat"
          description="Escape the hustle and bustle with daily yoga sessions and meditation."
          duration="5 to 7 days"
          price="500"
          imageUrl="https://th.bing.com/th/id/OIP.TN8kidnd_1MEzMtfLxRTdgHaE7?pid=ImgDet&rs=1"
        />

        <YogaPackage
          name="Relaxation Retreat"
          description="Escape the hustle and bustle with daily yoga sessions and meditation."
          duration="5 to 7 days"
          price="500"
          imageUrl="https://th.bing.com/th/id/OIP.TN8kidnd_1MEzMtfLxRTdgHaE7?pid=ImgDet&rs=1"
        />
        {/* Add more YogaPackage components for other packages */}
      </div>
    </div>
  );
};

export default WellnessPage;
