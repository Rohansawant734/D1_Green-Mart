// // import React from 'react'

// // const OrderDetails = () => {
// //   return (
// //     <div>
// //       <h3>order table</h3>
// //     </div>
// //   )
// // }

// // export default OrderDetails

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AdminOrdersTable = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:8080/admin/orders")
//       .then(res => setOrders(res.data))
//       .catch(err => console.error("Error fetching orders:", err));
//   }, []);

//   return (
//     <div className="container mt-4">
//       <h2>All Orders</h2>
//       <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', textAlign: 'center' }}>
//         <thead>
//           <tr>
//             <th>Order ID</th>
//             <th>Customer</th>
//             <th>Email</th>
//             <th>Order Date</th>
//             <th>Time</th>
//             <th>Status</th>
//             <th>Amount</th>
//             <th>Delivery</th>
//             <th>Address</th>
//             <th>City</th>
//             <th>State</th>
//             <th>Zip</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((o) => (
//             <tr key={o.orderId}>
//               <td>{o.orderId}</td>
//               <td>{o.firstName} {o.lastName}</td>
//               <td>{o.email}</td>
//               <td>{o.orderDate}</td>
//               <td>{o.orderTime}</td>
//               <td>{o.orderStatus}</td>
//               <td>₹{o.orderAmount}</td>
//               <td>₹{o.deliveryCharges}</td>
//               <td>{o.adrLine1}, {o.adrLine2}</td>
//               <td>{o.city}</td>
//               <td>{o.state}</td>
//               <td>{o.zipCode}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminOrdersTable;
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminOrdersTable = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/admin/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "NEW":
        return "bg-blue-100 text-blue-700";
      case "PROCESSING":
        return "bg-yellow-100 text-yellow-700";
      case "DELIVERED":
        return "bg-green-100 text-green-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatCurrency = (amount) => {
    return `₹${Number(amount).toFixed(2)}`;
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">All Orders</h2>
      <div className="overflow-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="py-2 px-4 border-b">Customer</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Order Date</th>
              <th className="py-2 px-4 border-b">Time</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Delivery</th>
              <th className="py-2 px-4 border-b">Address</th>
              <th className="py-2 px-4 border-b">City</th>
              <th className="py-2 px-4 border-b">State</th>
              <th className="py-2 px-4 border-b">Zip</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {orders.map((o) => (
              <tr key={o.orderId} className="hover:bg-gray-50 transition-all">
                <td className="py-2 px-4 border-b">
                  {o.firstName} {o.lastName}
                </td>
                <td className="py-2 px-4 border-b">{o.email}</td>
                <td className="py-2 px-4 border-b">{o.orderDate}</td>
                <td className="py-2 px-4 border-b">{o.orderTime}</td>
                <td className="py-2 px-4 border-b">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                      o.orderStatus
                    )}`}
                  >
                    {o.orderStatus}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">
                  {formatCurrency(o.orderAmount)}
                </td>
                <td className="py-2 px-4 border-b">
                  {formatCurrency(o.deliveryCharges)}
                </td>
                <td className="py-2 px-4 border-b">
                  {o.adrLine1}
                  {o.adrLine2 && `, ${o.adrLine2}`}
                </td>
                <td className="py-2 px-4 border-b">{o.city}</td>
                <td className="py-2 px-4 border-b">{o.state}</td>
                <td className="py-2 px-4 border-b">{o.zipCode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrdersTable;
