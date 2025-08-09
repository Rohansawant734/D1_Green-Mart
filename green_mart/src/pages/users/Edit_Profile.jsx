import React, { useEffect, useId, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getUser } from '../../services/user';
import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const Edit_Profile = () => {
  const { authUser, fetchProfile, updateProfile, changePassword } = useAuth()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    userId: ''
  })

  useEffect(() => {
    const loadProfile = async () => {
      if (!authUser) {
        toast.info("Please login to access your profile.")
        // return
      }
      else {
        const res = await fetchProfile();
        if (res.success && res.data) {
          const user = res.data;
          setFormData((prev) => ({
            ...prev,
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            email: user.email || '',
            phone: user.phone || '',
            userId: user.userId || ''
          }));
        } else {
          toast.error(res.error || "Failed to load profile");
        }
      }
    };

    loadProfile();
  }, []);


  const onInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const onUpdateProfile = async (e) => {
    e.preventDefault()

    if (!authUser) {
      toast.info("Please login to update your profile.")
    }
    else {
      await updateProfile(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.phone
      )
    }

  }

  const onUpdatePassword = async (e) => {
    e.preventDefault()

    if (!authUser) {
      toast.info("Please login to update your password.")
    }
    else {
      if (formData.newPassword !== formData.confirmNewPassword) {
        toast.warn("New passwords do not match")
        return
      }

      if (!isValidPassword(formData.newPassword)) {
        toast.warn("New password must be 5-20 characters long, include at least one digit, one lowercase letter, and one special character (#@$*).")
        return
      }

      const result = await changePassword(formData.oldPassword, formData.newPassword)

      if (result.success) {
        toast.success("Successfully updated password")
        setFormData({
          oldPassword: '',
          newPassword: '',
          confirmNewPassword: ''
        })
      }
      else {
        toast.error(result.error || "Old password is incorrect")
      }

    }
  }

  const isValidPassword = (pwd) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[#@$*]).{5,20}$/
    return regex.test(pwd);
  }

  return (
    <div className="md:col-span-3 bg-white p-6">
      <h2 className="text-2xl font-bold text-green-600 mb-6">Edit Profile</h2>

      <form className="space-y-5" onSubmit={onUpdateProfile}>
        <div>
          <label className="block text-gray-700 font-medium mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName || ''}
            onChange={onInputChange}
            placeholder="Your first name"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName || ''}
            onChange={onInputChange}
            placeholder="Your last name"
            className="w-full border border-gray-300 px-4 py-2 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email || ''}
            onChange={onInputChange}
            placeholder="you@example.com"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone || ''}
            onChange={onInputChange}
            placeholder="+91 9876543210"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className='text-right'>
          <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-700 transition">Save changes</button>
        </div>
      </form>

      <h3 className="text-2xl font-bold text-green-600 mb-6 mt-8">Change Password</h3>

      <form className="space-y-5" onSubmit={onUpdatePassword}>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Current Password</label>
          <input
            type="password"
            name="oldPassword"
            value={formData.oldPassword || ''}
            onChange={onInputChange}
            placeholder="Enter current password"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword || ''}
            onChange={onInputChange}
            placeholder="Enter new password"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Confirm New Password</label>
          <input
            type="password"
            name="confirmNewPassword"
            value={formData.confirmNewPassword || ''}
            onChange={onInputChange}
            placeholder="Confirm new password"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
          >
            Change Password
          </button>
        </div>
      </form>
    </div >
  );
};

export default Edit_Profile;
