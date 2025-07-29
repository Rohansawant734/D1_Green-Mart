import React, { useEffect, useState } from 'react';
import { FaHeart, FaShoppingCart, FaArrowUp } from 'react-icons/fa';
import {  useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from './../context/WishlistContext';

const FloatingStack = () => {
  const [showStack, setShowStack] = useState(false);
  const navigate = useNavigate();
  // Show the stack only when scrolled down more than 10px
  // This is to avoid showing it immediately on page load
  const { cartItems } = useCart(); // We have a CartContext to get cart items
  const { wishlist } = useWishlist(); // We have a WishlistContext to get wishlist items

  useEffect(() => {
    const handleScroll = () => {
      // Show only when scrolled more than 10px down
      if (window.scrollY > 100) {
        setShowStack(true);
      } else {
        setShowStack(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

   

  return (
     <div
      className={`
        fixed right-4 bottom-24 flex flex-col items-center space-y-3 z-50
        transform transition-all duration-500 ease-in-out
        ${showStack ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'}
      `}
    >
      {/* Wishlist */}
      <div
        className="relative bg-white p-3 rounded-xl shadow-md hover:bg-orange-100 transition"
        onClick={() => navigate('/wishlist')}
      >
        <FaHeart className="w-6 h-6 text-gray-700" />
        <span className="absolute -top-1 -right-1 bg-orange-400 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {wishlist.length}
        </span>
      </div>

      {/* Cart */}
      <div
        className="relative bg-white p-3 rounded-xl shadow-md hover:bg-orange-100 transition"
        onClick={() => navigate('/cart')}
      >
        <FaShoppingCart className="w-6 h-6 text-gray-700" />
        <span className="absolute -top-1 -right-1 bg-orange-400 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {cartItems.length}
        </span>
      </div>

      {/* Scroll to Top */}
      <div
        className="bg-white p-3 rounded-xl shadow-md cursor-pointer hover:bg-orange-100 transition"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <FaArrowUp className="w-6 h-6 text-gray-700" />
      </div>
    </div>
  );
};

export default FloatingStack;
