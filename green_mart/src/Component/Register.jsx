import React from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

function Register() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
            <div className="w-full max-w-lg bg-white border border-gray-300 shadow-xl rounded-lg p-8">
                <h1 className="text-2xl font-semibold mb-6">Register</h1>

                <div className="mb-4">
                    <label className="block mb-1 font-medium text-gray-700">First Name<span className="text-red-500">*</span></label>
                    <input onChange={(e) => setInfo({ ...info, firstName: e.target.value })} type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" required/>
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium text-gray-700">Last Name<span className="text-red-500">*</span></label>
                    <input onChange={(e) => setInfo({ ...info, lastName: e.target.value })} type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" required/>
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium text-gray-700">Email<span className="text-red-500">*</span></label>
                    <input onChange={(e) => setInfo({ ...info, email: e.target.value })} type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" required/>
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium text-gray-700">Phone Number<span className="text-red-500">*</span></label>
                    <input onChange={(e) => setInfo({ ...info, phone: e.target.value })} type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" required/>
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium text-gray-700">Password<span className="text-red-500">*</span></label>
                    <input onChange={(e) => setInfo({ ...info, password: e.target.value })} type="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" required/>
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium text-gray-700">Confirm Password<span className="text-red-500">*</span></label>
                    <input onChange={(e) => setInfo({ ...info, confirmPassword: e.target.value })} type="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" required/>
                </div>

                <div className="mb-4 text-sm">Already have an account?{" "}
                    <Link to="/login" className="text-green-600 hover:underline">Login here</Link>
                </div>

                <button className="w-full button" type="submit">Register</button>
            </div>
        </div>

    )
}

export default Register
