import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product, showWishlistIcon = false }) => {
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  const isWishlisted = wishlist.some(
  item => item.productId === (product.id || product._id)
);


  return (
    <div className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition group flex flex-col">

      {/* Wishlist Icon */}
      {showWishlistIcon && (
        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute top-3 right-5 text-xl z-10 
            opacity-0 group-hover:opacity-100
            scale-90 group-hover:scale-120
            transition-all duration-300 ease-in-out
      ${isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}
    `}
        >
          <FaHeart />
        </button>
      )}


      {/* Product Image */}
      <Link to={`/product/${product._id || product.id}`} className="flex-grow">
        <img
          src={product.image?.[0]}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-3">
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.category}</p>
          <p className="mt-2 font-bold text-green-600">₹{product.price}</p>
          <ul className="text-xs text-gray-600 my-2 list-disc list-inside text-left">
            {product.description?.slice(0, 2).map((line, index) => (
              <li key={index}>{line}</li>
            ))}
          </ul>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <button
        onClick={() => addToCart(product)}
        className="bg-green-500 text-white py-2 px-4 flex items-center justify-center gap-2 
          hover:bg-green-600 transition w-full text-sm font-medium"
      >
        <span>Add to Cart</span>
        <FaShoppingCart className="text-lg" />
      </button>
    </div>
  );
};

export default ProductCard;
