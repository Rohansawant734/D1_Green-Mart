// src/components/CategoryCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/categories',{state:{selectedCategory: category.path}})
  };
  return (
    <div
      onClick={handleClick}
      className="rounded-lg p-4 shadow-md hover:shadow-lg transition"
      style={{ backgroundColor: category.bgColor }}
    >
      <img src={category.image} alt={category.text} className="h-24 mx-auto mb-4" />
      <h3 className="text-center font-semibold text-gray-800">{category.text}</h3>
    </div>
  );
};

export default CategoryCard;
