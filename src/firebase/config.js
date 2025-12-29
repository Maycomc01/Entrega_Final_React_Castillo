import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyClNn_aqRCTV84WRoCStvTpRInDLVx-ZYQ",
  authDomain: "juanita-libreria.firebaseapp.com",
  projectId: "juanita-libreria",
  storageBucket: "juanita-libreria.firebasestorage.app",
  messagingSenderId: "265535697549",
  appId: "1:265535697549:web:acd34c427eb3c128a1a8c4",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);