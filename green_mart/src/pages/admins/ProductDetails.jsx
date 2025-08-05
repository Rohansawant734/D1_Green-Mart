import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialProduct = {
  prodName: "",
  description: "",
  price: 0,
  unit: "",
  offerPrice: 0,
  prodImgUrl: "",
  inStock: true,
};

const ProductDetails = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [supplierName, setSupplierName] = useState("");
  const [supplierEmail, setSupplierEmail] = useState("");
  const [productsForm, setProductsForm] = useState([{ ...initialProduct }]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/api/products");
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError("Error fetching products. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Form handlers
  const handleSupplierNameChange = (e) => setSupplierName(e.target.value);
  const handleSupplierEmailChange = (e) => setSupplierEmail(e.target.value);

  const handleProductChange = (index, field, value) => {
    const updated = [...productsForm];
    updated[index][field] =
      field === "price" || field === "offerPrice" ? Number(value) : value;
    setProductsForm(updated);
  };

  const addProductField = () => {
    setProductsForm([...productsForm, { ...initialProduct }]);
  };

  const removeProductField = (index) => {
    if (productsForm.length === 1) {
      toast.warn("At least one product is required.");
      return;
    }
    setProductsForm(productsForm.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    setShowForm(false);
    setSupplierName("");
    setSupplierEmail("");
    setProductsForm([{ ...initialProduct }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!supplierName.trim()) {
      toast.error("Supplier name is required.");
      return;
    }
    if (!supplierEmail.trim()) {
      toast.error("Supplier email is required.");
      return;
    }

    for (let i = 0; i < productsForm.length; i++) {
      if (!productsForm[i].prodName.trim()) {
        toast.error(`Product #${i + 1}: Product name is required.`);
        return;
      }
    }

    const payload = {
      supplierName,
      supplierEmail,
      products: productsForm,
    };

    try {
      await axios.post(
        "http://localhost:8080/api/products/add-by-supplier",
        payload
      );
      toast.success("Products added successfully!");
      fetchProducts();
      handleCancel();
    } catch (err) {
      toast.error(err.response?.data || "Failed to add products.");
      console.error(err);
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <ToastContainer />
      {!showForm ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Product Management</h1>
          <button
            onClick={() => setShowForm(true)}
            className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Products
          </button>

          {loading && <p>Loading products...</p>}
          {error && <p className="text-red-600">{error}</p>}

          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-200 text-gray-700">
                  <tr>
                    <th className="py-2 px-4 text-left">Supplier Name</th>
                    <th className="py-2 px-4 text-left">Supplier Email</th>
                    <th className="py-2 px-4 text-left">Product Name</th>
                    <th className="py-2 px-4 text-left">Description</th>
                    <th className="py-2 px-4 text-left">Price</th>
                    <th className="py-2 px-4 text-left">Offer Price</th>
                    <th className="py-2 px-4 text-left">Unit</th>
                    <th className="py-2 px-4 text-left">In Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center py-4 text-gray-500">
                        No products found.
                      </td>
                    </tr>
                  ) : (
                    products.map((p) => (
                      <tr key={p.id} className="border-t">
                        <td className="py-2 px-4">{p.supplierName || "-"}</td>
                        <td className="py-2 px-4">{p.supplierEmail || "-"}</td>
                        <td className="py-2 px-4">{p.prodName}</td>
                        <td className="py-2 px-4">{p.description}</td>
                        <td className="py-2 px-4">{p.price}</td>
                        <td className="py-2 px-4">{p.offerPrice}</td>
                        <td className="py-2 px-4">{p.unit}</td>
                        <td className="py-2 px-4">{p.inStock ? "Yes" : "No"}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-6 text-center">Add Multiple Products</h2>
          <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto bg-white p-6 rounded shadow"
          >
            <div className="mb-6">
              <label className="block mb-2 font-medium">Supplier Name</label>
              <input
                type="text"
                value={supplierName}
                onChange={handleSupplierNameChange}
                placeholder="Enter supplier name"
                required
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">Supplier Email</label>
              <input
                type="email"
                value={supplierEmail}
                onChange={handleSupplierEmailChange}
                placeholder="Enter supplier email"
                required
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>

            {productsForm.map((prod, i) => (
              <div
                key={i}
                className="mb-6 border border-gray-300 p-4 rounded relative"
              >
                <h3 className="mb-4 font-semibold text-lg">Product #{i + 1}</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Product Name *"
                    value={prod.prodName}
                    onChange={(e) =>
                      handleProductChange(i, "prodName", e.target.value)
                    }
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <textarea
                    placeholder="Description"
                    value={prod.description}
                    onChange={(e) =>
                      handleProductChange(i, "description", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="number"
                    min="0"
                    placeholder="Price *"
                    value={prod.price}
                    onChange={(e) =>
                      handleProductChange(i, "price", e.target.value)
                    }
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Unit"
                    value={prod.unit}
                    onChange={(e) =>
                      handleProductChange(i, "unit", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="number"
                    min="0"
                    placeholder="Offer Price"
                    value={prod.offerPrice}
                    onChange={(e) =>
                      handleProductChange(i, "offerPrice", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="url"
                    placeholder="Product Image URL"
                    value={prod.prodImgUrl}
                    onChange={(e) =>
                      handleProductChange(i, "prodImgUrl", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <label className="flex items-center space-x-2 mt-4">
                    <input
                      type="checkbox"
                      checked={prod.inStock}
                      onChange={(e) =>
                        handleProductChange(i, "inStock", e.target.checked)
                      }
                    />
                    <span>In Stock</span>
                  </label>
                </div>

                {productsForm.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProductField(i)}
                    className="absolute top-2 right-2 text-red-600 text-2xl font-bold hover:text-red-800"
                    title="Remove product"
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addProductField}
              className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              + Add Another Product
            </button>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-400 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
              >
                Submit Products
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
