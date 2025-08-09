import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext'

function Register() {
  const [info, setInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })

  const { firstName, lastName, email, phone, password, confirmPassword } = info
  const navigate = useNavigate()
  const { register } = useAuth()

  const onRegister = async (e) => {
    e.preventDefault() // prevent page reload on form submit

    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
      toast.warn('Please fill all required fields.')
      return
    }

    if (!isValidPassword(password)) {
      toast.warn(
        'Password must be 5-20 characters long, contain a lowercase letter, a number, and a special character (#, @, $, *).'
      )
      return
    }

    if (password !== confirmPassword) {
      toast.warn('Passwords do not match.')
      return
    }
    const fullPhone = `+91-${phone}`
    const result = await register(firstName, lastName, email, fullPhone, password)

    if (result.success) {
      toast.success('Registration successful!')
      navigate('/login')
    } else {
      toast.error(result.error)
    }
  }

  const isValidPassword = (pwd) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[#@$*]).{5,20}$/
    return regex.test(pwd)
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-white to-green-400 p-6">
      <div className="w-full max-w-xl bg-white border border-gray-300 shadow-2xl rounded-lg p-10 min-h-[460px]">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-900">Register</h1>

        <form onSubmit={onRegister}>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">
              First Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setInfo({ ...info, firstName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-green-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">
              Last Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setInfo({ ...info, lastName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-green-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setInfo({ ...info, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-green-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">
              Phone Number<span className="text-red-500">*</span>
            </label>
            <div className="flex items-center">
              <span className="px-4 py-3 bg-gray-200 border border-gray-300 rounded-l-md text-gray-700">
                +91-
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setInfo({ ...info, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-r-md focus:outline-none focus:ring-4 focus:ring-green-400"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">
              Password<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setInfo({ ...info, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-green-400"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 font-medium text-gray-700">
              Confirm Password<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setInfo({ ...info, confirmPassword: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-green-400"
              required
            />
          </div>

          <div className="mb-6 text-sm text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-green-700 font-semibold hover:underline">
              Login here
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-600 hover:bg-green-800 text-white text-lg font-semibold rounded-lg transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
