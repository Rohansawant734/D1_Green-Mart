    import React, { useEffect, useRef } from 'react';
    import { useWishlist } from '../../context/WishlistContext';
    import ProductCard from '../../Component/ProductCard';
    import { useAuth } from '../../context/AuthContext';
    import { useNavigate } from 'react-router-dom';
    import { toast } from 'react-toastify';
    import emptyWishList from '../../assets/empty_wishlist2.png'

    const Wish_List = () => {
      const { wishlist } = useWishlist();
      const { authUser, loading } = useAuth();
      const navigate = useNavigate();
      const hasWarned = useRef(false);

      useEffect(() => {
        if (!loading &&  !authUser) {
          navigate('/login'); // Redirect to login if not authenticated
          if (!hasWarned.current) {
            toast.warn("Please log in to view your wishlist",{        
              style: { background: "#199960", color: "#fff"},  
            });
            hasWarned.current = true;
          }
        }
      }, [authUser, loading, navigate]);


      return (
        <div className='p-3 mt-[110px]'>
          <h2 className='text-[10.5rem] font-bold mb-4 text-center'>Your Wishlist</h2>
          {wishlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-screen text-center">
              <img src={emptyWishList} alt="Empty Wishlist" className="w-48 h-48 object-contain mb-4"/>
              <p className="text-lg text-gray-600">No items are present in your wishlist. Start Adding Your Favorite Products!</p>
              <button onClick={() => navigate('/categories')} className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-md transition w-48">
                Browse Products
              </button>
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
              {wishlist.map((item) => (
                <ProductCard
                  key={item.productId}
                  product={{
                    _id: item.productId,
                    name: item.productName,
                    image: [item.productImage],
                    price: item.offerPrice,
                    description: item.description?.split(','),
                  }}
                  showWishlistIcon={true}
                />
              ))}
            </div>
          )}
        </div>
      );
    };

    export default Wish_List;
