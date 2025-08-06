import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// import { useAddress } from "../../context/AddressContext.jsx";
// const { setSelectedAddress } = useAddress();

const Address = () => {
    const userId = 1; // Replace with actual logged-in user ID
    const [addresses, setAddresses] = useState([]);
    const [form, setForm] = useState({
        adrLine1: "",
        adrLine2: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
        addrType: "HOME",
    });
    const [editingId, setEditingId] = useState(null);

    const stateOptions = ["Maharashtra", "Karnataka", "Gujarat", "Delhi"];
    const countryOptions = ["India", "USA", "UK", "Canada"];

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        const res = await axios.get(`http://localhost:8080/address/${userId}`);
        setAddresses(res.data);
        console.log("Fetched addresses:", res.data);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Basic Validation
        if (!form.adrLine1 || !form.city || !form.zipCode || !form.state || !form.country) {
            toast.error("Address Line 1, City, State, Country, and Zip Code are required!");
            return;
        }

        if (!/^\d{5,6}$/.test(form.zipCode)) {
            toast.error("Zip Code must be 5 or 6 digits.");
            return;
        }
        const payload = {
            adrLine1: form.adrLine1,
            adrLine2: form.adrLine2,
            city: form.city,
            state: form.state,
            country: form.country,
            zipCode: form.zipCode,
            addrType: form.addrType,
        };

        try {
            if (editingId) {
                // Update API
                await axios.put(`http://localhost:8080/address/${userId}/${editingId}`, payload);
                toast.success("Address updated successfully!");
            } else {
                // Add API
                await axios.post(`http://localhost:8080/address/${userId}`, payload);
                toast.success("Address added successfully!");
            }

            // Clear form
            setForm({
                adrLine1: "",
                adrLine2: "",
                city: "",
                state: "",
                country: "",
                zipCode: "",
                addrType: "HOME",
            });
            setEditingId(null);
            fetchAddresses(); // Refresh list
        } catch (err) {

            console.error("Error submitting address:", err.response?.data || err.message);
        }
    };


    const handleDelete = async (userId, addrId) => {
        console.log("Deleting address:", addrId);

        try {
            await axios.delete(`http://localhost:8080/address/${userId}/${addrId}`);
            fetchAddresses();
            toast.success("Address deleted successfully!");
        } catch (err) {
            console.error("Error deleting address:", err);
        }
    };

    const handleRestore = async (id) => {
        await axios.put(`http://localhost:8080/address/restore/${id}`);
        toast.success("Address restored!");
        fetchAddresses();
    };

    const handleEdit = (address) => {
        setForm(address);
        setEditingId(address.id);
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div>
                <div>
                    <h2 className="text-2xl font-semibold  mb-4">Manage Addresses</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded shadow">
                        <div>
                            <label className="block font-medium mb-1">Address Line 1 <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="adrLine1"
                                value={form.adrLine1}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Address Line 2</label>
                            <input
                                type="text"
                                name="adrLine2"
                                value={form.adrLine2}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">City <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="city"
                                value={form.city}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">State <span className="text-red-500">*</span></label>
                            <select
                                name="state"
                                value={form.state}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Select</option>
                                {stateOptions.map((state) => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Country <span className="text-red-500">*</span></label>
                            <select
                                name="country"
                                value={form.country}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Select</option>
                                {countryOptions.map((country) => (
                                    <option key={country} value={country}>{country}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Zip Code <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="zipCode"
                                value={form.zipCode}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Address Type <span className="text-red-500">*</span></label>
                            <select
                                name="addrType"
                                value={form.addrType}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded"
                            >
                                <option value="HOME">Home</option>
                                <option value="OFFICE">Office</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </div>
                        <div className="col-span-2 text-right">
                            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                                {editingId ? "Update Address" : "Add Address"}
                            </button>
                        </div>
                    </form>
                </div>
                <div className="mt-12">
                    <h3 className="text-xl font-medium  mb-4">Saved Addresses</h3>
                    <table className="w-full border  border-gray-400  rounded overflow-hidden">
                        <thead className=" bg-gradient-to-r  from-green-200 to-gray-200">
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
                                    <tr key={addr.id} className={`${addr.isDeleted ? "bg-red-100" : ""}`}>
                                        <td className="p-2">{addr.adrLine1}, {addr.adrLine2}</td>
                                        <td className="p-2">{addr.city}</td>
                                        <td className="p-2">{addr.state || "-"}</td>
                                        <td className="p-2">{addr.country || "-"}</td>
                                        <td className="p-2">{addr.zipCode}</td>
                                        <td className="p-2">{addr.addrType}</td>
                                        <td className="p-2 flex gap-2 items-center">
                                            {!addr.isDeleted ? (
                                                <>
                                                    <button onClick={() => handleEdit(addr)} className="text-blue-600 hover:underline">Edit</button>

                                                    <button onClick={() => handleDelete(userId, addr.id)} className="text-red-600 hover:underline"> Delete</button>

                                                    <button onClick={() => { setSelectedAddress(addr); toast.success("Address selected for delivery"); }}
                                                        className="text-green-700 font-semibold underline hover:text-green-900 mx-20">Select</button>
                                                </>
                                            ) : (
                                                <button onClick={() => handleRestore(addr.id)} className="text-green-600 hover:underline">Restore </button>
                                            )}
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center p-4 text-gray-500">
                                        No addresses found.
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default Address;
