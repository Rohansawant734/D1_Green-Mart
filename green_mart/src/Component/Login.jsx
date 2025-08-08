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
      if(user.userRole === 'ADMIN'){
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
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-white via-green-100 to-green-400 px-4">
      <div className="bg-white border border-gray-300 shadow-2xl rounded-lg p-10 max-w-xl w-full min-h-[500px]">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-900">Sign In</h1>

        <form onSubmit={onLogin}>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email" onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-4 focus:ring-green-400 focus:outline-none"
              required autoComplete="username"/>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password" onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-4 focus:ring-green-400 focus:outline-none" required autoComplete="current-password"/>
          </div>

          <div className="mb-6 text-sm text-gray-600 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-green-700 font-semibold hover:underline">
              Sign up here
            </Link>
          </div>

          <button
            type="submit" disabled={loading} className="w-full py-3 bg-green-600 hover:bg-green-800 text-white text-lg font-semibold rounded-lg transition duration-300 disabled:opacity-50">
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
