import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
    return (
        <div className='footer'>
            <div className="flex flex-col sm:flex-row m-16 place-content-center">
                <div className="basis-128">
                    <img className='h-9 mb-10' src='https://el3.thembaydev.com/greenmart_fresh/wp-content/uploads/2021/10/logo-mobile.svg' />
                    <p className='w-90 mb-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic veniam quidem porro optio. Et consequatur possimus, quas reiciendis recusandae error?</p>
                </div>

                <div className="basis-64 flex flex-col">
                    <h3 className='font-semibold'>About</h3>
                    <Link to="/about" className='mt-10 mb-3'>About Us</Link>
                    <Link to="/contact" className='mb-3'>Contact Us</Link>
                    <Link to="/faq" className='mb-3'>FAQ</Link>
                </div>

                <div className="basis-64 flex flex-col">
                    <h3 className='font-semibold'>Help & Guide</h3>
                    <Link to="/tos" className='mt-10 mb-3'>Terms of Service</Link>
                    <Link to="/pri-pol" className='mb-3'>Privacy Policy</Link>
                    <Link to="/ship-del" className='mb-3'>Shipping & Delivery</Link>
                </div>

                <div className="basis-64 flex flex-col">
                    <h3 className='font-semibold mb-10'>NewsLetter</h3>
                    <p className='mt-10 mb-3'>Subscribe to stay update to date with thousands of deals & promotions</p>
                    <input type="email" className='mb-3 border border-black border-gray-400 rounded-lg i'/>
                    <button className='mb-3 buton'>Subscribe</button>
                </div>
            </div>
        </div>
    )
}

export default Footer
