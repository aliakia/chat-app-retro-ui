import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC1UUNgBR6xcALnW0a_xmIEFigz7BZAAsQ",
  authDomain: "chat-app-35e8b.firebaseapp.com",
  projectId: "chat-app-35e8b",
  storageBucket: "chat-app-35e8b.appspot.com",
  messagingSenderId: "168469540104",
  appId: "1:168469540104:web:bbc373a5b06bdc5bb350bd"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
