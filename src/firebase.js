// import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
// import {getStorage} from './firebase/storage'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7PT_I9tR_4JvJp-YIdGPufHLYKUql7v0",
  authDomain: "drive-clone-3aa81.firebaseapp.com",
  projectId: "drive-clone-3aa81",
  storageBucket: "drive-clone-3aa81.firebasestorage.app",
  messagingSenderId: "290262267510",
  appId: "1:290262267510:web:4e8c011395399718039157"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const  auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const firestore = getFirestore(app);
export const storage = getStorage(app);