import React from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

function Register() {
    return (
        <div className='m-20'>
            <div className="row">
                <div className="col"></div>
                <div className="col-4 border-r border-b shadow-xl border-gray-300">
                    <h1 className='mb-4 font-sans'>Register</h1>
                    <div className='container'>
                        <div className='mb-3'>
                            <label htmlFor=''>First Name</label>
                            <input
                                onChange={(e) => setInfo({ ...info, firstName: e.target.value })}
                                type='text'
                                className='form-control'
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor=''>Last Name</label>
                            <input
                                onChange={(e) => setInfo({ ...info, lastName: e.target.value })}
                                type='text'
                                className='form-control'
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor=''>Email</label>
                            <input
                                onChange={(e) => setInfo({ ...info, email: e.target.value })}
                                type='text'
                                className='form-control'
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor=''>Phone Number</label>
                            <input
                                onChange={(e) => setInfo({ ...info, phone: e.target.value })}
                                type='text'
                                className='form-control'
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor=''>Password</label>
                            <input
                                onChange={(e) => setInfo({ ...info, password: e.target.value })}
                                type='password'
                                className='form-control'
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor=''>Confirm Password</label>
                            <input
                                onChange={(e) =>
                                    setInfo({ ...info, confirmPassword: e.target.value })
                                }
                                type='password'
                                className='form-control'
                            />
                        </div>

                        <div className='mb-3'>
                            <div className='mb-3'>
                                Already have an account yet?<Link to='/login'> Login here</Link>
                            </div>
                            <button className='button'>
                                Register
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col"></div>
            </div>
        </div>
    )
}

export default Register
