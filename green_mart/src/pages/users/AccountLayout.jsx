import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import {
  HomeIcon,
  ShoppingCartIcon,
  MapPinIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
const AccountLayout = () => {
  const { logout, authUser } = useAuth();

  const navLinkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-semibold transition ${isActive ? 'bg-green-500 text-white' : 'text-gray-800 hover:bg-green-300'
    }`;

  const onLogout = () => {
    if(!authUser){
      toast.info('You are not logged in. Please log in first.')
      // return
    }
    else{
      logout()
      toast.success('Logged out successfully!');
      navigate('/')
    }

  }
  return (
    <div className="grid grid-cols-12 gap-4 min-h-screen p-4 bg-green-100">
      <aside className="col-span-12 sm:col-span-3 bg-white p-6 rounded-lg shadow-md text-center">
        <nav>
          <ul className="space-y-8">
            <li>
              <NavLink to="/account" className={navLinkStyle}>
                <HomeIcon className="w-5 h-5" />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/account/your-orders" className={navLinkStyle}>
                <ShoppingCartIcon className="w-5 h-5" />
                Orders
              </NavLink>
            </li>
            <li>
              <NavLink to="/account/addresses" className={navLinkStyle}>
                <MapPinIcon className="w-5 h-5" />
                Addresses
              </NavLink>
            </li>
            <li>
              <NavLink to="/account/edit-profile" className={navLinkStyle}>
                <UserCircleIcon className="w-5 h-5" />
                Edit Profile
              </NavLink>
            </li>
            <li>
              {/* <div className="flex items-center gap-4"> */}
                <NavLink onClick={onLogout} className='flex items-center gap-3 px-3 py-2 rounded-md text-sm font-semibold transition text-gray-800 hover:bg-green-300'>
                  <ArrowRightOnRectangleIcon className="w-5 h-5" />
                  Logout
                </NavLink>
              {/* </div> */}
            </li>
          </ul>
        </nav>
      </aside>

      <section className="col-span-12 sm:col-span-9 bg-white p-6 rounded-lg shadow-md">
        <Outlet />
      </section>
    </div>
  );
};

export default AccountLayout;
