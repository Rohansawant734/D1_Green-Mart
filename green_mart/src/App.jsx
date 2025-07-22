import React from 'react'
import Navigate from './Component/Navigate'
import { Routes,Route } from 'react-router-dom'
//users
import Account from './pages/users/Account'
import Cart from './pages/users/Cart'
import Categories from './pages/users/Categories'
import Edit_Profile from './pages/users/Edit_Profile'
import Home from './pages/users/Home'
import Login from './pages/users/Login'
import Product_Details from './pages/users/Product_Details'
import Registration from './pages/users/Registration'
import Wish_List from './pages/users/Wish_List'
import Your_Order from './pages/users/Your_Order'

//admin
import Add_Supplier from './pages/admins/Add_Supplier'
import AdminCategories from './pages/admins/Categories'
import Customer from './pages/admins/Customer'
import AdminLogin from './pages/admins/Login'
import Order_Table from './pages/admins/Order_Table'
import Payment_Status from './pages/admins/Payment_Status'
import Product from './pages/admins/Product'
import Receipt from './pages/admins/Receipt'
import AdminRegistration from './pages/admins/Registration'
import Reviews_Rating from './pages/admins/Reviews_Rating'
import Supplier from './pages/admins/Supplier'
const App = () => {
  return (
    <div>
      <Navigate/>
      <main>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/product/:id" element={<Product_Details />} />
        <Route path="/wishlist" element={<Wish_List/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/orders" element={<Your_Order/>} />
        <Route path="/account" element={<Account />} />
        <Route path="/edit-profile" element={<Edit_Profile />} />
         {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegistration/>} />
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
      </main>
    </div>
  )
}

export default App
