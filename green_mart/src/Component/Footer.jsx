import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className='mt-10 border border-b-gray-600'>
            <div className="flex flex-col sm:flex-row flex-wrap gap-12 justify-between m-10">
                {/* Logo and Description */}
                <div className="flex-1 min-w-[250px]">
                    <img
                        className="h-9 mb-6"
                        src="https://el3.thembaydev.com/greenmart_fresh/wp-content/uploads/2021/10/logo-mobile.svg"
                        alt="Logo"
                    />
                    <p className="text-gray-700 max-w-md">
                        Delivering fresh, quality groceries right to your doorstep. Experience the best selection with unbeatable prices and fast delivery
                    </p>
                </div>

                {/* About Links */}
                <div className="flex-1 min-w-[180px]">
                    <h3 className="font-semibold text-lg mb-4">About</h3>
                    <div className="flex flex-col space-y-2 text-gray-600">
                        <Link to="/about">About Us</Link>
                        <Link to="/contact">Contact Us</Link>
                        <Link to="/faq">FAQ</Link>
                    </div>
                </div>

                {/* Help & Guide */}
                <div className="flex-1 min-w-[180px]">
                    <h3 className="font-semibold text-lg mb-4">Help & Guide</h3>
                    <div className="flex flex-col space-y-2 text-gray-600">
                        <Link to="/tos">Terms of Service</Link>
                        <Link to="/pri-pol">Privacy Policy</Link>
                        <Link to="/ship-del">Shipping & Delivery</Link>
                    </div>
                </div>

                {/* Newsletter */}
                <div className="flex-1 min-w-[250px]">
                    <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
                    <p className="text-gray-700 mb-3">
                        Subscribe to stay up to date with thousands of deals & promotions
                    </p>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-3 py-2 border border-gray-400 rounded-md mb-3"
                    />
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
                        Subscribe
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Footer
