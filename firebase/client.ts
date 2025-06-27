// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLzrhD2N1p3D0--hv7-LsSkV-RWsY6_pg",
  authDomain: "prepai-8460b.firebaseapp.com",
  projectId: "prepai-8460b",
  storageBucket: "prepai-8460b.firebasestorage.app",
  messagingSenderId: "519053690471",
  appId: "1:519053690471:web:9b36c008c377d2225f76c2",
  measurementId: "G-FXBZN5RX0J",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);