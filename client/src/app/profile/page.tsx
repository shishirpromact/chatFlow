"use client";

import ProfileForm from "@/components/forms/ProfileForm";

function ProfileScreen() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
          <p className="text-gray-500 mt-2">Update your personal information</p>
        </div>

        <ProfileForm />
      </div>
    </div>
  );
}

export default ProfileScreen;
