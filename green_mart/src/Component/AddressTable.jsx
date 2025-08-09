// components/AddressTable.jsx
import React from "react";
import { toast } from "react-toastify";
import { useAddress } from "../context/AddressContext";

const AddressTable = ({ addresses, handleEdit, handleDelete, userId }) => {
  const { setSelectedAddress } = useAddress();

  const handleSelect = (addr) => {
    setSelectedAddress(addr);
    toast.success("Address selected for delivery");
  };
  return (
    <table className="w-full border border-gray-400 rounded overflow-hidden">
      <thead className="bg-gradient-to-r from-green-200 to-gray-200">
        <tr>
          <th className="p-2 text-left">Address</th>
          <th className="p-2 text-left">City</th>
          <th className="p-2 text-left">State</th>
          <th className="p-2 text-left">Country</th>
          <th className="p-2 text-left">Zip</th>
          <th className="p-2 text-left">Type</th>
          <th className="p-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(addresses) && addresses.length > 0 ? (
          addresses.map((addr) => (
            <tr key={addr.id}>
              <td className="p-2">{addr.adrLine1}, {addr.adrLine2}</td>
              <td className="p-2">{addr.city}</td>
              <td className="p-2">{addr.state || "-"}</td>
              <td className="p-2">{addr.country || "-"}</td>
              <td className="p-2">{addr.zipCode}</td>
              <td className="p-2">{addr.addrType}</td>
              <td className="p-2 flex gap-2 items-center">
                <button onClick={() => handleEdit(addr)} className="text-blue-600 hover:underline">Edit</button>
                <button onClick={() => handleDelete(userId, addr.id)} className="text-red-600 hover:underline">Delete</button>
                <button onClick={() => handleSelect(addr)} className="text-green-700 font-semibold underline hover:text-green-900" > Select </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="text-center p-4 text-gray-500">No addresses found.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default AddressTable;
