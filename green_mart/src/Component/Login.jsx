import React from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

function Login() {
  return (
    <div className='m-20'>
      <div className="row">
        <div className="col"></div>
        <div className="col-4 border-r border-b shadow-xl border-gray-300">
          <h1 className='mb-4 font-sans'>Login</h1>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input onChange={(e) =>{
              setEmail(e.target.value)
            }} type="email" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input onChange ={(e) =>{
              setPassword(e.target.value)
            }} type="password" className="form-control" />
          </div>
          <div className="mb-3">
            <div className='mb-3'>Don't have a account yet?<Link to='/register'> Register here</Link></div>
            <button className='button'>Login</button>
          </div>
        </div>
        <div className="col"></div>
      </div>
    </div>
  )
}

export default Login
