import React from 'react'
import { Link, useNavigate, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { assets } from '../assets/assets'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'

function Navigate() {
    const [open, setOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('');
    const { logout, authUser } = useAuth();

    const { cartItems } = useCart();
    const navigate = useNavigate()

    const doLogin = () => {
        navigate('/login')
    }
    
    const onSearch = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        //Encodes special characters so the string is safe to use in a URL. Example: "milk & honey" becomes "milk%20%26%20honey"
        navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
        setSearchQuery('');
        setOpen(false) // closes menu after searching on mobile
    }

    const onLogout = () => {
        logout()
        toast.success('Logged out successfully!');
        navigate('/')
        setOpen(false) // closes mobile navigation menu
    }

    return (
        <div>
            <nav className=" fixed top-0 left-0 right-0 z-50 border-b border-gray-300 bg-white">
                <div className='flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4'>

                    <Link to='/'>
                        <img className='h-9' src='https://el3.thembaydev.com/greenmart_fresh/wp-content/uploads/2021/10/logo-mobile.svg' />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden sm:flex items-center gap-6">

                        <Link to='/'>Home</Link>
                        <Link to='/categories'>Categories</Link>
                        <Link to='/wishlist' className="hover:text-green-600">Wishlist</Link>
                        <Link to='/your-orders' className="hover:text-green-600">Your Orders</Link>
                        <Link to='/contact' className="hover:text-green-600">Contact</Link>

                        {/* Search Bar--wil call the onSearch function on the press of the Enter Key */}
                        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                            <input text="text" placeholder="Search products"
                                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && onSearch(e)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text"
                            />
                            <img src={assets.search_icon} alt='search' className='w-4 h-4' onClick={onSearch} />
                        </div>

                        {/* Cart */}
                        <div className="relative cursor-pointer">
                            <Link to='/cart'>
                                <img src={assets.nav_cart_icon} alt='cart' className='w-6 opacity-80' />
                                <span className="absolute -top-4 -right-3 text-xs text-green-500 font-bold w-[16px] h-[19px] rounded-full ">{cartItems.length}</span>
                            </Link>
                        </div>

                        {/* Profile */}
                        <div className="relative cursor-pointer">
                            <Link to='/account'>
                                <img src={assets.profile_icon} alt='profile' className='w-10 opacity-80' />
                            </Link>
                        </div>
                        {
                            // If authUser is not null then show Logout option else show Login option
                            authUser ? (

                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-gray-600">Hello, {authUser.firstName}
                                    </span>
                                    <button onClick={onLogout} className="cursor-pointer px-8 py-2 bg-red-600 hover:bg-red-800 transition text-white rounded-full">
                                        Logout
                                    </button>
                                </div>) :
                                (<button onClick={doLogin} className="cursor-pointer px-8 py-2 bg-green-600 hover:bg-green-900 transition text-white rounded-full">
                                    Login
                                </button>
                                )
                        }
                    </div>

                    {/* Mobile Navigation Menu */}
                    <button onClick={() => setOpen(!open)} aria-label="Menu" className="sm:hidden">
                        {/* Menu Icon SVG */}
                        <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="21" height="1.5" rx=".75" fill="#426287" />
                            <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
                            <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
                        </svg>
                    </button>
                </div>

                {/* Mobile Dropdown */}
                {open && (
                    <div className={`sm:hidden overflow-hidden px-6 border-t border-gray-200 bg-white transition-all duration-300 ease-in-out ${open ? "max-h-[500px] opacity-100 py-4 delay-[50ms]" : "max-h-0 opacity-0 py-0 delay-[0ms]"}`}>
                        <div className="flex flex-col gap-4">
                            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
                            <Link to="/categories" onClick={() => setOpen(false)}>Categories</Link>
                            <Link to="/wishlist" onClick={() => setOpen(false)}>Wishlist</Link>
                            <Link to="/orders" onClick={() => setOpen(false)}>Your Orders</Link>
                            <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>

                            <div className="flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                                <input placeholder="Search products" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && onSearch(e)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" />
                                <img src={assets.search_icon} alt='search' className="w-4 h-4 cursor-pointer" onClick={onSearch} />
                            </div>
                        </div>

                        {/* Cart */}
                        <Link to="/cart" className="flex items-center gap-2 mt-3" onClick={() => setOpen(false)}>
                            <img src={assets.nav_cart_icon} alt="cart" className="w-6 opacity-80" />
                            <span className="relative -top-2 right-2 text-green-500 font-bold">{cartItems.length}</span>
                        </Link>

                        {/* Authentication buttons */}
                        {authUser ? (
                            <div className="flex flex-col">
                                <span className="mt-3 text-lg font-bold text-gray-600">Hello, {authUser?.firstName} </span>
                                <button onClick={onLogout} className="mt-3 px-5 py-2 bg-red-600 hover:bg-red-800 transition text-white rounded-full">Logout</button>
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                <button onClick={doLogin} className="mt-3 px-5 py-2 bg-green-600 hover:bg-green-900 transition text-white rounded-full">
                                    Login
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </nav>
        </div>
    )
}

export default Navigate
