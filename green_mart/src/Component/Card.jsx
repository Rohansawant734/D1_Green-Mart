import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
const Card = () => {
  const offer = 600; // Example offer price for free shipping
  const shippingCharge = 199;
  const { cartItems, addToCart, updateQty, removeFromCart } = useCart();
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.offerPrice * item.quantity, 0);
  return (
    <div >
      <h2 className="text-6xl text-amber-900 font-bold mb-40 ">Your Cart</h2>
      <div className='flex  gap-4'>
        <div className='basis-3/4 gap-4 mt-6'>
          {cartItems.length === 0 ? (
            <div className="text-center mt-10 text-gray-600">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                alt="Empty cart"
                className="mx-auto w-40 h-40 opacity-70"
              />
              <p className="text-2xl font-semibold mt-6">Your cart is empty!</p>
              <p className="text-sm text-gray-400 mt-2">Looks like you haven’t added anything yet.</p>
              <Link to="/" className="mt-6 inline-block bg-gradient-to-r from-indigo-500 to-sky-500 text-white px-6 py-2 rounded hover:scale-105 transition">
                🛒 Start Shopping
              </Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-white p-4 mb-2 shadow rounded"
              >
                <div className="flex items-center gap-4">
                  <img src={item.image[0]} alt={item.name} className="w-14 h-14 object-contain" />
                  <div className="flex flex-col">
                    <p className="font-semibold">{item.name}</p>
                    <div className="text-sm text-red-600">₹{item.offerPrice} × {item.quantity}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4">
                  <button onClick={() => updateQty(item._id, -1)} className="border px-2" > − </button>
                  <span className='font-bold'>{item.quantity}</span>
                  <button onClick={() => {updateQty(item._id, 1); toast.info(`Increased quantity of ${item.name}`);}} className="border px-2" > +
                  </button>
                </div>
                <div className="font-bold text-red-600 " >
                  <button onClick={() => removeFromCart(item._id)} className='bg-red-600 font-bold text-white px-4 py-2 rounded hover:bg-red-800 '>Remove</button>
                  <span> ₹{(item.offerPrice * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))
          )}
          {cartItems.length > 0 && (
            <div className="flex gap-4 items-center mt-4 ">
              <Link to="/" className="bg-sky-900 bg-gradient-to-r from-sky-500 to-indigo-500 text-white px-4 py-2 rounded hover:bg-green-300">
                Continue Shopping
              </Link> </div>
          )}
          {subtotal < offer && cartItems.length > 0 && (
            <div className="text-center mt-2 text-sm text-orange-600 font-medium">
              Add ₹{offer - subtotal} more to get <span className="font-bold">Free Shipping!</span>
            </div>
          )}

          {subtotal >= offer && cartItems.length > 0 && (
            <div className="text-center mt-4">
              <h4>🎉 Congratulations! You get free shipping with your order greater than
                <span className="font-bold text-green-600"> ₹{offer}</span>.
              </h4>
            </div>
          )}
        </div>
        {/* Cart Summary */}
        <div className="basis-1/4 p-10 bg-white shadow rounded h-100 w-full mt-4 ">
          <div className="border-b pb-4 mb-4">
            <h3 className="text-lg font-semibold mb-4">Cart Total</h3>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span className="text-red-600 font-bold"> ₹{cartItems.length === 0 ? 0 : subtotal}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Shipping</span>
              <span className={subtotal >= offer ? "text-green-600 font-semibold" : ""}>
                {cartItems.length === 0 ? "₹0" : subtotal >= offer ? "Free" : `₹${shippingCharge}`}
              </span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2">
              <span>Total</span>
              <span className="text-red-600">
                ₹ {cartItems.length === 0 ? 0 : subtotal + (subtotal >= offer ? 0 : shippingCharge)}
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <Link to="/checkout" className={`w-full p-3 text-center rounded ${cartItems.length === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-900"}`}> Proceed To Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
