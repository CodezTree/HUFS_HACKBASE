// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

// Firebase 설정 (Firebase 콘솔에서 복사)
const firebaseConfig = {
  apiKey: "AIzaSyDAF5LYRnkQL9u-3JM--D6VnjuzBXOECdQ",
  authDomain: "hufsthon-highfive.firebaseapp.com",
  projectId: "hufsthon-highfive",
  storageBucket: "hufsthon-highfive.firebasestorage.app",
  messagingSenderId: "543341914349",
  appId: "1:543341914349:web:4042b324a2adac4374c4e4",
  measurementId: "G-JP8RJGFBR5"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);