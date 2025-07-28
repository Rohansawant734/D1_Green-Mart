import React from 'react'
import { Link, useNavigate,NavLink } from 'react-router-dom'
import { useState } from 'react'
import { assets } from '../assets/assets'
import { useCart } from '../context/CartContext'

function Navigate(){
   const [open, setOpen] = useState(false)
   const [searchQuery,setSearchQuery] = useState('');

   const{cartItems}= useCart();
   const navigate = useNavigate()

   const doLogin = () =>{
        navigate('/login')
   }
   //for the search bar while search navigate with appended as a query parameter
   //api
//     useEffect(() => {
//     if (!query) return;

//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(`/api/products/search?q=${encodeURIComponent(query)}`);
//         setProducts(res.data);
//       } catch (err) {
//         console.error('Error fetching products:', err);
//         setProducts([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [query]);
   const handleSearch = (e) =>{
    e.preventDefault();
    if(!searchQuery.trim()) return;
    //Encodes special characters so the string is safe to use in a URL. Example: "milk & honey" becomes "milk%20%26%20honey"
    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery('');

   }
   
  return (
   <div>
     <nav className=" fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white  transition-all">

            <Link to='/'>
                <img className='h-9'src='https://el3.thembaydev.com/greenmart_fresh/wp-content/uploads/2021/10/logo-mobile.svg'></img>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-6">

                <Link to='/'>Home</Link>
                <Link to='/categories'>Categories</Link>
                <Link to='/wishlist' className="hover:text-green-600">Wishlist</Link>
                <Link to='/orders' className="hover:text-green-600">Your Order</Link>
                <Link to='/contact' className="hover:text-green-600">Contact</Link>
                {/*//If the user presses the Enter key, it runs your handleSearch function.*/}
                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input
                    text="text"
                    placeholder="Search products"
                    value={searchQuery}
                    onChange={(e)=>setSearchQuery(e.target.value)}
                    //If the user presses the Enter key, it runs your handleSearch function.
                    onKeyDown={(e)=> e.key === 'Enter' && handleSearch(e)} 
                    className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text"
                    />
                   <img src={assets.search_icon} 
                   alt='search' 
                   className='w-4 h-4'
                   onClick={handleSearch}
                   />
                </div>



                <div className="relative cursor-pointer">
                    <Link to='/cart'>
                        <img src={assets.nav_cart_icon} alt='cart' className='w-6 opacity-80'/>
                    <button className="absolute -top-4 -right-3 text-xs text-green-500 font-bold w-[16px] h-[19px] rounded-full">{cartItems.length}</button>
                    </Link>
                </div>



                
                <div className="relative cursor-pointer">
                    <Link to='/account'>
                        <img src={assets.profile_icon} alt='cart' className='w-10 opacity-80'/>
                    </Link>
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


        </nav>
   </div>
  )
}

export default Navigate
