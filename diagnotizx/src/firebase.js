import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// ✅ Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPNRMGIMyCRIGED43KKtHVE_bWjz0p84k",
  authDomain: "diagnotix-pro.firebaseapp.com",
  projectId: "diagnotix-pro",
  storageBucket: "diagnotix-pro.appspot.com",
  messagingSenderId: "358922578618",
  appId: "1:358922578618:web:11f7d87074177fddd47083",
  measurementId: "G-K3CPZ6BPFT"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

setPersistence(auth, browserLocalPersistence)
  .then(() => console.log("Persistence set to local storage."))
  .catch((error) => console.error("Error setting persistence:", error));

export { auth, googleProvider, db, collection, doc, setDoc, getDoc, getDocs, onSnapshot, deleteDoc, updateDoc };
