import React from 'react'
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function RelatedProductCard() {

    const items = [1, 2, 3]
  return (
    <div className="sm:w-2/3 p-4 max-w-screen-xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-200 pb-3">
        <h4 className="text-base sm:text-lg font-semibold mb-2 sm:mb-0">Related products</h4>
        <div className="flex space-x-2">
          <button className="p-2 hover:bg-gray-100">
            <FiChevronLeft className="text-lg" />
          </button>
          <button className="p-2 hover:bg-gray-100">
            <FiChevronRight className="text-lg" />
          </button>
        </div>
      </div>

      {/* Product Cards */}
      <div className="mt-4 space-y-4">
        {items.map((item) => (
          <div key={item} className="flex items-center p-3 border-b border-gray-200 hover:shadow-md transition">
            <img src="./src/assets/yippee_image.png" alt="Yippee" className="h-20 w-20 object-contain mr-4"/>
            <div>
              <h6 className="text-sm sm:text-base font-medium">Maggi</h6>
              <p className="text-xs sm:text-sm text-gray-400">350g</p>
              <h6 className="text-sm sm:text-base text-red-600 font-semibold">Rs.15</h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RelatedProductCard
