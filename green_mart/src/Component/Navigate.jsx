import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { assets } from '../assets/assets'

function Navigate(){
   const [open, setOpen] = useState(false)

   const navigate = useNavigate()

   const doLogin = () =>{
        navigate('/login')
   }
  return (
   <div>
     <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

            <Link to='/'>
                <img className='h-9'src='https://el3.thembaydev.com/greenmart_fresh/wp-content/uploads/2021/10/logo-mobile.svg'></img>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <Link to='/'>Home</Link>
                <Link to='/categories'>Categories</Link>
                <Link to=''>Contact</Link>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                   <img src={assets.search_icon} alt='search' className='w-4 h-4'/>
                </div>

                <div className="relative cursor-pointer">
                   <img src={assets.nav_cart_icon} alt='cart' className='w-6 opacity-80'/>
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-green-500 w-[18px] h-[18px] rounded-full">3</button>
                </div>

                <button onClick = {doLogin} className="cursor-pointer px-8 py-2 bg-green-500 hover:bg-green-600 transition text-white rounded-full">
                    Login
                </button>
            </div>

            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                {/* Menu Icon SVG */}
                <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="21" height="1.5" rx=".75" fill="#426287" />
                    <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
                    <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
                </svg>
            </button>

            {/* Mobile Menu
            <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                <a href="#" className="block">Home</a>
                <a href="#" className="block">About</a>
                <a href="#" className="block">Contact</a>
                <button className="cursor-pointer px-6 py-2 mt-2 bg-green-500 hover:bg-green-600 transition text-white rounded-full text-sm">
                    Login
                </button>
            </div> */}

        </nav>
   </div>
  )
}

export default Navigate
