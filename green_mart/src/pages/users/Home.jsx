import React, { useState } from 'react'
import ProductCard from '../../Component/ProductCard'
import { categories ,dummyProducts} from '../../assets/assets'
import CategoryCard from '../../Component/CategoryCard'
import { useWishlist } from '../../context/WishlistContext'
import HeroSlider from '../../Component/HeroSlider'
import myImage from '../../assets/farmer.png'
const Home = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  return (
    <div>
      <div>
        <HeroSlider/>
      </div>
      <div className='p-6' >
        <h2 className='text-2xl font-bold mb-4'>Our Products</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
            {dummyProducts.slice(0, 10).map((item) => (
              (<ProductCard key={item.id} product={item} toggleWishlist={toggleWishlist}
              isWishlisted={wishlist.some(p => p._id === item._id)} showWishlistIcon={true}/>)
            ))}
        </div>
      </div>
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 py-10 gap-10 bg-white">
        {/* Text on Right */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h2 className="text-3xl font-bold mb-2 text-gray-900">Organic Vegetables Everyday</h2>
          <p className="text-green-600 font-semibold mb-3">Your online resource of healthy recipes.</p>
          <p className="text-gray-600 mb-5 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vulputate ultrices libero ut
            vehicula. In sit amet arcu libero. Proin fringilla dui sed arcu fringilla tristique eget
            ultricies elit.
          </p>
          <button className="bg-yellow-400 text-white font-medium px-6 py-2 rounded hover:bg-yellow-500 transition">
            Shop Now
          </button>
        </div>

        {/* Image on Left */}
        <div className="w-full lg:w-1/2 relative">
          
          <img
            src={myImage}
            alt="farmer"
            className="w-full max-w-md mx-auto z-0"
          />
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Shop by Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {categories.map((item, index) => (
            <CategoryCard key={index} category={item} />
          ))}
        </div>
      </div>
      
    </div>
  )
}

export default Home
