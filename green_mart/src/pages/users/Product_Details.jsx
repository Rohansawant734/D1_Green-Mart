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

  const onRate = (ratingValue) => {
    setUserRating(ratingValue);
  };

  const onIncrement = () => setCount((prev) => prev + 1);
  const onDecrement = () => setCount((prev) => Math.max(1, prev - 1));

  return (
    <div>
      {/* Title and Rating */}
      <div className="ml-50 mt-30">
        <div className="flex flex-row gap-2">
          <h2>{name}</h2>
        </div>

        <div className="flex items-center mb-2">
          {[1, 2, 3, 4].map((i) => (
            <svg key={i} className="w-4 h-4 text-yellow-300 me-1" fill="currentColor" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523...Z" />
            </svg>
          ))}
          <svg className="w-4 h-4 text-gray-300 me-1" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523...Z" />
          </svg>
          <p className="ms-1 text-sm font-medium text-gray-500">4.95 out of 5</p>
        </div>
      </div>

      {/* Product Details + Related Products Row */}
      <div className="flex flex-col lg:flex-row gap-8 rounded-lg p-6 ml-20 mr-10">
        {/* Left: Image + Info */}
        <div className="flex flex-col sm:flex-row gap-8 w-full lg:w-2/3">
          {/* Product Image */}
          <div className="sm:w-1/3 w-full flex justify-center items-center">
            <img src={image} alt={name} className="max-h-60 object-contain" />
          </div>

          {/* Product Info & Actions */}
          <div className="sm:w-2/3 w-full flex flex-col gap-4 p-4 relative">
            <div>
              <h4 className="text-xl font-bold text-gray-800">Rs. {offerPrice}</h4>
              {showWishlistIcon && (
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-3 right-3 text-lg text-gray-400 hover:text-red-500"
                >
                  <FaHeart className={isWishlisted ? "text-red-500" : ""} />
                </button>
              )}
            </div>

            <p className="text-gray-700 text-justify">{description}</p>
            <p className="text-sm text-green-700 font-semibold">Availability: {inStock} in stock</p>

            <div className="flex items-center border w-fit px-3 py-1 rounded-md">
              <button onClick={onDecrement}><FiMinus className="text-gray-600" /></button>
              <span className="mx-4 font-medium">{count}</span>
              <button onClick={onIncrement}><FiPlus className="text-gray-600" /></button>
            </div>

            <div className="flex flex-col sm:flex-col gap-4 mt-4">
              <button onClick={() => addToCart(product)} className="bg-blue-600 text-white px-4 py-2 rounded-md w-full sm:w-1/2">Add To Cart</button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-md w-full sm:w-1/2">Buy Now</button>
            </div>
          </div>
        </div>

        {/* Right: Related Products */}
        <div className="w-full lg:w-1/3 bg-white rounded-lg p-4 shadow">
          <h4 className="text-lg font-semibold mb-4">Related Products</h4>
          <RelatedProductCard currentProductId={_id} category={category} />
        </div>
      </div>

      {/* Product Description */}
      <div className="rounded-lg p-6 ml-20">
        <h4 className="text-lg font-semibold mb-2">Product Description</h4>
        <ul className="list-disc pl-5 text-gray-700 text-justify">
          {description.map((line, index) => (
            <li key={index}>{line}</li>
          ))}
        </ul>
      </div>

      {/* Rating Summary and Reviews */}
      <RatingSummary />
      <ReviewCard />

      {/* Add Review Form */}
      <div className="rounded-lg p-6 w-50 ml-21 border mb-10">
        <h4 className="text-lg font-semibold mb-4">Add a Review</h4>

        <div className="mb-4">
          <span className="block mb-1 font-medium">Your Rating:</span>
          <Rating totalStars={5} initialRating={userRating} onRatingChange={onRate} />
        </div>

        <div className="mb-4">
          <span className="block mb-1 font-medium">Your Review:</span>
          <textarea className="w-full border rounded-md p-2 resize-none" rows={4} placeholder="Write your review..."></textarea>
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">Name<span className="text-red-500">*</span></label>
          <input type="text" required className="bg-white border border-gray-300 text-sm rounded-lg w-full p-2.5" placeholder="Enter your name" />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">Email<span className="text-red-500">*</span></label>
          <input type="email" required className="bg-white border border-gray-300 text-sm rounded-lg w-full p-2.5" placeholder="Enter your email" />
        </div>

        <div className="mb-6">
          <input id="remember" type="checkbox" className="w-4 h-4 border-gray-300 rounded-sm" required />
          <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900">Save my name and email in the browser for the next time I comment</label>
        </div>

        <button className="bg-green-600 text-white px-4 py-2 rounded-md w-full sm:w-1/2">Submit</button>
      </div>
    </div>
  );
};

export default Product_Details;
