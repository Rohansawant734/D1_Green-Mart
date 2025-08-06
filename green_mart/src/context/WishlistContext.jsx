import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

//  Replace this with dynamic user ID from auth or context
const userId = 2;

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // Fetch wishlist from backend
  const fetchWishlist = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/wishlist/${userId}`);
      setWishlist(response.data);
    } catch (error) {
      console.error("Failed to fetch wishlist", error);
    }
  };

  // Toggle wishlist item (add/remove)
  const toggleWishlist = async (product) => {
    try {
      await axios.post(`http://localhost:8080/wishlist/${userId}/${product._id}`);
      fetchWishlist(); // Re-fetch updated list
    } catch (error) {
      console.error("Failed to toggle wishlist", error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
