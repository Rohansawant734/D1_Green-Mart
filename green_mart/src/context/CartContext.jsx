import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
  const exist = cartItems.find(item => item._id === product._id);

  if (exist) {
    setCartItems(prev =>
      prev.map(item =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      )   
    );
    toast.warning(`Product is already in the cart!`);  
  } else {
    setCartItems([...cartItems, { ...product, quantity: 1 }]);
    toast.success(`${product.name} added to cart..`);
  }
};
  const updateQty = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item._id === id
            ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };
  const removeFromCart = (id) => {
  setCartItems((prev) => prev.filter(item => item._id !== id));
};

const clearCart = () => {
  setCartItems([]);
};


  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQty , removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
