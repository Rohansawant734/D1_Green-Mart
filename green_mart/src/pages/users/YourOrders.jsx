import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-blue-100 text-blue-800",
  SHIPPED: "bg-indigo-100 text-indigo-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

const YourOrders = () => {
  const { authUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const navigate = useNavigate();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    if (!authUser?.userId) {
      console.warn("No user ID found in authUser:", authUser);
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/orders/user/${authUser?.userId}`
        );
        console.log("Orders API response:", res.data);
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [authUser]);

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);
  

  if (loading) {
    return <p className="text-center mt-6 text-gray-500">Loading orders...</p>;
  }  
  if (!authUser?.userId) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-green-200 p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Login to view your orders
        </h2>
        <p className="text-gray-600 mb-6">
          Please sign in to see your order history and track your purchases.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="bg-green-500 text-white w-40 px-4 py-3 rounded-lg shadow hover:bg-green-800 transition"
        >
          Login
        </button>
      </div>
    );
  }

  return (
     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-200 py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-6">Your Orders</h2>

      {orders.length === 0 ? (
      
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Your Orders</h2>
          <p className="text-center text-gray-600 mb-6">You have no orders yet.</p>
          <div className="text-center">
            <button
              onClick={() => navigate('/')}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            >
              Shop Now
            </button>
          </div>
        </div>
      
      ) : (
        <>
         <div className="space-y-6">
  {currentOrders.map((order) => (
    <div
      key={order.id}
      className="p-5 border rounded-xl shadow-sm bg-white hover:shadow-lg transition-all duration-200"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-xl text-gray-800">
            Order No: {order.id}
          </h3>
          <p className="text-sm text-gray-500">{order.creationDate}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            statusColors[order.orderStatus] ||
            "bg-gray-200 text-gray-800"
          }`}
        >
          {order.orderStatus}
        </span>
      </div>

      {/* Order Summary */}
      <div className="mt-4 space-y-1">
        <p className="text-lg font-medium">
          Total:{" "}
          <span className="text-green-600 font-bold">
            ₹{order.orderAmount}
          </span>
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Delivery Address:</span>{" "}
          {order.deliveryAddress}
        </p>
      </div>

      {/* Expand/Collapse Items */}
      {expandedOrder === order.id ? (
        <div className="mt-5 border-t pt-4">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            Order Items
          </h4>
          <div className="space-y-3">
            {order.orderLines?.map((item) => (
              <div
                key={item.orderLineId}
                className="flex items-center gap-4 p-2 border rounded-lg bg-gray-50"
              >
                {/* Product Thumbnail (placeholder if no image) */}
                <img
                  src={item.productImage || "https://via.placeholder.com/50"}
                  alt={item.productName}
                  className="w-12 h-12 rounded object-cover border"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{item.productName}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity} × ₹{item.price}
                  </p>
                </div>
                <p className="font-bold text-gray-700">
                  ₹{item.quantity * item.price}
                </p>
              </div>
            ))}
          </div>
          <button
            onClick={() => setExpandedOrder(null)}
            className="mt-4 text-blue-600 hover:underline text-sm font-medium"
          >
            Hide items ▲
          </button>
        </div>
      ) : (
        <button
          onClick={() => setExpandedOrder(order.id)}
          className="mt-4 text-blue-600 hover:underline text-sm font-medium"
        >
          View items ▼
        </button>
      )}
    </div>
  ))}
</div>


          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-4 py-2 border rounded ${
                    currentPage === index + 1
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default YourOrders;
