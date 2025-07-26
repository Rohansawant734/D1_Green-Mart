import React, { useState } from 'react';
import { categories, dummyProducts } from '../../assets/assets';
import ProductCard from '../../Component/ProductCard';
import { useWishlist } from '../../context/WishlistContext';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filterProducts = selectedCategory
    ? dummyProducts.filter(p => p.category === selectedCategory)
    : [];

  const { wishlist, toggleWishlist } = useWishlist();

  return (
    <div className="p-6">

      {/* Flex container */}
      <div className="flex h-[600px] border rounded overflow-hidden">

        {/* Left Sidebar */}
        <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto border-r">
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <div className="flex flex-col gap-2">
            {categories.map(cat => (
              <div
                key={cat.path}
                className={`flex items-center gap-2 p-2 rounded cursor-pointer transition hover:bg-gray-200 ${
                  selectedCategory === cat.path ? "bg-gray-300" : ""
                }`}
                onClick={() => setSelectedCategory(cat.path)}
              >
                <img src={cat.image} alt={cat.text} className="w-8 h-8" />
                <span className="text-sm font-medium">{cat.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Products Grid */}
        <div className="w-3/4 p-6 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">
            {selectedCategory ? `Products in ${selectedCategory}` : "Select a category"}
          </h2>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filterProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                showWishlistIcon={true}
                toggleWishlist={toggleWishlist}
                isWishlisted={wishlist.some(item => item.id === product.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
