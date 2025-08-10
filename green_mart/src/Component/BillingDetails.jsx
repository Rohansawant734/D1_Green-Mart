import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useAddress } from "../context/AddressContext";
import { useNavigate } from "react-router-dom";

const BillingDetails = ({ onChange }) => {
  const { authUser } = useAuth();
  const { selectedAddress } = useAddress();
  const navigate = useNavigate();

  const [billing, setBilling] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    adrLine1: "",
    adrLine2: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  });

  const stateOptions = [
    "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
    "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
    "Maharashtra", "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana",
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  const countryOptions = ["India", "USA", "UK", "Canada"];

  // Auto-fill when authUser or selectedAddress changes
  useEffect(() => {
    setBilling((prev) => ({
      ...prev,
      firstName: authUser?.firstName || "",
      lastName: authUser?.lastName || "",
      email: authUser?.email || "",
      phone: authUser?.phone || "",
      adrLine1: selectedAddress?.adrLine1 || "",
      adrLine2: selectedAddress?.adrLine2 || "",
      city: selectedAddress?.city || "",
      state: selectedAddress?.state || "",
      country: selectedAddress?.country || "",
      zipCode: selectedAddress?.zipCode || "",
    }));
  }, [authUser, selectedAddress]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBilling((prev) => ({ ...prev, [name]: value }));
    if (onChange) onChange({ ...billing, [name]: value });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Billing Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">First Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="firstName"
            value={billing.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Last Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="lastName"
            value={billing.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Email <span className="text-red-500">*</span></label>
          <input
            type="email"
            name="email"
            value={billing.email}
            onChange={handleChange}
            placeholder="Abc@example.com"
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Phone <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="phone"
            value={billing.phone}
            onChange={handleChange}
            placeholder="+91 1234567890"
            className="border p-2 w-full"
          />
        </div>
        <div className="col-span-2">
          <label className="block font-medium mb-1">Address Line 1 <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="adrLine1"
            value={billing.adrLine1}
            onChange={handleChange}
            placeholder="Address Line 1"
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Address Line 2</label>
          <input
            type="text"
            name="adrLine2"
            value={billing.adrLine2}
            onChange={handleChange}
            placeholder="Address Line 2"
            className="border p-2 w-full"
          />
        </div>
        <div></div>
        <div>
          <label className="block font-medium mb-1">City <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="city"
            value={billing.city}
            onChange={handleChange}
            placeholder="City"
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">State <span className="text-red-500">*</span></label>
          <select name="state" value={billing.state} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="">Select</option>
            {stateOptions.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Country <span className="text-red-500">*</span></label>
          <select name="country" value={billing.country} onChange={handleChange} className="w-full p-2 border rounded">
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
            value={billing.zipCode}
            onChange={handleChange}
            placeholder="Zip Code"
            className="border p-2 w-full"
          />
        </div>
        <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={() => navigate("/account/addresses")}
          className="text-green-600 underline text-sm"
        >
          {selectedAddress ? "Change Address" : "Select Address"}
        </button>
      </div>
      </div>
    </div>
  );
};

export default BillingDetails;
