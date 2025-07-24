import React from 'react'

const ProductCard = ({product}) => {
  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition'>
      <img src={product.image} alt={product.name} className='w-full h-48 object-cover'/>
      <div className='p-4'>
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="mt-2 font-bold text-green-600">₹{product.price}</p>
        <button className="mt-4 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600">
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard
