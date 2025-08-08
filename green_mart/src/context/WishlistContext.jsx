import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);
 //   logged-in user ID
const userId = JSON.parse(localStorage.getItem("user"))?.userId;

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { authUser } = useAuth(); // Get authUser from AuthContext
  const userId = authUser?.userId; // Reactive user ID

  // Fetch wishlist from backend
  const fetchWishlist = async () => {
      if (!userId) {
      setWishlist([]); // Clear wishlist if no user
      return;
    }
    try {
      const response = await axios.get(`http://localhost:8080/wishlist/${userId}`);
      setWishlist(response.data || []); 
    } catch (error) {
      console.error("Failed to fetch wishlist", error);
    }
  };

  // Toggle wishlist item (add/remove)
 const toggleWishlist = async (product) => {
  if (!userId) {
    toast.warn("Please log in to manage your wishlist");
    return;
  }

  const productId = product._id || product.id;

  if (!productId) {
    console.error("Product ID not found");
    return;
  }

  try {
    await axios.post(`http://localhost:8080/wishlist/${userId}/${productId}`);
    fetchWishlist();
    toast.success("Wishlist updated");
  } catch (error) {
    console.error("Failed to toggle wishlist", error);
  }
};


  //  Run when user logs in or out
  useEffect(() => {
    if (userId) {
      fetchWishlist(); // Load wishlist for current user
    } else {
      setWishlist([]); // Clear wishlist on logout
    }
  }, [userId]);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
