import { initializeApp } from 'firebase/app';
import { getAuth, browserLocalPersistence, setPersistence } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { firebaseConfig } from '../config/firebase.config';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firebase Storage
const storage = getStorage(app);

// Set persistence immediately
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log('Auth persistence set successfully');
  })
  .catch((error) => {
    console.error('Error setting auth persistence:', error);
  });

export { auth, storage };
export default app;