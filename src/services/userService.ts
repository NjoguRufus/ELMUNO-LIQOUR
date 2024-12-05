// src/services/userService.ts
import { getDatabase, ref, get, set } from 'firebase/database';

const db = getDatabase();

export const getUserProfile = async (uid: string) => {
  const userRef = ref(db, 'users/' + uid);
  const snapshot = await get(userRef);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    throw new Error('User not found');
  }
};

export const updateUserProfile = async (uid: string, profileData: { nickname: string, profileImage: string }) => {
  const userRef = ref(db, 'users/' + uid);
  await set(userRef, profileData);
};
