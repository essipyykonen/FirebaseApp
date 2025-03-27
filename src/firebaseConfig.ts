import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBYM2yZlR0DHYbZLA_jMflhu-vekCZJxn8",
    authDomain: "labwork4-152ea.firebaseapp.com",
    projectId: "labwork4-152ea",
    storageBucket: "labwork4-152ea.firebasestorage.app",
    messagingSenderId: "831523590466",
    appId: "1:831523590466:web:fa14418a2619aad32838db",
    measurementId: "G-00RM0SH3YY"
};

firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function loginUser(email: string, password: string) {
    try {
        const res = await firebase.auth().signInWithEmailAndPassword(email, password);
        console.log("User logged in:", res.user);
        return res.user;
    } catch (error) {
        console.error("Login error:", error.message);
        return null;
    }
}

export async function registerUser(email: string, password: string) {
    try {
        const res = await firebase.auth().createUserWithEmailAndPassword(email, password);
        console.log("User registered:", res.user);
        return res.user;
    } catch (error) {
        console.error("Registration error:", error.message);
        return null;
    }
}
