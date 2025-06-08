import React, { useState } from 'react';
import { User, MapPin, ShoppingCart, Camera, Save, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const Settings: React.FC = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    fullAddress: user?.fullAddress || '',
    shoppingPreference: user?.shoppingPreference || '' as any
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const shoppingPreferences = [
    'Supermarket',
    'Local Market', 
    'Online Grocery',
    'Farmers Market',
    'Convenience Store'
  ];

  const generateRandomProfilePicture = () => {
    const avatarStyles = ['adventurer', 'avataaars', 'big-ears', 'big-smile', 'croodles', 'fun-emoji', 'icons', 'identicon', 'initials', 'lorelei', 'micah', 'miniavs', 'open-peeps', 'personas', 'pixel-art'];
    const randomStyle = avatarStyles[Math.floor(Math.random() * avatarStyles.length)];
    const randomSeed = Math.random().toString(36).substring(7);
    return `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${randomSeed}`;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.username)) {
      newErrors.username = 'Username must be alphanumeric';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.fullAddress.trim()) {
      newErrors.fullAddress = 'Address is required';
    }

    if (!formData.shoppingPreference) {
      newErrors.shoppingPreference = 'Please select a shopping preference';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Mock update - in real app, this would call an API
      await updateUser({
        ...user!,
        ...formData
      });
      
      // Show success and redirect
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateProfilePicture = () => {
    const newProfileImage = generateRandomProfilePicture();
    updateUser({
      ...user!,
      profileImage: newProfileImage
    });
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
            <p className="text-gray-500">Update your profile information</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
          {/* Profile Picture Section */}
          <div className="flex items-center space-x-6 mb-8 pb-8 border-b border-gray-200">
            <div className="relative">
              {user?.profileImage ? (
                <img 
                  src={user.profileImage} 
                  alt="Profile" 
                  className="w-20 h-20 rounded-full object-cover border-4 border-green-100"
                />
              ) : (
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center border-4 border-green-200">
                  <User className="w-10 h-10 text-green-600" />
                </div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Profile Picture</h3>
              <button
                onClick={handleGenerateProfilePicture}
                className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
              >
                <Camera className="w-4 h-4" />
                <span>Generate Random Avatar</span>
              </button>
            </div>
          </div>

          {/* Settings Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username *
              </label>
              <input
                id="username"
                type="text"
                required
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                className={`w-full px-4 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                  errors.username ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your username"
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className={`w-full px-4 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Full Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Full Address *
              </label>
              <div className="relative">
                <input
                  id="address"
                  type="text"
                  required
                  value={formData.fullAddress}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullAddress: e.target.value }))}
                  className={`w-full pl-12 pr-4 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                    errors.fullAddress ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="123 Main St, City, State, ZIP"
                />
                <MapPin className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
              </div>
              {errors.fullAddress && (
                <p className="mt-1 text-sm text-red-600">{errors.fullAddress}</p>
              )}
            </div>

            {/* Shopping Preference */}
            <div>
              <label htmlFor="shopping-preference" className="block text-sm font-medium text-gray-700 mb-2">
                Shopping Preference *
              </label>
              <div className="relative">
                <select
                  id="shopping-preference"
                  required
                  value={formData.shoppingPreference}
                  onChange={(e) => setFormData(prev => ({ ...prev, shoppingPreference: e.target.value as any }))}
                  className={`w-full pl-12 pr-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                    errors.shoppingPreference ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select your preference</option>
                  {shoppingPreferences.map(pref => (
                    <option key={pref} value={pref}>{pref}</option>
                  ))}
                </select>
                <ShoppingCart className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
              </div>
              {errors.shoppingPreference && (
                <p className="mt-1 text-sm text-red-600">{errors.shoppingPreference}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4 pt-6">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex-1 py-3 px-6 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 flex justify-center items-center space-x-2 py-3 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;