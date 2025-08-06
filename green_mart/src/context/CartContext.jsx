import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Create context
const CartContext = createContext();

// Custom hook
export const useCart = () => useContext(CartContext);
//loggd user userId
const userId = JSON.parse(localStorage.getItem("user"))?.userId;

// Provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
   

  // Fetch cart data for the user
  const fetchCart = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/cart/user/${userId}`);
      setCartItems(response.data.items || []); // Assuming CartDTO structure
    } catch (error) {
      console.error("Error fetching cart:", error);
      // toast.error("Failed to load cart items");
    }
  };

 const addToCart = async (product) => {

  try {
    const response = await axios.post(
      `http://localhost:8080/cart/add`,
      null,
      {
        params: {
          userId: userId,
          productId: product._id,  
          quantity: 1,
        },
      }
    );
    toast.success(response.data.message || `${product.prodName} added`);
    await fetchCart();
  } catch (error) {
    console.error("Add to cart error:", error);
    toast.error(error.response?.data?.message || "Error adding to cart");
  }
};
  // Update quantity of product
const updateQty = async (productId, quantity) => {
  try {
    await axios.put(`http://localhost:8080/cart/update`, null, {
      params: {
        userId: userId,
        productId:productId,
        quantity:quantity,
      },
    });
    await fetchCart();
  } catch (error) {
    console.error("Update quantity error:", error);
    // toast.error("Failed to update quantity");
  }
};

  // Remove product from cart
  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/cart/remove`, {
        params: {
          userId: userId,
          productId: productId,
        },
      });
      //  toast.success(response.data.message || "Removed from cart");
      await fetchCart();
    } catch (error) {
      console.error("Remove from cart error:", error);
      toast.error(error.response?.data?.message || "Error removing item");
    }
  };
  const clearCart = async () => {
      
  try {
    await axios.delete(`http://localhost:8080/cart/clear`, {
      params: { userId },
    });
     
    await fetchCart(); // Refresh cart after clearing
      toast.success("Cart cleared successfully");
    
    setCartItems([]); // update local state to empty
  } catch (error) {
    console.error("Error clearing cart:", error);
  }
};

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
