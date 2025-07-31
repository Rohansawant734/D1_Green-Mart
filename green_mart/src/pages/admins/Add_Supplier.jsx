import React, { useState } from 'react'

const Add_Supplier = () => {
  const[form ,setFrom] = useState({
     name: '',
    email: '',
    phone: '',
    address: '',
  })

  const handleChange = (e) => {
    const{name, value} = e.target;
    setFrom((prev) => ({...prev,[name]:value}));
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.name || !form.email || !form.phone || !form.address) {
      alert("All fields are required!");
      return;
    }

    //Send form to API
    console.log("Supplier Added:", form);

    // Reset form
    setForm({
      name: '',
      email: '',
      phone: '',
      address: '',
    });

    alert("Supplier added successfully!");
  };
   return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">Add New Supplier</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Supplier Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter supplier name"
          />
        </div>

        <div>
          <label className="block font-medium">Contact Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter email"
          />
        </div>

        <div>
          <label className="block font-medium">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter phone number"
          />
        </div>

        <div>
          <label className="block font-medium">Address</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            rows={3}
            className="w-full mt-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter supplier address"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          Add Supplier
        </button>
      </form>
    </div>
  );
}

export default Add_Supplier
