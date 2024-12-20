import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LogOut, ShoppingBag, User as UserIcon, Settings } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useAuth } from '../hooks/useAuth';
import { EditProfileForm } from '../components/EditProfileForm';
import { ChangePasswordForm } from '../components/ChangePasswordForm';
import { ProfilePictureForm } from '../components/ProfilePictureForm';
import { NotificationSettings } from '../components/NotificationSettings';
import { PrivacySettings } from '../components/PrivacySettings';

type SettingsForm = 'profile' | 'password' | 'picture' | 'notifications' | 'privacy' | null;

export const Profile = () => {
  const { user } = useStore();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const [activeForm, setActiveForm] = useState<SettingsForm>(null);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    setActiveForm(null);
  };

  const handleFormSuccess = () => {
    setActiveForm(null);
    setShowSettings(false);
  };

  const renderForm = () => {
    switch (activeForm) {
      case 'profile':
        return <EditProfileForm onClose={() => setActiveForm(null)} onSuccess={handleFormSuccess} />;
      case 'password':
        return <ChangePasswordForm onClose={() => setActiveForm(null)} onSuccess={handleFormSuccess} />;
      case 'picture':
        return <ProfilePictureForm onClose={() => setActiveForm(null)} onSuccess={handleFormSuccess} />;
      case 'notifications':
        return <NotificationSettings onClose={() => setActiveForm(null)} onSuccess={handleFormSuccess} />;
      case 'privacy':
        return <PrivacySettings onClose={() => setActiveForm(null)} onSuccess={handleFormSuccess} />;
      default:
        return (
          <ul className="space-y-4">
            <li className="flex items-center justify-between">
              <span>Edit Profile</span>
              <button
                className="text-amber-500 hover:text-amber-600 transition"
                onClick={() => setActiveForm('profile')}
              >
                Edit
              </button>
            </li>
            <li className="flex items-center justify-between">
              <span>Change Password</span>
              <button
                className="text-amber-500 hover:text-amber-600 transition"
                onClick={() => setActiveForm('password')}
              >
                Edit
              </button>
            </li>
            <li className="flex items-center justify-between">
              <span>Update Profile Picture</span>
              <button
                className="text-amber-500 hover:text-amber-600 transition"
                onClick={() => setActiveForm('picture')}
              >
                Edit
              </button>
            </li>
            <li className="flex items-center justify-between">
              <span>Manage Notifications</span>
              <button
                className="text-amber-500 hover:text-amber-600 transition"
                onClick={() => setActiveForm('notifications')}
              >
                Edit
              </button>
            </li>
            <li className="flex items-center justify-between">
              <span>Privacy Settings</span>
              <button
                className="text-amber-500 hover:text-amber-600 transition"
                onClick={() => setActiveForm('privacy')}
              >
                Edit
              </button>
            </li>
          </ul>
        );
    }
  };

  return (
    <div className="pt-20 max-w-4xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-8"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-amber-500 rounded-full p-4">
            <UserIcon className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-50 p-6 rounded-lg cursor-pointer"
            onClick={() => navigate('/orders')}
          >
            <ShoppingBag className="h-6 w-6 text-amber-500 mb-2" />
            <h2 className="text-lg font-semibold mb-2">Order History</h2>
            <p className="text-gray-600">View your past orders and track current deliveries</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-50 p-6 rounded-lg cursor-pointer"
            onClick={toggleSettings}
          >
            <Settings className="h-6 w-6 text-amber-500 mb-2" />
            <h2 className="text-lg font-semibold mb-2">Account Settings</h2>
            <p className="text-gray-600">Update your profile and preferences</p>
          </motion.div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </motion.div>

      <AnimatePresence>
        {showSettings && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-center">Account Settings</h2>
              {renderForm()}
              {!activeForm && (
                <button
                  onClick={toggleSettings}
                  className="mt-6 w-full bg-gray-100 text-gray-600 py-2 rounded-lg hover:bg-gray-200 transition"
                >
                  Close
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};