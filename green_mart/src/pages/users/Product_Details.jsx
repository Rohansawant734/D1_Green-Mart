import React, { useState } from 'react'
import { FiMinus, FiPlus } from "react-icons/fi";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FaHeart } from 'react-icons/fa';
import './Product_Details.css'
import Rating from '../../Component/Rating';
import RatingSummary from '../../Component/RatingSummary';
import ReviewCard from '../../Component/ReviewCard';
import RelatedProductCard from '../../Component/RelatedProductCard';


const Product_Details = ({ product, isWishlisted = false, toggleWishlist = () => { }, showWishlistIcon = false }) => {
  const stock = 0;

  const [count, setCount] = useState(1)

  const [userRating, setUserRating] = useState(0)

  const onRate = () => {
    setRating(!userRating)
  }

  const rating = [1, 2, 3, 4]

  const onIncrement = () => {
    setCount(count + 1)
  }

  const onDecrement = () => {
    setCount(count - 1)
  }

  return (
    <div>
      <div className='ml-50 mt-10'>
        <div className='flex flex-row gap-2'>
          <h2>Maggi</h2>
          <p className='text-gray-400 relative -bottom-2'>350g</p>
        </div>
        <div className="flex items-center mb-2">
          {rating.map((i) => (
            <svg key={i} className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          ))}
          <svg className="w-4 h-4 text-gray-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <p className="ms-1 text-sm font-medium text-gray-500 align-middle mb-0">4.95</p>
          <p className="ms-1 text-sm font-medium text-gray-500 mb-0">out of</p>
          <p className="ms-1 text-sm font-medium text-gray-500 mb-0">5</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-8 rounded-lg p-6 ml-20">
        {/* Image */}
        <div className="sm:w-1/3 w-full flex justify-center items-center">
          <a href="./src/assets/yippee_image.png" target="_self">
            <img src="./src/assets/yippee_image.png" alt="Yippee" className="max-h-60 object-contain" />
          </a>
        </div>

        {/* Product Details */}
        <div className="sm:w-2/3 w-full flex flex-col gap-4 p-4">
          <div>
            <h4 className="text-xl font-bold text-gray-800">Rs. 15</h4>
            {showWishlistIcon && (
              <button onClick={() => toggleWishlist(product)}
                className="absolute top-3 right-3 text-lg text-gray-400 hover:text-red-500"
              >
                <FaHeart className={isWishlisted ? "text-red-500" : ""} />
              </button>
            )}
          </div>

          <p className="text-gray-700 text-justify">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem veritatis, illo impedit...</p>

          <p className="text-sm text-green-700 font-semibold">Availability: {stock} in stock</p>

          <div className="flex items-center border w-fit px-3 py-1 rounded-md">
            <button onClick={onDecrement}>
              <FiMinus className="text-gray-600" />
            </button>
            <span className="mx-4 font-medium">{count}</span>
            <button onClick={onIncrement}>
              <FiPlus className="text-gray-600" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-col gap-4 mt-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md w-full sm:w-1/2">Add To Cart</button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md w-full sm:w-1/2">Buy Now</button>
          </div>
        </div>

        <RelatedProductCard />
      </div>

      {/* Product Description */}
      <div className="rounded-lg p-6 ml-20">
        <h4 className="text-lg font-semibold mb-2">Product Description</h4>
        <p className="text-gray-700 text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quia minima labore...</p>
      </div>

      {/*Rating summary */}
      <RatingSummary />

      {/*Rating summary */}
      <ReviewCard />

      {/* Review Section */}
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
          <label for="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name<span className="text-red-500">*</span>
          </label>
          <input type="text" id="default-input" required className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your input" />
        </div>
        <div className="mb-6">
          <label for="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email<span className="text-red-500">*</span>
          </label>
          <input type="text" id="default-input" required className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your input" />
        </div>
        <div className='mb-6'>
          <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
          <label for="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Save my name and email in the browser for the next time i comment</label>
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded-md w-full sm:w-1/2">Submit</button>
      </div>
    </div>
  )
}

export default Product_Details
