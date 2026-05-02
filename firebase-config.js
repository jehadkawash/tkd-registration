// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC52D9vAQcVtmq4du9F8M2iDbmmzKI2Bpk",
  authDomain: "tkd-registration.firebaseapp.com",
  projectId: "tkd-registration",
  storageBucket: "tkd-registration.firebasestorage.app",
  messagingSenderId: "396167495302",
  appId: "1:396167495302:web:af62fc1b5029f5e0ff5b07"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);