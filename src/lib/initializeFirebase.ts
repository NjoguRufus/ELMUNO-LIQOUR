import { auth } from './firebase';

export const initializeFirebase = async () => {
  try {
    // Wait for auth to be ready
    await auth._initializationPromise;
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    throw error;
  }
};