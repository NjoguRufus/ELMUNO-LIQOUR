// src/context/AuthContext.tsx
import React, { createContext, useState, useContext } from 'react';
import { supabase } from '../lib/supabaseClient'; // Import your Supabase client

// Define the types for the context
interface AuthContextType {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  error: string | null;
}

// Create the context with undefined as initial value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component that will wrap your app
export const AuthProvider: React.FC = ({ children }) => {
  const [error, setError] = useState<string | null>(null);

  // Login function to authenticate users
  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signIn({ email, password });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Sign-up function to register users
  const signup = async (email: string, password: string, name: string) => {
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ login, signup, error }}>
      {children}
    </AuthContext.Provider>
  );
};
