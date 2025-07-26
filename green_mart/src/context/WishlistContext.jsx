import React, { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
    const exists = prevWishlist.some((item) => item._id === product._id);

    if (exists) {
      return prevWishlist.filter((item) => item._id !== product._id);
    } else {
      return [...prevWishlist, product];
    }
  });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
