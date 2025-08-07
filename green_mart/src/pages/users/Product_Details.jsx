import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiMinus, FiPlus } from "react-icons/fi";
import { FaHeart } from 'react-icons/fa';
import Rating from '../../Component/Rating';
import RatingSummary from '../../Component/RatingSummary';
import ReviewCard from '../../Component/ReviewCard';
import RelatedProductCard from '../../Component/RelatedProductCard';
import { dummyProducts } from '../../assets/assets';
import { useCart } from '../../Context/CartContext';

const Product_Details = ({ isWishlisted = false, toggleWishlist = () => { }, showWishlistIcon = false }) => {
  const { id } = useParams();
  const product = dummyProducts.find(p => p._id === id);

  const [count, setCount] = useState(1);
  const [userRating, setUserRating] = useState(0);
  const { addToCart } = useCart();

  if (!product) {
    return <p className="p-10 text-center text-red-500">Product not found.</p>;
  }

  const {
    _id,
    name = "Product Name",
    image = [],
    offerPrice = 0,
    description = [],
    inStock = 0,
    category = "general"
  } = product;

  const onRate = (ratingValue) => setUserRating(ratingValue);
  const onIncrement = () => setCount(prev => prev + 1);
  const onDecrement = () => setCount(prev => Math.max(1, prev - 1));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Title and Rating */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">{name}</h2>
        <div className="flex items-center mt-2">
          {[1, 2, 3, 4].map(i => (
            <svg key={i} className="w-4 h-4 text-yellow-400 me-1" fill="currentColor" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523...Z" />
            </svg>
          ))}
          <svg className="w-4 h-4 text-gray-300 me-1" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523...Z" />
          </svg>
          <p className="ml-2 text-sm text-gray-500">4.95 out of 5</p>
        </div>
      </div>

      {/* Product Info and Related Products */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Info */}
        <div className="lg:w-2/3 w-full bg-white p-6 rounded-lg shadow">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Image */}
            <div className="md:w-1/3 flex justify-center items-center">
              <img src={image} alt={name} className="max-h-60 object-contain" />
            </div>

            {/* Details */}
            <div className="md:w-2/3 flex flex-col gap-4 relative">
              <h4 className="text-xl font-bold text-gray-800">Rs. {offerPrice}</h4>
              {showWishlistIcon && (
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-0 right-0 text-gray-400 hover:text-red-500 text-lg"
                >
                  <FaHeart className={isWishlisted ? "text-red-500" : ""} />
                </button>
              )}
              <p className="text-gray-700 text-justify">{description[0]}</p>
              <p className="text-sm text-green-700 font-semibold">Availability: {inStock} in stock</p>

              {/* Quantity Control */}
              <div className="flex items-center border px-3 py-1 rounded-md w-fit">
                <button onClick={onDecrement}><FiMinus /></button>
                <span className="mx-4">{count}</span>
                <button onClick={onIncrement}><FiPlus /></button>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <button onClick={() => addToCart(product)} className="bg-blue-600 text-white px-4 py-2 rounded-md w-full sm:w-1/2">Add To Cart</button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-md w-full sm:w-1/2">Buy Now</button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="lg:w-1/3 w-full bg-white p-6 rounded-lg shadow">
          <h4 className="text-lg font-semibold mb-4">Related Products</h4>
          <RelatedProductCard currentProductId={_id} category={category} />
        </div>
      </div>

      {/* Product Description */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow">
        <h4 className="text-lg font-semibold mb-2">Product Description</h4>
        <ul className="list-disc pl-5 text-gray-700 text-justify space-y-1">
          {description.map((line, index) => (
            <li key={index}>{line}</li>
          ))}
        </ul>
      </div>

      {/* Rating Summary and Reviews */}
      <div className="mt-10">
        <RatingSummary />
        <ReviewCard />
      </div>

      {/* Review Form */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow">
        <h4 className="text-lg font-semibold mb-4">Add a Review</h4>

        <div className="mb-4">
          <span className="block mb-1 font-medium">Your Rating:</span>
          <Rating totalStars={5} initialRating={userRating} onRatingChange={onRate} />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Your Review:</label>
          <textarea className="w-full border rounded-md p-2 resize-none" rows={4} placeholder="Write your review..." />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Name<span className="text-red-500">*</span></label>
          <input type="text" required className="w-full border rounded-md p-2" placeholder="Enter your name" />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Email<span className="text-red-500">*</span></label>
          <input type="email" required className="w-full border rounded-md p-2" placeholder="Enter your email" />
        </div>

        <div className="mb-6">
          <input id="remember" type="checkbox" className="w-4 h-4 border-gray-300 rounded-sm" required />
          <label htmlFor="remember" className="ml-2 text-sm text-gray-900">Save my name and email in the browser for the next time I comment</label>
        </div>

        <button className="bg-green-600 text-white px-4 py-2 rounded-md w-full sm:w-1/2">Submit</button>
      </div>
    </div>
  );
};

export default Product_Details;
