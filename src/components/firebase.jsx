// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBksGHDz0hbo5_mqQ_Tjx6FYRd7Qlru_KU",
    authDomain: "agroshield-64778.firebaseapp.com",
    projectId: "agroshield-64778",
    storageBucket: "agroshield-64778.appspot.com",
    messagingSenderId: "829521017750",
    appId: "1:829521017750:web:152f98cefb3b9158aa7bb7",
    measurementId: "G-VJR763D1ZT"
  };

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const provider = new GithubAuthProvider();

export { auth, googleProvider, provider};