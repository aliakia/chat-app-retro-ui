import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyANsu8d3vAdUh5UTMe-Jw5iyfJWdU8h_wI",
  authDomain: "retro-chat-722f9.firebaseapp.com",
  projectId: "retro-chat-722f9",
  storageBucket: "retro-chat-722f9.appspot.com",
  messagingSenderId: "1001152175186",
  appId: "1:1001152175186:web:4fa3a3c294afd6d377138b"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
