
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA288yO_VdMAk9yWCnFJzilnYrqbEB5I_g",
  authDomain: "chackaro.firebaseapp.com",
  projectId: "chackaro",
  storageBucket: "chackaro.appspot.com",
  messagingSenderId: "763977044988",
  appId: "1:763977044988:web:9408de49564d81f2e85879",
  measurementId: "G-CWD226N3PJ"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const fireStore = getFirestore(app);
const storage = getStorage(app);
export  {analytics, fireStore, storage, auth}