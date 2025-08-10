import React, { useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

const Card = () => {
  const offer = 600;
  const shippingCharge = 199;
  const { cartItems, updateQty, removeFromCart, clearCart } = useCart();
  const hasWarned = useRef(false);
  // useEffect(() => {
  //     console.log("Updated cartItems in component:", cartItems);
  //   }, [cartItems]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.offerPrice ?? 0) * item.quantity,
    0
  );

  const handleDecrement = (item) => {
    console.log("Decrementing item:", item);
    if (item.quantity > 1) {
      const newQty = item.quantity - 1;
      updateQty(item.productId, newQty);
      toast.info(`Decreased quantity of ${item.productName}`);
    }
  };

  const handleIncrement = (item) => {
    console.log("Incrementing item:", item);
    const newQty = item.quantity + 1;
    updateQty(item.productId, newQty);
    toast.info(`Increased quantity of ${item.productName}`);
  };

  const handleRemove = (item) => {
    removeFromCart(item.productId);
    toast.warn(`${item.productName} removed from cart`);
  };
  const { authUser, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !authUser) {
      navigate('/login'); // Redirect to login if not authenticated
      if (!hasWarned.current) {
        toast.warn("You must log in to view your cart", {        
          style: {
            background: "#199960", // dark background
            color: "#fff",          // white text 
          },  
        });

        hasWarned.current = true;
      }
    }
  }, [authUser, loading ,navigate]);

  if (!authUser) {
    return null; // Prevent rendering before redirect
  }

  return (
    <div >
      <h2 className="text-6xl text-amber-900 font-bold mb-40">Your Cart</h2>

      <div className="flex gap-4 ">
        {/* Left Side: Cart Items */}
        <div className="basis-3/4 gap-4 mt-6">
          {cartItems.length === 0 ? (
            <div className="text-center mt-10 text-gray-600">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                alt="Empty cart"
                className="mx-auto w-40 h-40 opacity-70"
              />
              <p className="text-2xl font-semibold mt-6">Your cart is empty!</p>
              <p className="text-sm text-gray-400 mt-2">
                Looks like you haven’t added anything yet.
              </p>
              <Link
                to="/"
                className="mt-6 inline-block bg-gradient-to-r from-indigo-500 to-sky-500 text-white px-6 py-2 rounded hover:scale-105 transition"
              >
                🛒 Start Shopping
              </Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.productId}
                className="flex items-center justify-between bg-white p-4 mb-2 shadow rounded"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.imageUrl}
                    alt={item.productName}
                    className="w-14 h-14 object-contain"
                  />
                  <div>
                    <p className="font-semibold">{item.productName}</p>
                    <div className="text-sm text-red-600">
                      ₹{item.offerPrice} × {item.quantity}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4">
                  <button
                    onClick={() => handleDecrement(item)}
                    className="border px-2"
                  >
                    −
                  </button>
                  <span className="font-bold">{item.quantity}</span>
                  <button
                    onClick={() => handleIncrement(item)}
                    className="border px-2"
                  >
                    +
                  </button>
                </div>
                <div className="font-bold text-red-600 text-right">
                  <button
                    onClick={() => handleRemove(item)}
                    className="bg-red-600 font-bold text-white px-4 py-2 rounded hover:bg-red-800 mb-1"
                  >
                    Remove
                  </button>
                  <div>₹{(item.offerPrice * item.quantity).toFixed(2)}</div>
                </div>
              </div>
            ))
          )}

          {cartItems.length > 0 && (
            <>
              <div className="flex gap-10 items-center mt-4">
                <span><Link
                  to="/"
                  className="bg-sky-900 bg-gradient-to-r from-sky-500 to-indigo-500 text-white px-4 py-2 rounded hover:bg-green-300"
                >
                  Continue Shopping
                </Link></span>
                <span><button
                  onClick={clearCart}
                  className=" bg-orange-900 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded hover:bg-red-300"
                >
                  Clear Cart
                </button>
                </span>

              </div>

              {subtotal < offer ? (
                <div className="text-center mt-2 text-sm text-orange-600 font-medium">
                  Add ₹{offer - subtotal} more to get{' '}
                  <span className="font-bold">Free Shipping!</span>
                </div>
              ) : (
                <div className="text-center mt-4">
                  <h4>
                    🎉 Congratulations! You get free shipping with your order over{' '}
                    <span className="font-bold text-green-600">₹{offer}</span>.
                  </h4>
                </div>
              )}
            </>
          )}
        </div>

        {/* Right Side: Cart Summary */}
        <div className="basis-1/4 p-10 bg-white shadow rounded h-100 w-full mt-4">
          <div className="border-b pb-4 mb-4">
            <h3 className="text-lg font-semibold mb-4">Cart Total</h3>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span className="text-red-600 font-bold">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Shipping</span>
              <span className={subtotal >= offer && cartItems.length > 0 ? 'text-green-600 font-semibold' : ''}>
                {cartItems.length === 0
                  ? '₹0.00'
                  : subtotal >= offer
                    ? 'Free'
                    : `₹${shippingCharge}`}
              </span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2">
              <span>Total</span>
              <span className="text-red-600">
                ₹{cartItems.length === 0
                  ? '0.00'
                  : (subtotal + (subtotal >= offer ? 0 : shippingCharge)).toFixed(2)}

              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <Link
              to={cartItems.length === 0 ? '#' : '/checkout'}
              onClick={(e) => {
                if (cartItems.length === 0) {
                  e.preventDefault(); // Block navigation if the cart is empty
                  toast.warn("Your cart is empty!");
                }
              }}
              className={`w-full p-3 text-center rounded ${cartItems.length === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-900'
                }`}
            >
              Proceed To Checkout
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
