import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD1YkOggKm3VJA1OqMBM7KG9vkQv_A52jI",
  authDomain: "bjums-a0ca0.firebaseapp.com",
  projectId: "bjums-a0ca0",
  storageBucket: "bjums-a0ca0.appspot.com",
  messagingSenderId: "1035189631500",
  appId: "1:1035189631500:web:c23ddcaee10e919fcb4c29",
  measurementId: "G-6LRTF81WGX",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app);
export default app;
