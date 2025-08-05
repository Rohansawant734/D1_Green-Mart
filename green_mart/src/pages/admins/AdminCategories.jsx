import axios from 'axios';
import React, { useEffect, useState } from 'react'

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchCategories = async () => {
      try{
          const response = await axios.get("http://localhost:8080/categories");
          setCategories(response.data);
      }catch(err){
          setError("Failed to fetch products");
      }finally{
          setLoading(false);
      }
    }
    useEffect(() =>{
      fetchCategories();
    },[]);
  return (
     <div className="max-w-4xl mx-auto p-6">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Category List</h3>

      {loading && <div className="text-blue-500">Loading...</div>}
      {error && <div className="text-red-500">Error: {error}</div>}

      {!loading && !error && (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <li
              key={cat.id}
              className="bg-white border p-4 rounded shadow text-gray-800 font-medium"
            >
              {cat.catName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminCategories
