// src/components/RelatedProductCard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

function RelatedProductCard({ currentProductId = null, category = null }) {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    async function fetchRelatedProducts() {
      try {
        const response = await axios.get("http://localhost:8080/products");
        const formatted = response.data.map(product => ({
          id: product.id,
          _id: product._id,
          name: product.prodName,
          image: [product.proimage],
          price: product.price,
          offerPrice: product.offerPrice,
          category: product.categoryName,
          description: product.description?.split(',').map(str => str.trim()),
        }));

        const filtered = formatted.filter(product => {
          const isNotCurrent = product.id !== currentProductId && product._id !== currentProductId;
          const isSameCategory = category ? product.category === category : true;
          return isNotCurrent && isSameCategory;
        });

        setRelatedProducts(filtered);
      } catch (err) {
        console.error("Error fetching related products", err);
      }
    }

    fetchRelatedProducts();
  }, [currentProductId, category]);

  return (
    <div className="w-full p-4">
      <h4 className="text-lg font-semibold border-b border-gray-200 pb-3">
        Related Products
      </h4>

      {/* Grid Layout */}
      <div className="mt-4 max-h-[500px] overflow-y-auto pr-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {relatedProducts.map(product => (
            <ProductCard 
              key={product.id || product._id} 
              product={product} 
              showWishlistIcon={true} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RelatedProductCard;
