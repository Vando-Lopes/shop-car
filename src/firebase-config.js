// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBmtMW0fGCVJaiG0mYoVaOsyawwZrpQi7s",
    authDomain: "shop-car-a621d.firebaseapp.com",
    projectId: "shop-car-a621d",
    storageBucket: "shop-car-a621d.appspot.com",
    messagingSenderId: "48054576636",
    appId: "1:48054576636:web:a86a2922196823d8ee3e79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)