import React, { useState,useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../../Component/ProductCard';
import myImage from '../../assets/farmer.png'
import { useLocation } from 'react-router-dom';
import FloatingStack from '../../Component/FloatingStack';
const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  //fetch all categories from backend
  const fetchCategories = async () => {
  try {
    const response = await axios.get("http://localhost:8080/categories");

    const formatted = response.data.map(cat => ({
      
      id: cat.id,
      text: cat.catName,
      image: cat.catImage,
      bgColor: cat.bgColor,
      path: cat.catName, // used for category filtering/navigation
    }));
    


    setCategories(formatted);
  } catch (err) {
    console.error("Error fetching categories", err);
  }
};

//fetch products from backend

  const fetchProducts = async () => {
    try{
      const response = await axios.get("http://localhost:8080/products");
      const formatted = response.data.map(product => ({
        id: product.id,
        name: product.prodName,
        image: [product.proimage],
        price: product.price,
        category: product.categoryName,
        description: product.description?.split(',').map(str => str.trim()),
      }));
      
      setProducts(formatted);
    }catch(err){
      console.error("Error fetching products",err);
    }
  }

  const location = useLocation();

  useEffect(() => {
   fetchCategories();
   fetchProducts();
  },[]);

  useEffect(() => {
    if (location.state && location.state.selectedCategory) {
      setSelectedCategory(location.state.selectedCategory);
    }
  }, [location.state]);
   const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : [];
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
                key={cat.id}
                className={`flex items-center gap-2 p-2 rounded cursor-pointer transition hover:bg-gray-200 ${selectedCategory === cat.path ? "bg-gray-300" : ""
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
        <div className="w-3/4 p-6 overflow-y-auto justify-center">
          {selectedCategory ? (
            <h2 className="text-xl font-semibold mb-4">
              Products in {selectedCategory}
            </h2>
          ) : (
            <div className='flex flex-col items-center justify-center h-full text-center'>
            <div className="bg-white p-6 rounded-lg shadow-lg border w-full max-w-sm mb-4r">
              <img
                src={myImage}
                alt="farmer"
                className="w-full h-auto object-contain mb-4"
              />
              <h2 className="text-2xl font-extrabold text-green-600 animate-pulse">
                Select a category
              </h2>
            </div>
            </div>
          )}
          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                showWishlistIcon={true}
              />
            ))}
             
          </div>
        </div>
      </div>
      <FloatingStack/>
    </div>
  );
};

export default Categories;
