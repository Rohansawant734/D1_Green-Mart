import React, { useEffect, useState } from "react";
import axios from "axios";

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleAddSupplier = () => {
    alert("Add Supplier form or modal to be implemented");
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Supplier Management</h1>

      <button
        onClick={handleAddSupplier}
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
                      <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                        Edit
                      </button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                        Delete
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
