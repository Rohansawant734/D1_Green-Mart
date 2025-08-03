import React, { useState } from 'react';
import { useCart } from './../../context/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
 

const Checkout = () => {
  const offer = 600;
  const shippingCharge = 199;
  const { cartItems } = useCart();
  const navigate = useNavigate();

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
  const validateBillingFields = () => {
    const { firstName, lastName, country, street, city, state, zip, phone, email } = formData;

    if (!firstName.trim()) {
      toast.error('First name is required');
      return false;
    }
    if (!lastName.trim()) {
      toast.error('Last name is required');
      return false;
    }
    if (!country) {
      toast.error('Country is required');
      return false;
    }
    if (!street.trim()) {
      toast.error('Street address is required');
      return false;
    }
    if (!city.trim()) {
      toast.error('City is required');
      return false;
    }
    if (!state) {
      toast.error('State is required');
      return false;
    }
    if (!zip.trim()) {
      toast.error('ZIP / Postal Code is required');
      return false;
    }
    if (!phone.trim()) {
      toast.error('Phone number is required');
      return false;
    }
    if (!email.trim() || !email.includes('@')) {
      toast.error('A valid email is required');
      return false;
    }

    return true;
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateBillingFields();
    if (!isValid) return;
    if (!formData.agreeTerms) {
      toast.error('You must agree to the terms and conditions.');
      return;
    }

    console.log('Order placed:', formData);

  navigate('/orders', {
  state: {
    orderNumber: Math.floor(1000 + Math.random() * 9000),
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    email: formData.email,
    total,
    paymentMethod: formData.paymentMethod,
    cartItems,
    customer: {
      name: `${formData.firstName} ${formData.lastName}`,
      address: `${formData.street}, ${formData.city}, ${formData.state}, ${formData.zip}, ${formData.country}`,
      phone: formData.phone,
    }
  },
});

     
  };

  const subtotal = cartItems.length > 0 ? cartItems.reduce((acc, item) => acc + item.offerPrice * item.quantity, 0) : 0;

  const shipping = subtotal >= offer || subtotal === 0 ? 0 : shippingCharge;

  const total = subtotal + shipping;


  return (
    <>

      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
        {/* Billing Details */}
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-6">Billing Details</h2>


              />
            </div>


              />
            </div>


              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country / Region <span className="text-red-500">*</span>
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 outline-none"
              >
                <option value="">Select Country</option>
                <option>India</option>
                <option>USA</option>
                <option>UK</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="House number and street name"
                className="w-full border border-gray-300 rounded-md p-2 mb-2 focus:ring-2 focus:ring-green-500 outline-none"
              />
              <input
                type="text"
                placeholder="Apartment, suite, unit, etc. (optional)"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Town / City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State <span className="text-red-500">*</span>
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 outline-none"
              >
                <option value="">Select State</option>
                <option>Maharashtra</option>
                <option>Gujarat</option>
                <option>Karnataka</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ZIP / Postal Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                placeholder="Your ZIP code"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone number"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email address"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="shipToDifferentAddress"
                  className="accent-green-600 w-4 h-4"
                />
                <span className="text-sm">Ship to a different address?</span>
              </label>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order notes <span className="text-gray-400">(optional)</span>
              </label>
              <textarea
                rows="4"
                placeholder="Notes about your order"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 outline-none"
              ></textarea>
            </div>
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
                <div key={index} className="flex justify-between bg-white p-2 mb-2 shadow rounded">
                  <div className="flex items-center gap-4">
                    <img src={item.image[0]} alt={item.name} className="w-14 h-14 object-contain" />
                    <div className="flex flex-row  gap-50 items-center">
                      <span className="font-semibold">{item.name}</span>

                      <span className="text-sm text-red-600">
                        ₹{item.offerPrice} × {item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
            <hr />
            <div className="flex justify-between font-semibold">
              <span>Subtotal</span>
              <span className="text-red-600 font-bold">₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className={subtotal >= offer || subtotal === 0 ? "text-green-600 font-semibold" : ""}>
                {subtotal >= offer || subtotal === 0 ? 'Free' : `₹${shippingCharge}`}
              </span>
            </div>
            <div className="flex justify-between text-xl font-bold border-t pt-2">
              <span>Total</span>
              <span className="text-red-600">₹{total}</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-3">Payment Method</h2>
           <div className="flex flex-col space-y-3 ">
              {['Direct_Bank_Transfer', 'Check_Payments', 'Cash_on_Delivery'].map((method) => (
                <label key={method} className="flex items-center  p-3 rounded bg-gray-100 hover:bg-green-100">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={formData.paymentMethod === method}
                    onChange={handleChange}
                    className="accent-green-600  w-10 h-4"
                  />
                  <span className="capitalize">
                    {method === 'Direct_Bank_Transfer' && 'Direct Bank Transfer'}
                    {method === 'Check_Payments' && 'Check Payments'}
                    {method === 'Cash_on_Delivery' && 'Cash on Delivery'}
                  </span>
                </label>
              ))}
            </div>

            <div className="mt-4">
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                />
                <span>
                  I agree to the
                  <a href="#" className="text-green-600 underline ml-1">terms and conditions</a>
                  <span className="text-red-500">*</span>
                </span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={cartItems.length === 0}
            className={`mt-6 w-full text-white py-3 rounded-lg transition ${cartItems.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-900'
              }`}
            onClick={handleSubmit}
          > Place Order
          </button>
        </div>
      </form>
    </>
  );
};

export default Checkout;
