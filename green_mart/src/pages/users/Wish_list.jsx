import React from 'react'
import { useWishlist } from '../../context/WishlistContext';
import ProductCard from '../../Component/ProductCard';
const Wish_List = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  return (
   <div className='p-3'>
      <h2 className='text-2xl font-bold mb-4'>Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
          {wishlist.map((item) => (
            <ProductCard
              key={item._id}
              product={item}
              toggleWishlist={toggleWishlist}
              isWishlisted={true}
              showWishlistIcon={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Wish_List
