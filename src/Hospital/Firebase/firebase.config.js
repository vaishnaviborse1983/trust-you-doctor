// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
// import { getStorage } from 'firebase/storage';
// import { getDatabase, set, ref, onValue } from 'firebase/database';
// import { getFirestore } from "firebase/firestore";
// // import { getDatabase } from "firebase/database";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDyiF5F8m_PebWae_X0GZzHntw_vutOLRQ",
//   authDomain: "trusty-doctor.firebaseapp.com",
//   databaseURL: "https://trusty-doctor-default-rtdb.firebaseio.com",
//   projectId: "trusty-doctor",
//   storageBucket: "trusty-doctor.appspot.com",
//   messagingSenderId: "98222579520",
//   appId: "1:98222579520:web:2f4fd4580c24b1bc1de4a5",
//   measurementId: "G-3J9WTE60LE"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const storage = getStorage(app);
// const database = getDatabase(app);
// const auth = getAuth(app)
// const firestore = getFirestore(app)

// const putData = (key, data) => set(ref(database, key), data);
// onValue(ref(database, 'Achievement'), (snapshot) =>
//   console.log(snapshot.val())
// );

// export { auth, app, storage, database, firestore, putData };
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase, set, ref, onValue } from "firebase/database";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyiF5F8m_PebWae_X0GZzHntw_vutOLRQ",
  authDomain: "trusty-doctor.firebaseapp.com",
  // databaseURL: "https://trusty-doctor-default-rtdb.firebaseio.com",
  databaseURL:"https://trustyoudoctor-a7a02-default-rtdb.firebaseio.com",
  projectId: "trusty-doctor",
  storageBucket: "trusty-doctor.appspot.com",
  messagingSenderId: "98222579520",
  appId: "1:98222579520:web:2f4fd4580c24b1bc1de4a5",
  measurementId: "G-3J9WTE60LE"
};

// Initialize Firebase only if not already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const analytics = getAnalytics(app);
const storage = getStorage(app);
const database = getDatabase(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

const putData = (key, data) => set(ref(database, key), data);
onValue(ref(database, 'Achievement'), (snapshot) =>
  console.log(snapshot.val())
);

export { auth, app, storage, database, firestore, putData };
