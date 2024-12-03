export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateCredentials = (email: string, password: string): void => {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
  if (!validateEmail(email)) {
    throw new Error('Invalid email format');
  }
  if (!validatePassword(password)) {
    throw new Error('Password must be at least 6 characters');
  }
};