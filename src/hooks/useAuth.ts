import { useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useStore } from '../store/useStore';

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          id: user.uid,
          email: user.email!,
          name: user.displayName || user.email!.split('@')[0]
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser]);

  const signup = async (email: string, password: string, name: string) => {
    try {
      setError(null);
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name });
      setUser({
        id: user.uid,
        email: user.email!,
        name
      });
    } catch (err) {
      const errorMessage = (err as Error).message;
      setError(
        errorMessage.includes('auth/email-already-in-use')
          ? 'This email is already registered.'
          : errorMessage.includes('auth/weak-password')
          ? 'Password should be at least 6 characters.'
          : 'An error occurred during signup.'
      );
      throw err;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      setUser({
        id: user.uid,
        email: user.email!,
        name: user.displayName || user.email!.split('@')[0]
      });
    } catch (err) {
      const errorMessage = (err as Error).message;
      setError(
        errorMessage.includes('auth/invalid-credential')
          ? 'Invalid email or password.'
          : 'An error occurred during login.'
      );
      throw err;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      setError((err as Error).message);
      throw err;
    }
  };

  return {
    loading,
    error,
    signup,
    login,
    logout
  };
};