'use client';

import ProfileEditModal from '@/components/ui/profile-editmodal';
import { useToast } from '@/components/ui/toast-notification';
import React, { useState, useEffect } from 'react';

interface UserProfile {
  fullName: string;
  email: string;
  password: string;
}

const ProfilePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {showToast} = useToast();
  const [userProfile, setUserProfile] = useState<UserProfile>({
    fullName: '',
    email: '',
    password: ''
  });

  // ✅ Fetch profile data from Django when page loads
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('jwtToken'); // store your JWT when logging in
        const res = await fetch('http://localhost:8000/api/profile/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // send token to backend
          }
        });

        if (res.ok) {
          const data = await res.json();
          setUserProfile(data);
        } else {
          console.error('Failed to fetch profile', await res.text());
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  // ✅ Save profile data to backend
  const handleSave = async (data: UserProfile) => {
    setUserProfile(data);
    try {
      const token = localStorage.getItem('jwtToken');
      const res = await fetch('http://localhost:8000/api/profile/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        showToast("Profile updated successfully!", "success");
      } else {
        console.error('Error updating profile', await res.text());
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Profile Management</h1>
          <p className="text-gray-600">Your Personal Information</p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Name:</span>
            <span className="font-medium">{userProfile.fullName}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Email:</span>
            <span className="font-medium">{userProfile.email}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Password:</span>
            <span className="font-medium">••••••••</span>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-medium shadow-lg flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit Profile
        </button>

        <ProfileEditModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialData={userProfile}
          onSave={handleSave}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
