import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddProductForm from '../../Component/AddProductForm'

const ProductDetails = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false); // For toggling form

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/products');
      setProducts(response.data);
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddClick = () => setShowForm(!showForm);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Product List</h3>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleAddClick}
        >
          {showForm ? 'Hide Form' : 'Add Product'}
        </button>
      </div>

      {showForm && (
        <AddProductForm
          onSuccess={() => {
            setShowForm(false);
            fetchProducts();
          }}
        />
      )}

      {loading && <div className="text-blue-500">Loading...</div>}
      {error && <div className="text-red-500">Error: {error}</div>}

      {!loading && !error && (
        <div className="overflow-auto max-h-[500px] border border-gray-300 rounded-md shadow mt-4">
          <table className="min-w-[1000px] w-full text-sm text-gray-800 bg-white">
            <thead className="sticky top-0 bg-gray-100 text-left text-sm font-medium text-gray-700 z-10">
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Product Name</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Offer Price</th>
                <th className="px-4 py-2 border">Unit</th>
                <th className="px-4 py-2 border">In Stock</th>
                <th className="px-4 py-2 border">Category</th>
                <th className="px-4 py-2 border">Supplier</th>
                <th className="px-4 py-2 border">Created</th>
                <th className="px-4 py-2 border">Updated</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{product.id}</td>
                  <td className="px-4 py-2 border">{product.prodName}</td>
                  <td className="px-4 py-2 border">{product.description}</td>
                  <td className="px-4 py-2 border">₹{product.price}</td>
                  <td className="px-4 py-2 border">₹{product.offerPrice}</td>
                  <td className="px-4 py-2 border">{product.unit}</td>
                  <td className="px-4 py-2 border">{product.inStock ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-2 border">{product.categoryName}</td>
                  <td className="px-4 py-2 border">{product.supplierName}</td>
                  <td className="px-4 py-2 border">{product.creationDate}</td>
                  <td className="px-4 py-2 border">
                    {new Date(product.updatedOn).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
