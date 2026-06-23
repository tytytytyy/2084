import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxiR2fRtnf_D8aNDhI32mb60EiXdwxR3k",
  authDomain: "project-6780021934038110078.firebaseapp.com",
  projectId: "project-6780021934038110078",
  storageBucket: "project-6780021934038110078.firebasestorage.app",
  messagingSenderId: "343370727757",
  appId: "1:343370727757:web:528425c48f11fc9ce53704",
  measurementId: "G-RGMVGSS6N9"
};

// App initialisieren
const app = initializeApp(firebaseConfig);

// 🔥 DAS ist der wichtige Export
export const db = getFirestore(app);