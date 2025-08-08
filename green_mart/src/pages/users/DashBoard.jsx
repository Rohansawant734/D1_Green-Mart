import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { FaUserCircle, FaEnvelope, FaPhone, FaUserTag } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { authUser } = useAuth();
  console.log("Auth User in Dashboard:", authUser); // Debugging line to check authUser
  const navigate = useNavigate(); // hook to navigate programmatically

  if (!authUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white shadow-md rounded-xl p-10 text-center w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">User Info Not Available</h2>
          <p className="text-gray-500 mb-6">Please log in to view your account details.</p>
          <button
            onClick={() => navigate('/login')}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
          Welcome, {authUser.firstName}!
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex items-center bg-gray-50 rounded-lg p-4 shadow-sm">
            <FaUserCircle className="text-green-600 text-2xl mr-4" />
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-semibold">{authUser.firstName} {authUser.lastName}</p>
            </div>
          </div>

          <div className="flex items-center bg-gray-50 rounded-lg p-4 shadow-sm">
            <FaEnvelope className="text-green-600 text-2xl mr-4" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold">{authUser.email}</p>
            </div>
          </div>

          <div className="flex items-center bg-gray-50 rounded-lg p-4 shadow-sm">
            <FaPhone className="text-green-600 text-2xl mr-4" />
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-semibold">{authUser.phone || "Not Provided"}</p>
            </div>
          </div>

          <div className="flex items-center bg-gray-50 rounded-lg p-4 shadow-sm">
            <FaUserTag className="text-green-600 text-2xl mr-4" />
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-semibold capitalize">{authUser.role || "User"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
