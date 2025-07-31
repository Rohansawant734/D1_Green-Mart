import React, { useState } from 'react'
import { useCart } from './../../context/CartContext';

const Checkout = () => {
  const offer = 600; // Example offer price for free shipping
  const shippingCharge = 50;
  const { cartItems } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: '',
    createAccount: false,
    agreeTerms: false,
    paymentMethod: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreeTerms) {
      alert('You must agree to the terms and conditions.');
      return;
    }
    if (!formData.paymentMethod) {
      alert('Please select a payment method.');
      return;
    }
    // Replace this with actual order processing
    console.log('Order placed:', formData);
    alert('Order placed successfully!');
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.offerPrice * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  const inputClass = "w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500";

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8 ">
      {/* Billing Details */}
      <div >
        <h2 className="text-2xl font-semibold mb-4">Billing Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className={inputClass} required />
          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className={inputClass} required />
        </div>
        <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} className={`${inputClass} mt-4`} required />
        <input type="text" name="street" placeholder="Street Address" value={formData.street} onChange={handleChange} className={`${inputClass} mt-4`} required />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <input type="text" name="city" placeholder="Town / City" value={formData.city} onChange={handleChange} className={inputClass} required />
          <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} className={inputClass} required />
          <input type="text" name="zip" placeholder="ZIP Code" value={formData.zip} onChange={handleChange} className={inputClass} required />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className={inputClass} required />
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className={inputClass} required />
        </div>
        <div className="mt-4 flex items-center">
          <input type="checkbox" id="createAccount" name="createAccount" checked={formData.createAccount} onChange={handleChange} className="mr-2" />
          <label htmlFor="createAccount" className="text-gray-700">Create an account?</label>
        </div>
        <div className="mt-4 flex items-center">
          <input type="checkbox" id="agreeTerms" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} className="mr-2" required />
          <label htmlFor="agreeTerms" className="text-gray-700">I have read and agree to the terms and conditions</label>
        </div>
      </div>

      {/* Order Summary */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Order</h2>
        <div className="border border-gray-300 rounded-lg p-4 space-y-3">
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className="flex  justify-between bg-white p-2 mb-2 shadow rounded">
                <div className="flex items-center gap-4">
                  <img src={item.image[0]} alt={item.name} className="w-14 h-14 object-contain" />
                  <div className="flex flex-row gap-50">
                    <span className="font-semibold">{item.name}</span>
                    <span className="text-sm text-red-600">₹{item.offerPrice} × {item.quantity}</span>
                  </div>
                </div>
              </div>
            ))
          )}
          <div className="flex justify-between font-semibold">
            <span>Subtotal</span>
            <span className="text-red-600 font-bold"> ₹{cartItems.length === 0 ? 0 : subtotal}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className={subtotal >= offer ? "text-green-600 font-semibold" : ""}>
              {cartItems.length === 0 ? "₹0" : subtotal >= offer ? "Free" : `₹${shippingCharge}`}
            </span>
          </div>
          <div className="flex justify-between text-xl font-bold border-t pt-2">
            <span>Total</span>
             <span className="text-red-600">
                ₹ {cartItems.length === 0 ? 0 : subtotal + (subtotal >= offer ? 0 : shippingCharge)}
              </span>
          </div>
        </div>

        {/* Payment Methods */}

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3">Payment Method</h2>

          <div className="space-y-3">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                value="bank"
                className="accent-orange-500"
              />
              <span>Direct Bank Transfer</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                value="check"
                className="accent-orange-500"
              />
              <span>Check Payments</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                className="accent-orange-500"
              />
              <span>Cash On Delivery</span>
            </label>
          </div>

          <div className="mt-4">
            <label className="flex items-center space-x-2 text-sm">
              <input type="checkbox" required />
              <span>
                I agree to the
                <a href="#" className="text-green-600 underline ml-1">terms and conditions</a>
                <span className="text-red-500">*</span>
              </span>
            </label>


          </div>
        </div>


        <button type="submit" className="mt-6 w-full bg-green-600 hover:bg-green-900 text-white py-3 rounded-lg transition">
          Place Order
        </button>
      </div>
    </form>
  )
}

export default Checkout
{/* <div className="space-y-3">
            <label className="flex items-center space-x-2 p-2 rounded cursor-pointer transition-all duration-300 hover:bg-green-100">
              <input
                type="radio"
                name="paymentMethod"
                value="bank"
                className="accent-green-600 w-4 h-4"
              />
              <span>Direct Bank Transfer</span>
            </label>

            <label className="flex items-center space-x-2 p-2 rounded cursor-pointer transition-all duration-300 hover:bg-green-100">
              <input
                type="radio"
                name="paymentMethod"
                value="check"
                className="accent-green-600 w-4 h-4"
              />
              <span>Check Payments</span>
            </label>

            <label className="flex items-center space-x-2 p-2 rounded cursor-pointer transition-all duration-300 hover:bg-green-100">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                className="accent-green-600 w-4 h-4"
              />
              <span>Cash On Delivery</span>
            </label>
          </div> */}