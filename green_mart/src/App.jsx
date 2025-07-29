import React from 'react'

import Navigate from './Component/Navigate'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import ScrollToTop from './Component/ScrollToTop'
//users
import DashBoard from './pages/users/DashBoard'
import Cart from './pages/users/Cart'
import Categories from './pages/users/Categories'
import Edit_Profile from './pages/users/Edit_Profile'
import Home from './pages/users/Home'
import Product_Details from './pages/users/Product_Details'
import Wish_List from './pages/users/Wish_List'
import Your_Order from './pages/users/Your_Order'
import Address from './pages/users/Address'
import SearchResult from './pages/users/SearchResults'
import Checkout from './pages/users/Checkout'

//admin
import Add_Supplier from './pages/admins/Add_Supplier'
import AdminCategories from './pages/admins/Categories'
import Customer from './pages/admins/Customer'
import Order_Table from './pages/admins/Order_Table'
import Payment_Status from './pages/admins/Payment_Status'
import Product from './pages/admins/Product'
import Receipt from './pages/admins/Receipt'
import Reviews_Rating from './pages/admins/Reviews_Rating'
import Supplier from './pages/admins/Supplier'
import AccountLayout from './pages/users/AccountLayout';

import Container from './Component/Container'
import Container2 from './Component/Container2'
import Login from './Component/Login'
import Register from './Component/Register'
import Contact from './pages/users/Contact'
import FloatingStack from './Component/FloatingStack'
const App = () => {
  return (
    <div>
        <ScrollToTop/>
        <Container/>
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>}/>
            <Route path="/" element={<Home />} />
            <Route path="/product_details" element={<Product_Details />} />
            <Route path="/wishlist" element={<Wish_List/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/orders" element={<Your_Order/>} />
            <Route path='/contact' element={<Contact/>} />
            <Route path='/search' element={<SearchResult/>} />
            <Route path='/checkout' element={<Checkout/>} />
            <Route path="/account" element={<AccountLayout />} >
              <Route index element={<DashBoard />} />
              <Route path="orders" element={<Your_Order />} />
              <Route path="edit-profile" element={<Edit_Profile />} />
              <Route path="addresses" element={<Address/>} />
            </Route>
         {/* Admin Routes */}
            <Route path="/admin/categories" element={<AdminCategories />} />
            <Route path="/admin/products" element={<Product/>} />
            <Route path="/admin/add-supplier" element={<Add_Supplier />} />
            <Route path="/admin/suppliers" element={<Supplier />} />
            <Route path="/admin/orders" element={<Order_Table />} />
            <Route path="/admin/receipt" element={<Receipt/>} />
            <Route path="/admin/customers" element={<Customer />} />
            <Route path="/admin/payments" element={<Payment_Status />} />
            <Route path="/admin/reviews" element={<Reviews_Rating/>} />
      
        </Routes>
        <Container2/> 
        <ToastContainer 
           position="top-right"
        autoClose={1500}
         hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
        />
        <FloatingStack />
    </div>
  )
}

export default App
