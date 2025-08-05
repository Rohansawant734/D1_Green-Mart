import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// SupplierForm handles both Add and Edit
const SupplierForm = ({ supplier, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState(
    supplier || { name: "", email: "", contactNumber: "", address: "" }
  );

  useEffect(() => {
    setFormData(supplier || { name: "", email: "", contactNumber: "", address: "" });
  }, [supplier]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare request DTO without id
    const requestDTO = {
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
      address: formData.address,
    };

    try {
      if (supplier && supplier.id) {
        // Update existing supplier
        await axios.put(
          `http://localhost:8080/admin/update-supplier/${supplier.id}`,
          requestDTO
        );
        toast.success("Supplier updated successfully!");
      } else {
        // Add new supplier
        await axios.post("http://localhost:8080/admin/add-supplier", requestDTO);
        toast.success("Supplier added successfully!");
      }
      onSuccess();
    } catch (error) {
      toast.error("Failed to save supplier. Please try again.");
      console.error(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md bg-white border border-gray-300 shadow-xl rounded-lg p-8">
          <h2 className="text-xl font-semibold mb-6 text-center">
            {supplier ? "Edit Supplier" : "Add Supplier"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2 border border-gray-400 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
              >
                {supplier ? "Update Supplier" : "Add Supplier"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/admin/suppliers");
      setSuppliers(response.data);
      setError(null);
    } catch (err) {
      setError("Error fetching suppliers. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setEditingSupplier(null);
    setShowForm(true);
  };

  const handleEditClick = (supplier) => {
    setEditingSupplier(supplier);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingSupplier(null);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingSupplier(null);
    fetchSuppliers();
  };

  return showForm ? (
    <SupplierForm
      supplier={editingSupplier}
      onSuccess={handleFormSuccess}
      onCancel={handleCancel}
    />
  ) : (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Supplier Management</h1>

      <button
        onClick={handleAddClick}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add Supplier
      </button>

      {loading && <p>Loading suppliers...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Contact Number</th>
                <th className="py-2 px-4 text-left">Address</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No supplier data found.
                  </td>
                </tr>
              ) : (
                suppliers.map((supplier) => (
                  <tr key={supplier.id} className="border-t">
                    <td className="py-2 px-4">{supplier.name}</td>
                    <td className="py-2 px-4">{supplier.email}</td>
                    <td className="py-2 px-4">{supplier.contactNumber}</td>
                    <td className="py-2 px-4">{supplier.address}</td>
                    <td className="py-2 px-4 flex gap-x-5">
                      <button
                        onClick={() => handleEditClick(supplier)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                        Unavailable
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Supplier;
