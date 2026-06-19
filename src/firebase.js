import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBKlbZ3TTK8fslM0nDzK_ftL_t3q2C6CUw",
  authDomain: "financekids-v1.firebaseapp.com",
  projectId: "financekids-v1",
  storageBucket: "financekids-v1.firebasestorage.app",
  messagingSenderId: "80394570973",
  appId: "1:80394570973:web:a1b7028586e382023a1f34",
  measurementId: "G-T17JP7VF7G"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Firestore
export const db = getFirestore(app);

// Khởi tạo Auth
export const auth = getAuth(app);
