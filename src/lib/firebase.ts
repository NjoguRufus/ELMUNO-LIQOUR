import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBXUc4O-Y_-YfAZgUfK_VSVNZR0-f-4XR4",
  authDomain: "spirit-haven-store.firebaseapp.com",
  projectId: "spirit-haven-store",
  storageBucket: "spirit-haven-store.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456ghi789jkl"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);