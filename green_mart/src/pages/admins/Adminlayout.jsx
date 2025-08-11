import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  StarIcon,
  TruckIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

const Adminlayout = () => {
  const { logout, authUser } = useAuth();

  const navLinkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-semibold transition ${isActive ? 'bg-green-500 text-white' : 'text-gray-800 hover:bg-green-300'
    }`;

  const onLogout = () => {
    if(!authUser){
      toast.info("You are not logged in. Please log in first.");
      navigate('/login')
      return
    }

    logout()
    toast.success('Logged out successfully!');
    navigate('/login')
  }

  return (
    <div className="grid grid-cols-12 gap-4 min-h-screen p-4 bg-green-100">
      <aside className="col-span-12 sm:col-span-3 bg-white p-6 rounded-lg shadow-md text-center">
        <div className='mb-6'>
        <h2 className='text-lg font-semibold text-gray-800'>
          Welcome, {authUser?.firstName} {authUser?.lastName}
        </h2>
        <p className='text-sm text-gray-500'> {authUser?.email} </p>
        </div>
        <nav>
          <ul className="space-y-8">
            <li>
              <NavLink to="/admin" className={navLinkStyle}>
                <HomeIcon className="w-5 h-5" />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/Users" className={navLinkStyle}>
                <UsersIcon className="w-5 h-5" />
                Customers
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/categories" className={navLinkStyle}>
                <ClipboardDocumentListIcon className="w-5 h-5" />
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/products" className={navLinkStyle}>
                <ShoppingBagIcon className="w-5 h-5" />
                Products
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/orders" className={navLinkStyle}>
                <TruckIcon className="w-5 h-5" />
                Orders
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/suppliers" className={navLinkStyle}>
                <UsersIcon className="w-5 h-5" />
                Suppliers
              </NavLink>
            </li>
            {/* <li>
              <NavLink to="/admin/payments" className={navLinkStyle}>
                <CurrencyDollarIcon className="w-5 h-5" />
                Payment Status
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/reviews" className={navLinkStyle}>
                <StarIcon className="w-5 h-5" />
                Reviews & Ratings
              </NavLink>
            </li> */}
            <li>
              <NavLink to="/login" onClick={onLogout} className={navLinkStyle}>
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                Logout
              </NavLink>
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

export default Adminlayout;
