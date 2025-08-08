import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import AddressTable from "../../Component/AddressTable";
import AddressForm from "../../Component/AddressForm";
 

const Address = () => {
  const { authUser } = useAuth();
  const userId = authUser?.userId;
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

  const stateOptions = [
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];

  const countryOptions = ["India", "USA", "UK", "Canada"];

  useEffect(() => {
    if (userId) fetchAddresses();
    else setAddresses([]);
  }, [userId]);

  const fetchAddresses = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/address/${userId}`);
      setAddresses(res.data);
    } catch (err) {
      console.error("Error fetching addresses:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.adrLine1 || !form.adrLine2 || !form.city || !form.zipCode || !form.state || !form.country) {
      toast.error("Required fields are missing.");
      return;
    }

    if (!/^\d{5,6}$/.test(form.zipCode)) {
      toast.error("Invalid zip code format.");
      return;
    }

    try {
      if (editingId) {
        await axios.put(`http://localhost:8080/address/${userId}/${editingId}`, form);
        toast.success("Address updated.");
      } else {
        await axios.post(`http://localhost:8080/address/${userId}`, form);
        toast.success("Address added.");
      }
     
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
      fetchAddresses();
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  const handleDelete = async (userId, addrId) => {
    try {
      await axios.delete(`http://localhost:8080/address/${userId}/${addrId}`);
      fetchAddresses();
      toast.success("Address deleted.");
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleEdit = (address) => {
    setForm(address);
    setEditingId(address.id);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Addresses</h2>
      <AddressForm
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        editingId={editingId}
        stateOptions={stateOptions}
        countryOptions={countryOptions}
      />
      <div className="mt-12">
        <h3 className="text-xl font-medium mb-4">Saved Addresses</h3>
        <AddressTable
          addresses={addresses}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          userId={userId}
        />
      </div>
    </div>
  );
};

export default Address;
