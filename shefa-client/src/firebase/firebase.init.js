// src/firebase/firebase.init.js

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import firebaseConfig from "./firebase.config";

// ✅ Prevent duplicate app error
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// 🔥 Firebase services
export const auth = getAuth(app);
export const db = getDatabase(app);