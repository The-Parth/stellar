
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
    apiKey: "AIzaSyBksGHDz0hbo5_mqQ_Tjx6FYRd7Qlru_KU",
    authDomain: "agroshield-64778.firebaseapp.com",
    projectId: "agroshield-64778",
    storageBucket: "agroshield-64778.appspot.com",
    messagingSenderId: "829521017750",
    appId: "1:829521017750:web:152f98cefb3b9158aa7bb7",
    measurementId: "G-VJR763D1ZT"
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
export default app;