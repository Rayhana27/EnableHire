// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// ✅ Replace this with your own config
const firebaseConfig = {
  apiKey: "AIzaSyCFFjOyOEz1QW54a2VyuMZUVQ2QX2xnLOI",
  authDomain: "enablehire-3d656.firebaseapp.com",
  projectId: "enablehire-3d656",
  storageBucket: "enablehire-3d656.appspot.com",
  messagingSenderId: "633391488588",
  appId: "1:633391488588:web:08225ad4af23ee3fbb1ee9"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
