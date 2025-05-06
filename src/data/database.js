import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: "AIzaSyD3_sv5MZQ0bDVT6OVJsGTsDpUS_utILHc",
	authDomain: "riffrack-d12a3.firebaseapp.com",
	projectId: "riffrack-d12a3",
	storageBucket: "riffrack-d12a3.firebasestorage.app",
	messagingSenderId: "963122475101",
	appId: "1:963122475101:web:fcfd13ad6a3097eb149db4"
  };
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  export { db }