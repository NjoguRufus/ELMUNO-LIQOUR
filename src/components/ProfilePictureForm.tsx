import React, { useState } from 'react';
import { updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, storage } from '../lib/firebase';
import { useStore } from '../store/useStore';
import { Upload } from 'lucide-react';

interface ProfilePictureFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const ProfilePictureForm = ({ onClose, onSuccess }: ProfilePictureFormProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user, setUser } = useStore();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file.');
        return;
      }
      if (file.size > maxSize) {
        setError('File size must be less than 2MB.');
        return;
      }
      setError('');
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setLoading(true);
    setError('');

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error('No user logged in');

      // Create a reference to the storage location
      const storageRef = ref(storage, `profile-pictures/${currentUser.uid}/${selectedFile.name}`);

      // Upload the file
      const snapshot = await uploadBytes(storageRef, selectedFile);

      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Update the user's profile with the new photo URL
      await updateProfile(currentUser, {
        photoURL: downloadURL,
      });

      // Reload the user to ensure updates are applied
      await currentUser.reload();

      // Update the store with the new photo URL
      setUser(
        user
          ? {
              ...user,
              photoUrl: downloadURL,
              id: user.id || currentUser.uid, // Ensure `id` is defined
            }
          : null
      );

      onSuccess();
    } catch (err) {
      console.error('Profile picture update error:', err);
      setError('Failed to update profile picture. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden mb-4">
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
          ) : user?.photoUrl ? (
            <img src={user.photoUrl} alt="Current" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Upload className="h-8 w-8 text-gray-400" />
            </div>
          )}
        </div>
        <label className="cursor-pointer bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors">
          Choose Photo
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
      </div>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading || !selectedFile}
          className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 disabled:opacity-50"
        >
          {loading ? 'Updating...' : 'Update Photo'}
        </button>
      </div>
    </form>
  );
};
