import React, { useState } from 'react';
import { useCart } from '../context/CartCintext';
import { Link } from 'react-router-dom';
const Card = () => {

  const { cartItems, addToCart, updateQty, removeFromCart } = useCart();
  const [page, setPage] = useState(1);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.offerPrice * item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen bg-gray-50">
      {page === 1 ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Cart</h2>
          {cartItems.length === 0 ? (
           <div>
            <p className="text-gray-500 text-xl">Your cart is empty.</p>
            <Link to="/" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-300"> Continue Shopping</Link>
           </div>
           
          ) : (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-white p-4 mb-2 shadow rounded"
              >
                <div className="flex items-center gap-4">
                  <img src={item.image[0]} alt={item.name} className="w-14 h-14 object-contain" />
                  <div flex="flex flex-col">
                    <p className="font-semibold">{item.name}</p>
                    <div className="text-sm text-red-600">₹{item.offerPrice} × {item.quantity}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4">
                  <button onClick={() => updateQty(item._id, -1)} className="border px-2" > − </button>
                  <span className='font-bold'>{item.quantity}</span>
                  <button onClick={() => updateQty(item._id, 1)} className="border px-2" > + </button>
                </div>

                <div className="font-bold text-red-600 " >
                 <button onClick={() => removeFromCart(item._id)} className='bg-red-600 font-bold text-white px-4 py-2 rounded hover:bg-red-800 '>Remove</button>
                 <span> ₹{(item.offerPrice * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))
          )}

          {cartItems.length > 0 && (
            <div className="text-right mt-6">
              <button
                onClick={() => setPage(2)}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Proceed to Address →
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Shipping & Billing</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-lg font-semibold mb-4">Billing Address</h3>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border p-2 mb-2 rounded"
              />
              <input
                type="text"
                placeholder="Address"
                className="w-full border p-2 mb-2 rounded"
              />
              <input
                type="text"
                placeholder="City"
                className="w-full border p-2 mb-2 rounded"
              />
              <input
                type="text"
                placeholder="Pin Code"
                className="w-full border p-2 mb-2 rounded"
              />
            </div>

            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border p-2 mb-2 rounded"
              />
              <input
                type="text"
                placeholder="Address"
                className="w-full border p-2 mb-2 rounded"
              />
              <input
                type="text"
                placeholder="City"
                className="w-full border p-2 mb-2 rounded"
              />
              <input
                type="text"
                placeholder="Pin Code"
                className="w-full border p-2 mb-2 rounded"
              />
            </div>
          </div>

          {/* Cart Summary */}
          <div className="bg-white p-6 rounded shadow max-w-md ml-auto">
            <h3 className="text-lg font-semibold mb-4">Cart Total</h3>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span className="text-red-600 font-bold">₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Shipping</span>
              <span>Not available yet</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2">
              <span>Total</span>
              <span className="text-red-600">₹{subtotal}</span>
            </div>
            <button className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
              Place Order
            </button>
            <button
              className="mt-2 text-sm underline text-gray-600"
              onClick={() => setPage(1)}
            >
              ← Back to Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
