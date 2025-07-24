import React from 'react'
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  ShoppingCartIcon,
  CloudArrowDownIcon,
  MapPinIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
const DashBoard = () => {
   const navLinkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-semibold transition ${
      isActive ? 'bg-green-500 text-white' : 'text-gray-800 hover:bg-green-300'
    }`;
  return (
    //  <div className="bg-white py-10 px-15 rounded-xl shadow-md">
    <div className="bg-gradient-to-br from-white-100 to-green-100 py-10 px-15 ">
      <h1 className="text-3xl font-bold text-center mb-8">Welcome to Your Account</h1>
      <p className="text-center text-gray-600 mb-6">From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.</p>
    </div>

  )
}

export default DashBoard;
