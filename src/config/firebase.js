import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPpqLf0mO7EubT1jJVZqSvMKufxwFw11I",
  authDomain: "one-project-2f777.firebaseapp.com",
  projectId: "one-project-2f777",
  storageBucket: "one-project-2f777.appspot.com",
  messagingSenderId: "933978955081",
  appId: "1:933978955081:web:1397fe9d417f9aff4a4e98",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
