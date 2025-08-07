import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext'

function Register() {
    const [info, setInfo] = useState(
        {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
        }
    )
    const { firstName, lastName, email, phone, password, confirmPassword } = info
    const navigate = useNavigate()
    const { register } = useAuth()

    const onRegister = async () => {
        if(!firstName || !lastName || !email || !phone || !password || !confirmPassword){
            toast.warn("Please fill all required fields.")
            return
        }

        if(!isValidPassword(password)){
            toast.warn("Password must be 5-20 characters long, contain a lowercase letter, a number, and a special character (#, @, $, *).")
            return
        }

        if(password !== confirmPassword){
            toast.warn("Passwords do not match.")
            return
        }
        const fullPhone = `+91-${phone}`
        const result = await register(firstName, lastName, email, fullPhone, password)

        if(result.success){
            toast.success("Registration successful!")
            navigate('/login')
        }
        else{
            toast.error(result.error)
        }
    }

    const isValidPassword = (pwd) => {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[#@$*]).{5,20}$/
        return regex.test(pwd);
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
            <div className="w-full max-w-lg bg-white border border-gray-300 shadow-xl rounded-lg p-8">
                <h1 className="text-2xl font-semibold mb-6">Register</h1>

                <div className="mb-4">
                    <label className="block mb-1 font-medium text-gray-700">First Name<span className="text-red-500">*</span></label>
                    <input onChange={(e) => setInfo({ ...info, firstName: e.target.value })} type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" required />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium text-gray-700">Last Name<span className="text-red-500">*</span></label>
                    <input onChange={(e) => setInfo({ ...info, lastName: e.target.value })} type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" required />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium text-gray-700">Email<span className="text-red-500">*</span></label>
                    <input onChange={(e) => setInfo({ ...info, email: e.target.value })} type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" required />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium text-gray-700">Phone Number<span className="text-red-500">*</span></label>
                    <div className='flex items-center'>
                        <span className='px-3 py-2 bg-gray-200 border border-gray-300 rounded-l-md text-gray-700'>+91-</span>
                        <input value={info.phone} onChange={(e) => setInfo({ ...info, phone: e.target.value })} type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-green-500" required />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium text-gray-700">Password<span className="text-red-500">*</span></label>
                    <input onChange={(e) => setInfo({ ...info, password: e.target.value })} type="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" required />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium text-gray-700">Confirm Password<span className="text-red-500">*</span></label>
                    <input onChange={(e) => setInfo({ ...info, confirmPassword: e.target.value })} type="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" required />
                </div>

                <div className="mb-4 text-sm">Already have an account?{" "}
                    <Link to="/login" className="text-green-600 hover:underline">Login here</Link>
                </div>

                <button className="cursor-pointer px-8 py-2 bg-green-600 hover:bg-green-900 transition text-white rounded-full relative left-42" type="submit" onClick={onRegister}>Register</button>
            </div>
        </div>

    )
}

export default Register
