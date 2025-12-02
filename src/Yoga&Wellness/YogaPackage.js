// YogaPackage.js
import React from 'react';
import styles from './Yoga.css';

const YogaPackage = ({ name, description, duration, price, imageUrl }) => {
  return (
    <div className={styles.package}>
      <img src={imageUrl} alt={`${name} Image`} className={styles.packageImage} />
      <div className={styles.packageDetails}>
        <h2>{name}</h2>
        <p>{description}</p>
        <p>Duration: {duration} days</p>
        <p>Price: ${price}</p>
      </div>
    </div>
  );
};

export default YogaPackage;
