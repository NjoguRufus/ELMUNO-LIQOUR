import React, { useState } from 'react';
import { Shield, Eye, Lock } from 'lucide-react';

interface PrivacySettingsProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const PrivacySettings = ({ onClose, onSuccess }: PrivacySettingsProps) => {
  const [settings, setSettings] = useState({
    profileVisibility: 'public',
    activityStatus: true,
    orderHistory: 'private'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save these settings to your backend
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Eye className="h-5 w-5 text-amber-500" />
            <div>
              <p className="font-medium">Profile Visibility</p>
              <p className="text-sm text-gray-500">Control who can see your profile</p>
            </div>
          </div>
          <select
            value={settings.profileVisibility}
            onChange={(e) => setSettings({ ...settings, profileVisibility: e.target.value })}
            className="rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="friends">Friends Only</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-5 w-5 text-amber-500" />
            <div>
              <p className="font-medium">Activity Status</p>
              <p className="text-sm text-gray-500">Show when you're active</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.activityStatus}
              onChange={(e) => setSettings({ ...settings, activityStatus: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Lock className="h-5 w-5 text-amber-500" />
            <div>
              <p className="font-medium">Order History</p>
              <p className="text-sm text-gray-500">Control who can see your orders</p>
            </div>
          </div>
          <select
            value={settings.orderHistory}
            onChange={(e) => setSettings({ ...settings, orderHistory: e.target.value })}
            className="rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
          >
            <option value="private">Private</option>
            <option value="public">Public</option>
          </select>
        </div>
      </div>

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
          className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};