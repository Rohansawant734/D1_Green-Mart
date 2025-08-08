import React, { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../../services/config";

const AdminUserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${config.serverUrl}/admin/users`);
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching customer:", error);
    }
  };

  const markUnavailable = async (userId) => {
    try {
      await axios.delete(`${config.serverUrl}/admin/users/delete/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const markAvailable = async (userId) => {
    try{
      await axios.put(`${config.serverUrl}/admin/users/restore/${userId}`)
      fetchUsers()
    }
    catch(error){
      console.error("Error restoring customer: ", error)
    }
  }

  const toggleCustomerStatus = (user) =>{
    if(user.deleted){
      markAvailable(user.userId)
    }
    else{
      markUnavailable(user.userId)
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Active Customers</h2>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full text-sm text-left bg-white">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">First Name</th>
              <th className="px-6 py-3">Last Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {users.map((user) => (
              <tr key={user.userId} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{user.firstName}</td>
                <td className="px-6 py-4">{user.lastName}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.phone}</td>
                <td className="px-6 py-4">
                    {user.deleted ? (
                      <span className="text-red-500 font-medium">Inactive</span>
                    ): (
                      <span className="text-green-500 font-medium">Active</span>
                    )}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleCustomerStatus(user)}
                    className={`${user.deleted ? "bg-green-500 hover:bg-green-600"
                      : "bg-red-500 hover:bg-red-600"} text-white font-medium py-1.5 px-4 rounded transition duration-200`}
                  >
                    {user.deleted ? "Mark Available" : "Mark UnAvailable"}
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No active customers found.
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
