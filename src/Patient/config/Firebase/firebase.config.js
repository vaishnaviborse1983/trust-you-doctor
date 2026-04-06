
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase, set, ref, onValue } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBEbzI-EDzeSxpvflg5FkI_-VuLXNSLk8k",
  authDomain: "trustyoudoctor-a7a02.firebaseapp.com",
  projectId: "trustyoudoctor-a7a02",
   databaseURL:"https://trustyoudoctor-a7a02-default-rtdb.firebaseio.com",
  storageBucket: "trustyoudoctor-a7a02.firebasestorage.app",
  messagingSenderId: "626258825039",
  appId: "1:626258825039:web:44b7377c76734cf3813f3a",
  measurementId: "G-PYYN3TYNLR"
};

// Only initialize if not already initialized
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
