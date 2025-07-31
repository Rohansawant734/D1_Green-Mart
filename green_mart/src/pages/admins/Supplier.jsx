import React from 'react'
import { dummySuppliers } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Supplier = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Left */}
      <div className="w-64 bg-gray-100 p-4 shadow-md">
        <h2 className="text-lg font-semibold mb-4">Admin Panel</h2>
        <ul className="space-y-3">
          <li>
            <Link to="/admin/orders" className="block hover:text-orange-500 cursor-pointer">
              Order Table
            </Link>
          </li>
          <li>
            <Link to="/admin/payments" className="block hover:text-orange-500 cursor-pointer">
              Payment Status
            </Link>
          </li>
          <li>
            <Link to="/admin/customers" className="block hover:text-orange-500 cursor-pointer">
              Customer
            </Link>
          </li>
          <li>
            <Link to="/admin/products" className="block hover:text-orange-500 cursor-pointer">
              Product
            </Link>
          </li>
          <li>
            <Link to="/admin/reviews" className="block hover:text-orange-500 cursor-pointer">
              Reviews & Rating
            </Link>
          </li>
        </ul>
      </div>
      {/* Main Content - Right */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Supplier List</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-600 text-left text-sm uppercase tracking-wider">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Address</th>
              </tr>
            </thead>
            <tbody>
              {dummySuppliers.map((supplier, index) => (
                <tr
                  key={supplier.id}
                  className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                >
                  <td className="py-2 px-4">{supplier.name}</td>
                  <td className="py-2 px-4">{supplier.email}</td>
                  <td className="py-2 px-4">{supplier.phone}</td>
                  <td className="py-2 px-4">{supplier.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Supplier
