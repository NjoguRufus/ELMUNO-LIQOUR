import { initializeApp } from 'firebase/app';
import { getAuth, browserLocalPersistence, setPersistence } from 'firebase/auth';
import { firebaseConfig } from '../config/firebase.config';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Set persistence immediately
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log('Auth persistence set successfully');
  })
  .catch((error) => {
    console.error('Error setting auth persistence:', error);
  });

export { auth };
export default app;