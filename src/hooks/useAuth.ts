import { useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useStore } from '../store/useStore';
import { validateCredentials } from '../utils/validation';
import { getAuthErrorMessage } from '../utils/errorHandling';

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
      validateCredentials(email, password);
      
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      if (user) {
        await updateProfile(user, { displayName: name });
        setUser({
          id: user.uid,
          email: user.email!,
          name
        });
      }
    } catch (err) {
      const errorMessage = getAuthErrorMessage(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      validateCredentials(email, password);
      
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      setUser({
        id: user.uid,
        email: user.email!,
        name: user.displayName || user.email!.split('@')[0]
      });
    } catch (err) {
      const errorMessage = getAuthErrorMessage(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      const errorMessage = getAuthErrorMessage(err);
      setError(errorMessage);
      throw new Error(errorMessage);
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