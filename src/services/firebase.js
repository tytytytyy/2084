import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "XXX",
  authDomain: "XXX",
  projectId: "XXX",
  storageBucket: "XXX",
  messagingSenderId: "XXX",
  appId: "XXX",
};

// App initialisieren
const app = initializeApp(firebaseConfig);

// 🔥 DAS ist der wichtige Export
export const db = getFirestore(app);