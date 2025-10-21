import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgboiVkuRTWIxUJo4HivzlRpkMRrd3JjQ",
  authDomain: "vortex-coin.firebaseapp.com",
  projectId: "vortex-coin",
  storageBucket: "vortex-coin.firebasestorage.app",
  messagingSenderId: "906174929501",
  appId: "1:906174929501:web:c3e06b29e550060d98cbb4",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
