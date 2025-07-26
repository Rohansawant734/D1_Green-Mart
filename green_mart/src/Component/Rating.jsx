import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const Rating = ({ totalStars = 5, onRatingChange = () => {}, initialRating = 0 }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(null);

  const handleClick = (value) => {
    setRating(value);
    onRatingChange(value);
  };

  return (
    <div className="flex space-x-1">
      {/* creates and empty array with length of totalStars and spreads it into a new array with undefined values to be mapped  */}
      {[...Array(totalStars)].map((_, index) => {
        const value = index + 1;
        return (
          <button
            key={value}
            type="button"
            onClick={() => handleClick(value)}
            onMouseEnter={() => setHover(value)}
            onMouseLeave={() => setHover(null)}
            className="focus:outline-none"
          >
            <FaStar
              size={24}
              color={value <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
              className="transition-colors duration-200"
            />
          </button>
        );
      })}
    </div>
  );
};

export default Rating;
