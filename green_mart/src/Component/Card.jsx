import React, { useState } from 'react';

const Card = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Apple', qty: 2, price: 10 },
    { id: 2, name: 'Banana', qty: 3, price: 5 },
    { id: 3, name: 'Orange', qty: 1, price: 8 },
    { id: 4, name: 'Grapes', qty: 4, price: 12 },
    { id: 5, name: 'Mango', qty: 2, price: 15 },
    { id: 6, name: 'Pineapple', qty: 1, price: 20 },
    { id: 7, name: 'Strawberry', qty: 5, price: 7 },
    { id: 8, name: 'Blueberry', qty: 3, price: 9 },
    { id: 9, name: 'Watermelon', qty: 2, price: 18 },
    ]);

  const total = cartItems.reduce((sum, item) => sum + item.qty * item.price, 0);

  const handleRemove = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleQtyChange = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: newQty } : item))
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Your Shopping Cart</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm">
            <thead className="text-left bg-gray-100 text-gray-700 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Qty</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Subtotal</th>
                <th className="px-4 py-3 text-center">Remove</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {cartItems.map((item) => (
                <tr key={item.id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-4 py-4 font-medium">{item.name}</td>
                  <td className="px-4 py-4 flex items-center space-x-2">
                    <button
                      onClick={() => handleQtyChange(item.id, item.qty - 1)}
                      className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 text-xl font-bold"
                    >
                      −
                    </button>
                    <span className="w-8 text-center">{item.qty}</span>
                    <button
                      onClick={() => handleQtyChange(item.id, item.qty + 1)}
                      className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 text-xl font-bold"
                    >
                      +
                    </button>
                  </td>
                  <td className="px-4 py-4">₹{item.price.toFixed(2)}</td>
                  <td className="px-4 py-4">₹{(item.qty * item.price).toFixed(2)}</td>
                  <td className="px-4 py-4 text-center">
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded font-medium"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-right">
          <span className="text-2xl font-semibold text-gray-900">
            Total: ₹ {total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
