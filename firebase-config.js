// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA2Xr47GpaHZL0DKbjwlSJXmbO9dHWP9Uo',
  authDomain: 'wan-belleview.firebaseapp.com',
  projectId: 'wan-belleview',
  storageBucket: 'wan-belleview.appspot.com',
  messagingSenderId: '108132035520',
  appId: '1:108132035520:web:182f882be6f7b5430f7625',
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const Firestore = getFirestore(FirebaseApp);
