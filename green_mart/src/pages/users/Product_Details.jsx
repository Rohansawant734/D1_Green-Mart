// src/pages/users/Product_Details.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { FaHeart } from 'react-icons/fa';
const ProductDetails = () => {
  const { id } = useParams(); // Get product ID from route
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const {addToCart} = useCart();
   // get wishlist and toggleWishlist from context
  const { wishlist, toggleWishlist } = useWishlist();
  console.log("Wishlist items:", wishlist);
  // Check if product is in wishlist
  const getId = (obj) => obj._id || obj.id;

const isWishlisted = product && wishlist.some(item => getId(item) === getId(product));

  console.log("Component mounted. Product ID from URL:", id);
  const fetchProduct = async () => {
    console.log("📡 Fetching product with ID:", id);
    try {
      const response = await axios.get(`http://localhost:8080/products/${id}`);
      console.log(" Product API response:", response);
      setProduct(response.data);
    } catch (error) {
      console.error(" Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    console.log("Fetching product with id:", id);
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="p-6 text-blue-500">Loading product...</div>;
  }

  if (!product?.id) {
    return <div className="p-6 text-red-500">Product not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-8">
      {/* Left Side - Product Image */}
      <div className="md:w-1/2 flex justify-center items-start">
        <img
          src={product.proimage}
          alt={product.prodName}
          className="w-3/4 max-w-sm h-auto object-contain rounded shadow-md"
        />
      </div>

      {/* Right Side - Details */}
      <div className="md:w-1/2 relative">
        <h1 className="text-3xl font-bold mb-2">{product.prodName}</h1>
        <p className="text-gray-600 mb-1">Category: {product.categoryName}</p>
        <p className="text-gray-600 mb-1">Supplier: {product.supplierName}</p>
        <p className="text-sm text-gray-600 mb-4">Unit: {product.unit}</p>

        <p className="text-lg font-semibold text-green-700 mb-2">
          Price: ₹{product.offerPrice || product.price}
          {product.offerPrice && (
            <span className="line-through text-gray-500 ml-2 text-base">
              ₹{product.price}
            </span>
          )}
        </p>

        <p className={`text-sm font-medium mb-4 ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </p>

        <ul className="list-disc list-inside text-sm text-gray-700 mb-4">
          {product.description?.split(',').map((line, index) => (
            <li key={index} className="mb-1 text-gray-600">{line.trim()}</li>
          ))}
        </ul>

        {/* Wishlist Icon */}
        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute top-0 right-0 text-2xl ${
            isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
          }`}
          aria-label="Toggle Wishlist"
        >
          <FaHeart />
        </button>

        <button
          className="bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600 mt-4"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
