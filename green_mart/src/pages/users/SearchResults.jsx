import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../../Component/ProductCard';
import emptyProduct from '../../assets/empty_product_search.png'

const SearchResults = () => {
    const { keyword } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!keyword?.trim()) {
            setProducts([]);
            return;
        }

        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:8080/products/search?q=${encodeURIComponent(keyword)}`);
                console.log("Raw backend response:", response.data);

                const normalized = Array.isArray(response.data)
                    ? response.data.map(p => {
                        console.log("Mapping product:", p);
                        return {
                            id: p.id,
                            _id: p.id,
                            name: p.prodName,
                            description: p.description ? p.description.split('\n') : [],
                            price: p.price,
                            category: p.categoryName,
                            image: p.proimage ? [p.proimage] : [],
                        };
                    })
                    : [];

                console.log("Normalized products for frontend:", normalized);
                setProducts(normalized);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Failed to load products.');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [keyword]);

    return (
        <div className="p-6 mt-35">
            <h2 className="text-xl font-semibold mb-4 text-center">
                Search results for "{keyword}"
            </h2>

            {loading && <p className="text-gray-500">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && (
                products.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        {products.map(product => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                showWishlistIcon={true}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center flex-grow text-center h-[400px]">
                        <img
                            src={emptyProduct}
                            alt="No Products Found"
                            className="w-48 h-48 object-contain mb-6 opacity-70"
                        />
                        <p className="text-gray-600 text-lg">No matching products found.</p>
                    </div>
                )
            )}
        </div>
    );
};

export default SearchResults;
