import React from 'react';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product, showWishlistIcon = false }) => {
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  const isWishlisted = wishlist.some(item => item.productId === product._id);

  return (
    <div className='relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition group'>
      {showWishlistIcon && (
        <button
          onClick={() => toggleWishlist(product)}
          className={`
            absolute top-3 right-3 text-xl z-10
            opacity-0 group-hover:opacity-100
            scale-90 group-hover:scale-110
            transition-all duration-300 ease-in-out
            ${isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}
          `}
        >
          <FaHeart />
        </button>
      )}
       
      <img src={product.image[0]} alt={product.name} className='w-full h-35 object-cover' />
      <div className='p-3'>
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="mt-2 font-bold text-green-600">₹{product.price}</p>
        <ul className="text-xs text-gray-600 my-2 list-disc list-inside text-left">
          {product.description?.slice(0, 2).map((line, index) => (
            <li key={index}>{line}</li>
          ))}
        </ul>
        <button
          onClick={() => addToCart(product)}
          className="mt-4 bg-green-500 text-white px-4 py-1 rounded flex items-center justify-center gap-2 hover:bg-green-600 transition"
        >
          <span>Add to Cart</span>
          <FaShoppingCart className='text-lg' />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
