// components/AddressForm.jsx
import React from "react";

const AddressForm = ({
  form,
  stateOptions,
  countryOptions,
  handleChange,
  handleSubmit,
  editingId
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded shadow"
    >
      <div>
        <label className="block font-medium mb-1">Address Line 1 <span className="text-red-500">*</span></label>
        <input type="text" name="adrLine1" value={form.adrLine1} onChange={handleChange} required className="w-full p-2 border rounded" />
      </div>
      <div>
        <label className="block font-medium mb-1">Address Line 2</label>
        <input type="text" name="adrLine2" value={form.adrLine2} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>
      <div>
        <label className="block font-medium mb-1">City <span className="text-red-500">*</span></label>
        <input type="text" name="city" value={form.city} onChange={handleChange} required className="w-full p-2 border rounded" />
      </div>
      <div>
        <label className="block font-medium mb-1">State <span className="text-red-500">*</span></label>
        <select name="state" value={form.state} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">Select</option>
          {stateOptions.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-medium mb-1">Country <span className="text-red-500">*</span></label>
        <select name="country" value={form.country} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">Select</option>
          {countryOptions.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-medium mb-1">Zip Code <span className="text-red-500">*</span></label>
        <input type="text" name="zipCode" value={form.zipCode} onChange={handleChange} required className="w-full p-2 border rounded" />
      </div>
      <div>
        <label className="block font-medium mb-1">Address Type <span className="text-red-500">*</span></label>
        <select name="addrType" value={form.addrType} onChange={handleChange} required className="w-full p-2 border rounded">
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
  );
};

export default AddressForm;
