// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export default defineNuxtPlugin(() => {
  const firebaseConfig = {
    apiKey: "AIzaSyD8UQuSv-T3gpXVNOw8erhbqRp38yHDoh0",
    authDomain: "habitsapp-8d634.firebaseapp.com",
    projectId: "habitsapp-8d634",
    storageBucket: "habitsapp-8d634.appspot.com",
    messagingSenderId: "367584074228",
    appId: "1:367584074228:web:5b17d2f35ee11c3f6581a1",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  return {
    provide: {
      firebaseApp: app,
      db,
    },
  };
});
