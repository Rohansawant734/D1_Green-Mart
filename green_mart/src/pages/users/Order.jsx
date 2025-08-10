import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
 

const Order = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state;
  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Your Orders</h2>
          <p className="text-center text-gray-600 mb-6">You have no orders yet.</p>
          <div className="text-center">
            <button
              onClick={() => navigate('/')}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
    );
  }
  const subtotal = order.cartItems.reduce(
    (sum, item) => sum + item.offerPrice * item.quantity,
    0
  );
  const shipping = subtotal >= 600 ? 0 : 199;
  const total = subtotal + shipping;

   
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white p-6 shadow-md rounded-md">
        {/*  Order Received Summary */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Order received</h2>
          <p className="text-gray-600 mb-6">Thank you. Your order has been received.</p>

          <div className="bg-gray-100 p-4 rounded-md grid grid-cols-1 md:grid-cols-5 text-sm font-medium text-gray-700">
            <div className="border-r border-gray-300 px-3 py-2">
              <span className="block text-xs text-gray-500">ORDER NUMBER:</span>
              <span className="font-bold text-black">{order.orderNumber}</span>
            </div>
            <div className="border-r border-gray-300 px-3 py-2">
              <span className="block text-xs text-gray-500">DATE:</span>
              <span className="font-bold text-black">{today}</span>
            </div>
            <div className="border-r border-gray-300 px-3 py-2">
              <span className="block text-xs text-gray-500">EMAIL:</span>
              <span className="font-bold text-black">{order.email}</span>
            </div>
            <div className="border-r border-gray-300 px-3 py-2">
              <span className="block text-xs text-gray-500">TOTAL:</span>
              <span className="font-bold text-black">₹{total}</span>
            </div>
            <div className="px-3 py-2">
              <span className="block text-xs text-gray-500">PAYMENT METHOD:</span>
              <span className="font-bold text-black capitalize">
                {order.paymentMethod === 'Cash_On_Delivery' ? 'Cash On Delivery' : order.paymentMethod}
              </span>
            </div>
          </div>

          <p className="mt-3 text-sm text-gray-600">
            Pay with {order.paymentMethod === 'Cash_On_Delivery' ? 'Cash On Delivery' : order.paymentMethod}.
          </p>
        </div>

        {/* Product Table */}
        <h3 className="text-2xl font-semibold mb-4">Order Details</h3>
        <table className="min-w-full border border-gray-300 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-sm font-semibold">Product</th>
              <th className="border border-gray-300 px-4 py-2 text-sm font-semibold text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.cartItems.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2 text-gray-700">
                  {item.productName} × {item.quantity}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right text-red-600 font-semibold">
                  ₹{item.offerPrice * item.quantity}
                </td>
              </tr>
            ))}

            <tr className="bg-gray-50 font-semibold">
              <td className="border border-gray-300 px-4 py-2">Subtotal:</td>
              <td className="border border-gray-300 px-4 py-2 text-right text-red-600">₹{subtotal}</td>
            </tr>

            <tr>
              <td className="border border-gray-300 px-4 py-2">Shipping:</td>
              <td className="border border-gray-300 px-4 py-2 text-right">
                {shipping === 0 ? <span className="font-bold text-green-500">Free Shipping</span> : `₹${shipping}`}
              </td>
            </tr>

            <tr className="bg-gray-100 font-bold text-lg">
              <td className="border border-gray-300 px-4 py-3">Total:</td>
              <td className="border border-gray-300 px-4 py-3 text-right text-red-600">₹{total}</td>
            </tr>
          </tbody>
        </table>
        <table className="w-full border mt-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left text-lg font-semibold border-2">Shipping Address</th>
              <th className="p-3 text-left text-lg font-semibold border-2">Billing Address</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4 border-r align-top">
                <p className="text-gray-700">Name: {order.customer.name}</p>
                <p className="text-gray-700">Address: { order.customer.address}</p>
                <p className="text-gray-700">
                  Location: { order.customer.location }
                </p>
                <p className="text-gray-700">Phone: {order.customer.phone}</p>
              </td>

              <td className="p-4 align-top">
                <p className="text-gray-700">Name: {order.customer.name}</p>
                <p className="text-gray-700">Address: { order.customer.address}</p>
                <p className="text-gray-700">
                  Location: {order.customer.location}
                </p>
                <p className="text-gray-700">Phone: {order.customer.phone}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Order;
