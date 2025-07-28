import React from 'react'
import { useLocation } from 'react-router-dom'
import { dummyProducts } from '../../assets/assets'
import ProductCard from '../../Component/ProductCard'
const SearchResults = () => {
    const location = useLocation();
    // location.search // "?q=Milk"

    // new URLSearchParams(location.search).get('q') // "Milk"

    //     .toLowerCase() // "milk"

    // So → query = "milk"
    const query = new URLSearchParams(location.search).get('q')?.toLowerCase();


    const filterProducts = dummyProducts.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Search results for "{query}"</h2>

            {filterProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {filterProducts.map(product => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            showWishlistIcon={true} // enable wishlist button
                        />
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">No matching products found.</p>
            )}
        </div>
    )
}

export default SearchResults;
