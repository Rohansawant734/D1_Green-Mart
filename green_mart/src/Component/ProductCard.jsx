import React from 'react'
import { FaHeart } from 'react-icons/fa';
import { useCart } from '../context/CartCintext';
const ProductCard = ({product,isWishlisted = false, toggleWishlist = () => {}, showWishlistIcon = false}) => {
  const { addToCart } = useCart();
  return (
    <div className='relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition'>
       {showWishlistIcon && (
        <button
          onClick={() => toggleWishlist(product)}
          className="absolute top-3 right-3 text-lg text-gray-400 hover:text-red-500"
        >
          <FaHeart className={isWishlisted ? "text-red-500" : ""} />
        </button>
      )}

      <img src={product.image[0]} alt={product.name} className='w-full h-35 object-cover'/>
      <div className='p-3'>
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="mt-2 font-bold text-green-600">₹{product.price}</p>
         <ul className="text-xs text-gray-600 my-2 list-disc list-inside text-left">
          {product.description.slice(0, 2).map((line, index) => (
            <li key={index}>{line}</li>
          ))}
        </ul>
        <button onClick={() => addToCart(product)} className="mt-4 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600">
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard
