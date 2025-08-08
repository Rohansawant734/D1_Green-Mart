import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { login } = useAuth()

  const onLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    const result = await login(email, password)

    if(result.success){
      toast.success('Login successful!')
      const user = JSON.parse(localStorage.getItem('user'))
      if(user.userRole == 'ADMIN'){
        navigate('/admin')
      }
      else{
        navigate('/')
      }
    }
    else{
      toast.error(result.error)
    }

    setLoading(false)
  }

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

        <button onClick={onLogin} disabled={loading} type="button" className="cursor-pointer px-8 py-2 bg-green-600 hover:bg-green-900 transition text-white rounded-full relative left-33">{loading ? 'Logging in...' : 'Sign In'}</button>
      </div>
    </div>
  )
}

export default Login
