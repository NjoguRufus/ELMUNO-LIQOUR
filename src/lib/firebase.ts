import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDv6IjcAYPgHrMvjjwWEUWlgIjZNDQRcgA",
  authDomain: "spitithaven.firebaseapp.com",
  projectId: "spitithaven",
  storageBucket: "spitithaven.firebasestorage.app",
  messagingSenderId: "713226050946",
  appId: "1:713226050946:web:6f66b5251c71255d29839b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);