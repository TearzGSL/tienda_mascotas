// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-HCQKyd6lbyy0ulDgvHxQZAjtbRHTpIk",
  authDomain: "tiendamascotas-cf819.firebaseapp.com",
  projectId: "tiendamascotas-cf819",
  storageBucket: "tiendamascotas-cf819.appspot.com",
  messagingSenderId: "802916178281",
  appId: "1:802916178281:web:d4cc59bdda56a4405b05f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
