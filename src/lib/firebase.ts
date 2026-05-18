import { initializeApp, getApps, getApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAY2xz07N95k9FsYVku_SsJVa0g1QXHjzs",
  authDomain: "nikus-andhra-kitchen.firebaseapp.com",
  projectId: "nikus-andhra-kitchen",
  storageBucket: "nikus-andhra-kitchen.firebasestorage.app",
  messagingSenderId: "805781820374",
  appId: "1:805781820374:web:7020d6cbd2153693e44a77",
};

const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

export const db = getFirestore(app);

export const auth = getAuth(app);

export default app;