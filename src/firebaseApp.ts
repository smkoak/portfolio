import { initializeApp, type FirebaseApp, getApp } from "firebase/app";
import "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export let app: FirebaseApp;

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENTER_ID,
    appId: process.env.REACT_APP_ID,
    measurementId: process.env.REACT_MEASUREMENT_ID
};

try {
    app = getApp();
}catch(e) {
    app = initializeApp(firebaseConfig, "app");
} 

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app);

export default firebase;


