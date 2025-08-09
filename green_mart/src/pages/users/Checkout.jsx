import React, { useState } from 'react';
import axios from 'axios';
import { useCart } from './../../context/CartContext';
import { useAuth } from './../../context/AuthContext';
import { useAddress } from './../../context/AddressContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import BillingDetails from '../../Component/BillingDetails';

const Checkout = () => {
  const offer = 600;
  const shippingCharge = 199;
  const { cartItems } = useCart();
  const { authUser } = useAuth();
  const { selectedAddress } = useAddress();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    agreeTerms: false,
    paymentMethod: '', // Backend enums: CASH_ON_DELIVERY, CREDIT_CARD, DEBIT_CARD, UPI, NET_BANKING
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const subtotal =
    cartItems.length > 0
      ? cartItems.reduce((acc, item) => acc + item.offerPrice * item.quantity, 0)
      : 0;

  const shipping = subtotal >= offer || subtotal === 0 ? 0 : shippingCharge;
  const total = subtotal + shipping;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agreeTerms) {
      toast.error('You must agree to the terms and conditions.');
      return;
    }
    if (!formData.paymentMethod) {
      toast.error('Please select a payment method.');
      return;
    }
    if (!selectedAddress) {
      toast.error('Please select a delivery address.');
      return;
    }
    if (!authUser?.id) {
      toast.error('You must be logged in to place an order.');
      return;
    }

    // Build order payload matching OrderRequestDTO
    const orderPayload = {
      userId: authUser.id,
      addressId: selectedAddress.id,
      orderLines: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        discount: 0, // Adjust if needed
        price: item.offerPrice,
      })),
      paymentMethod: formData.paymentMethod, // already matches backend enum
      deliveryCharges: shipping,
    };

    try {
      const res = await axios.post('http://localhost:8080/orders/place', orderPayload);
      toast.success(res.data.message || 'Order placed successfully!');

      // Navigate to order confirmation or order details
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
            address: `${selectedAddress.adrLine1}, ${selectedAddress.city}, ${selectedAddress.state} - ${selectedAddress.zipCode}`,
            phone: formData.phone,
          },
        },
      });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to place order');
    }
  };

  return (
    <>
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8"
      >
        {/* Billing Details */}
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <BillingDetails onChange={handleChange} />
        </div>

        {/* Order Summary */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Order</h2>
          <div className="border border-gray-300 rounded-lg p-4 space-y-3">
            {cartItems.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between bg-white p-2 mb-2 shadow rounded"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      className="w-14 h-14 object-contain"
                    />
                    <div className="flex flex-row gap-5 items-center">
                      <span className="font-semibold">{item.productName}</span>
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
              <span
                className={
                  subtotal >= offer || subtotal === 0
                    ? 'text-green-600 font-semibold'
                    : ''
                }
              >
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
            <div className="flex flex-col space-y-3">
              {['CASH_ON_DELIVERY', 'CREDIT_CARD', 'DEBIT_CARD', 'UPI', 'NET_BANKING'].map(
                (method) => (
                  <label
                    key={method}
                    className="flex items-center p-3 rounded bg-gray-100 hover:bg-green-100"
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={formData.paymentMethod === method}
                      onChange={handleChange}
                      className="accent-green-600 w-5 h-5"
                    />
                    <span className="ml-2">
                      {method.replace(/_/g, ' ').toLowerCase()}
                    </span>
                  </label>
                )
              )}
            </div>

            {/* Terms */}
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
                  <a href="#" className="text-green-600 underline ml-1">
                    terms and conditions
                  </a>
                  <span className="text-red-500">*</span>
                </span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={cartItems.length === 0}
            className={`mt-6 w-full text-white py-3 rounded-lg transition ${
              cartItems.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-900'
            }`}
          >
            Place Order
          </button>
        </div>
      </form>
    </>
  );
};

export default Checkout;
