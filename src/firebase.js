import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBBjq8bEEWInB4K1VRh05qAMDp7PUmsyis",
  authDomain: "waste-management-41513.firebaseapp.com",
  projectId: "waste-management-41513",
  storageBucket: "waste-management-41513.appspot.com",
  messagingSenderId: "282348289589",
  appId: "1:282348289589:web:da0ded84c8142784cabb7c"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);

export default app;