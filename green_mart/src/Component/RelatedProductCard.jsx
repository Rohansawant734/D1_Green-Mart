import React, { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { dummyProducts } from '../assets/assets';

function RelatedProductCard({ currentProductId = null, category = null }) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);

  const itemsPerSlide = 3;

  useEffect(() => {
    const filtered = dummyProducts.filter((product) => {
      const isNotCurrent = product._id !== currentProductId;
      const isSameCategory = category ? product.category === category : true;
      return isNotCurrent && isSameCategory;
    });

    setRelatedProducts(filtered);
    setSlideIndex(0); // reset on change
  }, [currentProductId, category]);

  const totalSlides = Math.ceil(relatedProducts.length / itemsPerSlide);

  const handlePrev = () => {
    setSlideIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setSlideIndex((prev) => Math.min(prev + 1, totalSlides - 1));
  };

  return (
    <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[45%] p-4 max-w-screen-sm mx-auto overflow-hidden">
      {/* Header with arrows */}
      <div className="flex justify-between items-center border-b border-gray-200 pb-3">
        <h4 className="text-base sm:text-lg font-semibold">Related Products</h4>
        <div className="flex space-x-2">
          <button
            onClick={handlePrev}
            disabled={slideIndex === 0}
            className={`p-2 hover:bg-gray-100 rounded ${slideIndex === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
          >
            <FiChevronLeft className="text-lg" />
          </button>
          <button
            onClick={handleNext}
            disabled={slideIndex >= totalSlides - 1}
            className={`p-2 hover:bg-gray-100 rounded ${slideIndex >= totalSlides - 1 ? 'opacity-30 cursor-not-allowed' : ''}`}
          >
            <FiChevronRight className="text-lg" />
          </button>
        </div>
      </div>

      {/* Carousel container */}
      <div className="relative w-full overflow-hidden mt-4">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${slideIndex * 100}%)`,
            width: `${totalSlides * 100}%`
          }}
        >
          {Array.from({ length: totalSlides }).map((_, i) => {
            const start = i * itemsPerSlide;
            const end = start + itemsPerSlide;
            const slideProducts = relatedProducts.slice(start, end);

            return (
              <div key={i} className="w-full shrink-0 flex flex-col space-y-4 px-2">
                {slideProducts.map((product) => (
                  <div
                    key={product._id}
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:shadow-md transition bg-white"
                  >
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="h-20 w-20 object-contain mr-4"
                    />
                    <div>
                      <h6 className="text-sm sm:text-base font-medium">{product.name}</h6>
                      <p className="text-xs sm:text-sm text-gray-400">{product.description?.[0]}</p>
                      <h6 className="text-sm sm:text-base text-red-600 font-semibold">
                        Rs.{product.offerPrice}
                      </h6>
                      {product.price > product.offerPrice && (
                        <p className="text-xs line-through text-gray-400">Rs.{product.price}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RelatedProductCard;
