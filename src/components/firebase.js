import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyBMebLQow81JxgTh873pt-iEpzMfu7fOYI",
    authDomain: "country-info-app-f1780.firebaseapp.com",
    projectId: "country-info-app-f1780",
    storageBucket: "country-info-app-f1780.firebasestorage.app",
    messagingSenderId: "1002999241658",
    appId: "1:1002999241658:web:32c6a21c2346cc6dfbdb83"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
