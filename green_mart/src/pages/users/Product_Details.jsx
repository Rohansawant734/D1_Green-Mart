// src/pages/users/Product_Details.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { FaHeart, FaRegStar, FaStar } from 'react-icons/fa';
import { addReview, getAllProductReviews } from '../../services/review';
import { useAuth } from '../../context/AuthContext';
import RelatedProductCard from '../../Component/RelatedProductCard';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { authUser } = useAuth();
  const { wishlist, toggleWishlist } = useWishlist();

  const getId = (obj) => obj._id || obj.id;
  const isWishlisted = product && wishlist.some(item => getId(item) === getId(product));

  // Reviews state
  const [reviews, setReviews] = useState([]);
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0); // for hover preview
  const [newComment, setNewComment] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const reviewsToShow = showAllReviews ? reviews : reviews.slice(0, 3);
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const data = await getAllProductReviews(id);
      const reviewArray = Array.isArray(data)
        ? data
        : Array.isArray(data.data)
          ? data.data
          : [];
      setReviews(reviewArray);
    } catch (error) {
      console.error(error);
      setReviews([]);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [id]);

  const averageRating = reviews.length
    ? reviews.reduce((acc, r) => acc + r.ratings, 0) / reviews.length
    : 0;
    const ratingCounts = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.ratings === star).length
  }));
  const totalRatings = reviews.length;

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (newRating === 0 || newComment.trim() === '') {
      alert('Please provide rating and comment');
      return;
    }
    if (!authUser?.userId) {
      alert('You must be logged in to submit a review');
      return;
    }

    setReviewLoading(true);
    try {
      const userId = authUser.userId;
      const productId = product._id || product.id;
      const result = await addReview(userId, productId, newComment, newRating);

      if (result.success !== false) {
        setReviews(prev => [...prev, result]);
        setNewComment('');
        setNewRating(0);
      } else {
        alert('Failed to submit review');
      }
    } catch (error) {
      alert('Error submitting review');
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-blue-500">Loading product...</div>;
  }

  if (!product?.id) {
    return <div className="p-6 text-red-500">Product not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Top - Product Info in 2 Columns */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left - Product Image */}
        <div className="md:w-1/2 flex justify-center items-start">
          <img
            src={product.proimage}
            alt={product.prodName}
            className="w-3/4 max-w-sm h-auto object-contain rounded shadow-md"
          />
        </div>

        {/* Right - Product Details */}
        <div className="md:w-1/2 relative flex flex-col">
          <h1 className="text-3xl font-bold mb-2">{product.prodName}</h1>
          <p className="text-gray-600 mb-1">Category: {product.categoryName}</p>
          <p className="text-sm text-gray-600 mb-4">Unit: {product.unit}</p>
          <p className="mt-2 font-bold text-green-600">₹{product.price}</p>

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
            className={`absolute top-0 right-0 text-2xl ${isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
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

      {/* Bottom - Reviews Section (Full Width) */}
      <div className="border-t pt-6 mt-8">
        <h2 className="text-xl font-semibold mb-2">Customer Reviews</h2>

        {/* Average Rating */}
        <div className="flex items-center mb-1">
          {[1, 2, 3, 4, 5].map((star) =>
            star <= Math.round(averageRating) ? (
              <FaStar key={star} className="text-yellow-400" />
            ) : (
              <FaRegStar key={star} className="text-yellow-400" />
            )
          )}
          <span className="ml-2 text-gray-700 font-medium">
            {averageRating.toFixed(1)} / 5 ({reviews.length} reviews)
          </span>
        </div>

        {/* Review List */}

        <ul className="mb-6 space-y-2">
          {reviewsToShow.length === 0 && (
            <li className="text-gray-500">No reviews yet. Be the first!</li>
          )}
          {reviewsToShow.map((rev, index) => (
            <li key={rev._id || rev.id || index} className="border p-2 rounded bg-gray-50">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-gray-800">
                  {rev.firstName || rev.lastName
                    ? `${rev.firstName || ''} ${rev.lastName || ''}`.trim()
                    : 'Anonymous'}
                </span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) =>
                    star <= rev.ratings ? (
                      <FaStar key={star} className="text-yellow-400 text-sm" />
                    ) : (
                      <FaRegStar key={star} className="text-yellow-400 text-sm" />
                    )
                  )}
                </div>
              </div>
              <p className="text-gray-700 text-sm">{rev.comment}</p>
            </li>
          ))}
        </ul>

        {/* Add Review Form */}
        <form onSubmit={handleReviewSubmit} className="space-y-3">
          <label className="block font-medium text-gray-700">
            Add Your Review:
          </label>

          <div className="flex items-center gap-4">
            {/* Rating Stars */}
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setNewRating(star)}
                  className="focus:outline-none"
                >
                  {star <= (hoverRating || newRating) ? (
                    <FaStar className="text-yellow-400 text-2xl" />
                  ) : (
                    <FaRegStar className="text-yellow-400 text-2xl" />
                  )}
                </button>
              ))}
            </div>

            {/* Comment Box */}
            <textarea
              className="flex-1 rounded border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
              rows="2"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comments..."
              required
            ></textarea>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
              disabled={reviewLoading}
            >
              {reviewLoading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
        {/* Related Products */}
        <div className="mt-10 border-t pt-6">
          <RelatedProductCard
            currentProductId={product._id || product.id}
            category={product.categoryName}
          />
        </div>
      </div>
    </div>
  );

};

export default ProductDetails;
