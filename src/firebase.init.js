// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDt6eNNR42UQ3AMEuv8LduXi53JbPVApCI",
    authDomain: "atc-task.firebaseapp.com",
    projectId: "atc-task",
    storageBucket: "atc-task.appspot.com",
    messagingSenderId: "1016460168444",
    appId: "1:1016460168444:web:4cee284353f5758618db79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;