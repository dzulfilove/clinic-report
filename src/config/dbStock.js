import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbm64xiRxB7p6pIGb8hBCw2tAbMZzr7eo",
  authDomain: "examp-c310c.firebaseapp.com",
  projectId: "examp-c310c",
  storageBucket: "examp-c310c.appspot.com",
  messagingSenderId: "237756904927",
  appId: "1:237756904927:web:7d0fab229cc8857ae6406a",
};

let appExamp;

// cek apakah app bernama "examp" sudah ada
if (!getApps().some(app => app.name === "examp")) {
  appExamp = initializeApp(firebaseConfig, "examp");  // beri nama unik
  console.log("Firebase EXAMP initialized");
} else {
  appExamp = getApp("examp");
  console.log("Firebase EXAMP reused");
}

export const dbExampp = getFirestore(appExamp);
