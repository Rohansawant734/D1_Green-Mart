import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white border border-gray-300 shadow-xl rounded-lg p-8">
        <h1 className="text-2xl font-semibold mb-6 text-center">Sign In</h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" required/>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" required/>
        </div>

        <div className="mb-4 text-sm text-gray-600"> Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">Sign up here</Link>
        </div>

        <button type="submit" className="w-full button">Sign In</button>
      </div>
    </div>
  )
}

export default Login
