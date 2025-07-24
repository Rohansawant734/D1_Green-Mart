import React from 'react'
import { products } from '../../data/productsData'
import ProductCard from '../../Component/ProductCard'

const Home = () => {
  return (
    <div>
      <div className='p-6' >
        <h2 className='text-2xl font-bold mb-4'>Our Products</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            {products.map((item) => (
              <ProductCard key={item.id} product={item}/>
            ))}
        </div>
      </div>
      <div>
        <img src="	https://el3.thembaydev.com/greenmart_fresh/wp-content/uploads/2021/09/banner-05.jpg"/>
      </div>
    </div>
  )
}

export default Home
