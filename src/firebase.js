import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDvH7c38PzDxqs6wHhQfuVLVGu0___x6DY",
  authDomain: "elder-5c9d5.firebaseapp.com",
  projectId: "elder-5c9d5",
  storageBucket: "elder-5c9d5.appspot.com",
  messagingSenderId: "966679527365",
  appId: "1:966679527365:web:2d8a1dd7bea1109fb5d5ac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage(app);
export default app;

