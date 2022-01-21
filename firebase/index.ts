import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBdpo9rGd8zN3aVwI2iZuXLLsjCOQn-wt8",
    authDomain: "cy10-1615873076221.firebaseapp.com",
    databaseURL: "https://cy10-1615873076221-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "cy10-1615873076221",
    storageBucket: "cy10-1615873076221.appspot.com",
    messagingSenderId: "41283465666",
    appId: "1:41283465666:web:e9fe31053eccbfba58a65b",
    measurementId: "G-4Q29VSZBNT"
  };

const app = initializeApp(firebaseConfig);

export default app;