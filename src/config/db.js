import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Validasi konfigurasi
const validateFirebaseConfig = (config) => {
  const requiredFields = ["apiKey", "authDomain", "projectId", "appId"];
  const missingFields = requiredFields.filter((field) => !config[field]);

  if (missingFields.length > 0) {
    console.error(
      "Firebase configuration error: Missing fields",
      missingFields
    );
    return false;
  }

  return true;
};

// Initialize Firebase
let app;
let db;

try {
  if (validateFirebaseConfig(firebaseConfig)) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log("Firebase initialized successfully");
  } else {
    console.error("Firebase configuration is invalid");
  }
} catch (error) {
  console.error("Error initializing Firebase:", error);
}

// Fallback untuk development jika environment variables belum di-set
if (!db) {
  console.warn("Firebase not initialized. Using dummy mode for development.");

  // Buat mock db object untuk development
  db = {
    collection: () => ({
      getDocs: () => Promise.resolve([]),
      doc: () => ({}),
    }),
  };
}

export { db, app };
