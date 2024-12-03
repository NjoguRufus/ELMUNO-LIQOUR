export const getAuthErrorMessage = (error: any): string => {
  const errorCode = error?.code || '';
  const errorMessages: Record<string, string> = {
    'auth/email-already-in-use': 'This email is already registered.',
    'auth/invalid-email': 'Invalid email address.',
    'auth/operation-not-allowed': 'Email/password accounts are not enabled. Please contact support.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/invalid-credential': 'Invalid email or password.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
    'auth/configuration-not-found': 'Firebase configuration error. Please check your setup.',
    'auth/invalid-api-key': 'Invalid API key. Please check your Firebase configuration.',
    'auth/app-deleted': 'Firebase app was deleted.',
    'auth/invalid-user-token': 'User credentials are no longer valid. Please sign in again.',
    'auth/user-token-expired': 'User credentials have expired. Please sign in again.'
  };

  return errorMessages[errorCode] || `Authentication error: ${error.message}`;
};