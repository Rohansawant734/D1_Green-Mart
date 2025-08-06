import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminUserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/admin/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const markUnavailable = async (userId) => {
    try {
      await axios.put(`http://localhost:8080/admin/users/unavailable/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Active Users</h2>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full text-sm text-left bg-white">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">First Name</th>
              <th className="px-6 py-3">Last Name</th>
              <th className="px-6 py-3">Created</th>
              <th className="px-6 py-3">Updated</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {users.map((u) => (
              <tr key={u.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{u.email}</td>
                <td className="px-6 py-4">{u.firstName}</td>
                <td className="px-6 py-4">{u.lastName}</td>
                <td className="px-6 py-4">{u.creationDate}</td>
                <td className="px-6 py-4">{u.updatedOn}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => markUnavailable(u.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-medium py-1.5 px-4 rounded transition duration-200"
                  >
                    Mark Unavailable
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No active users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUserTable;
