import React from 'react'
import { Link } from 'react-router-dom'

const Your_Order = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-15">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Your Orders</h2>
        <p className="text-center text-gray-600 mb-6">You have no orders yet.</p>
        <div className="text-center">
          <button onClick={() => {
            // Redirect to shop page or perform any action
            window.location.href = '/';
          }} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default Your_Order
