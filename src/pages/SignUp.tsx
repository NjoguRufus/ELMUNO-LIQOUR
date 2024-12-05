import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { AlertCircle } from 'lucide-react';
import { auth } from '../lib/firebase'; // Import Firebase auth
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export const SignUp = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [isLoading, setIsLoading] = useState(false);
const { signup, error } = useAuth();
const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
if (password !== confirmPassword) {
alert('Passwords do not match');
return;
}
setIsLoading(true);
try {
await signup(email, password);
navigate('/');
} catch (err) {
setIsLoading(false);
}
};

const handleGoogleSignIn = async () => {
const provider = new GoogleAuthProvider();
try {
await signInWithPopup(auth, provider);
navigate('/'); // Navigate to the home page after successful sign-up
} catch (error) {
console.error('Google Sign-Up Error:', error);
}
};

return (
<div className="min-h-screen pt-20 bg-gray-100 flex items-center justify-center">
<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
>
<h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>
{error && (
<motion.div
initial={{ opacity: 0, y: -10 }}
animate={{ opacity: 1, y: 0 }}
className="bg-red-50 text-red-500 p-4 rounded-lg mb-6 flex items-center gap-2"
>
<AlertCircle className="h-5 w-5" />
<p>{error}</p>
</motion.div>
)}
<form onSubmit={handleSubmit} className="space-y-4">
<div>
<label className="block text-gray-700 mb-2">Email</label>
<input
type="email"
value={email}
onChange={(e) => setEmail(e.target.value)}
className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
required
/>
</div>
<div>
<label className="block text-gray-700 mb-2">Password</label>
<input
type="password"
value={password}
onChange={(e) => setPassword(e.target.value)}
className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
required
/>
</div>
<div>
<label className="block text-gray-700 mb-2">Confirm Password</label>
<input
type="password"
value={confirmPassword}
onChange={(e) => setConfirmPassword(e.target.value)}
className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
required
/>
</div>
<button
type="submit"
disabled={isLoading}
className="w-full bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
>
{isLoading ? 'Creating account...' : 'Sign Up'}
</button>
</form>
<div className="mt-4">
<button
onClick={handleGoogleSignIn}
className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
>
Sign up with Google
</button>
</div>
<p className="mt-4 text-center text-gray-600">
Already have an account?{' '}
<Link to="/login" className="text-amber-500 hover:text-amber-600">
Log in
</Link>
</p>
</motion.div>
</div>
);
};