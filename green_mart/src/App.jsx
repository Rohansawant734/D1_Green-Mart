import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import ScrollToTop from './Component/ScrollToTop';
import Container from './Component/Container';
import Container2 from './Component/Container2';
import Login from './Component/Login';
import Register from './Component/Register';

// User Pages
import Home from './pages/users/Home';
import Product_Details from './pages/users/Product_Details';

import Cart from './pages/users/Cart';
import Categories from './pages/users/Categories';
import Order from './pages/users/Order';
import Wish_List from './pages/users/Wish_list';
import Contact from './pages/users/Contact';
import SearchResult from './pages/users/SearchResults';
import DashBoard from './pages/users/DashBoard';
import Edit_Profile from './pages/users/Edit_Profile';
import Address from './pages/users/Address';
import AccountLayout from './pages/users/AccountLayout';
import Checkout from './pages/users/Checkout'


// Admin Pages
import Adminlayout from './pages/admins/Adminlayout';
import AdminDashboard from './pages/admins/AdminDashBoard';
import AdminCategories from './pages/admins/AdminCategories';
import CustomerDetails from './pages/admins/CustomerDetails';
import OrderDetails from './pages/admins/OrderDetails';
import PaymentDetails from './pages/admins/PaymentDetails';
import ProductDetails from './pages/admins/ProductDetails';
import Receipt from './pages/admins/Receipt';
import Reviews_Rating from './pages/admins/Reviews_Rating';
import Supplier from './pages/admins/Supplier';
import UserDetails from './pages/admins/UserDetails';
import About from './Component/About';
import YourOrders from './pages/users/YourOrders';


const App = () => {
  const location = useLocation()

  const isAdminRoute = location.pathname.startsWith('/admin')
  const isLoginRoute = location.pathname.startsWith('/login')
  const isRegisterRoute = location.pathname.startsWith('/register')

  return (
    <div>
      <ScrollToTop />
      {!isAdminRoute && !isLoginRoute && !isRegisterRoute && <Container />}

      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Main Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product_Details />} />
        <Route path="/wishlist" element={<Wish_List />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/search/:keyword" element={<SearchResult />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path="/your-orders" element={<YourOrders />} />


        {/* User Account Routes */}
        <Route path="/account" element={<AccountLayout />}>
          <Route index element={<DashBoard />} />
          <Route path="your-orders" element={<YourOrders />} />
          <Route path="edit-profile" element={<Edit_Profile />} />
          <Route path="addresses" element={<Address />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<Adminlayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="products" element={<ProductDetails />} />
          <Route path="suppliers" element={<Supplier />} />
          <Route path="orders" element={<OrderDetails />} />
          <Route path="receipt" element={<Receipt />} />
          <Route path="customers" element={<CustomerDetails />} />
          <Route path="payments" element={<PaymentDetails />} />
          <Route path="reviews" element={<Reviews_Rating />} />
          <Route path="users" element={<UserDetails />} />
        </Route>
      </Routes>

      {!isAdminRoute && !isLoginRoute && !isRegisterRoute && <Container2 />}

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        transition:Bounce
      />

    </div>
  );
};

export default App;
