import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-800",
  PROCESSING: "bg-blue-100 text-blue-800",
  SHIPPED: "bg-indigo-100 text-indigo-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

const ORDER_STATUSES = [
  "PENDING",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [actionLoading, setActionLoading] = useState({}); // { [orderId]: { updating: bool, deleting: bool } }
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, orderId: null });

  // Sorting
  const [sortField, setSortField] = useState("creationDate");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:8080/orders/admin/all");
      setOrders(res.data);
    } catch (error) {
      toast.error("Failed to fetch orders");
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    setActionLoading((prev) => ({
      ...prev,
      [orderId]: { ...(prev[orderId] || {}), updating: true },
    }));

    try {
      await axios.put(`http://localhost:8080/orders/${orderId}`, {
        orderStatus: newStatus,
      });
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, orderStatus: newStatus } : order
        )
      );
      toast.success("Order status updated successfully");
    } catch (error) {
      toast.error("Failed to update order status");
      console.error("Failed to update order status:", error);
    } finally {
      setActionLoading((prev) => ({
        ...prev,
        [orderId]: { ...(prev[orderId] || {}), updating: false },
      }));
    }
  };

  const confirmDeleteOrder = (orderId) => {
    setDeleteConfirm({ show: true, orderId });
  };

  const cancelDelete = () => {
    setDeleteConfirm({ show: false, orderId: null });
  };

  const deleteOrder = async () => {
    const orderId = deleteConfirm.orderId;
    if (!orderId) return;

    setActionLoading((prev) => ({
      ...prev,
      [orderId]: { ...(prev[orderId] || {}), deleting: true },
    }));

    try {
      await axios.delete(`http://localhost:8080/orders/${orderId}`);
      setOrders((prev) => prev.filter((order) => order.id !== orderId));
      toast.success("Order deleted successfully");
      cancelDelete(); // hide popup after delete
    } catch (error) {
      toast.error("Failed to delete order");
      console.error("Failed to delete order:", error);
    } finally {
      setActionLoading((prev) => ({
        ...prev,
        [orderId]: { ...(prev[orderId] || {}), deleting: false },
      }));
    }
  };

  // Sorting logic
  const sortedOrders = [...orders].sort((a, b) => {
    let valA, valB;
    switch (sortField) {
      case "creationDate":
        valA = new Date(a.creationDate);
        valB = new Date(b.creationDate);
        break;
      case "orderAmount":
        valA = a.orderAmount;
        valB = b.orderAmount;
        break;
      case "orderStatus":
        valA = a.orderStatus.toLowerCase();
        valB = b.orderStatus.toLowerCase();
        break;
      case "customerName":
        valA = a.customerName.toLowerCase();
        valB = b.customerName.toLowerCase();
        break;
      case "id":
        valA = a.id;
        valB = b.id;
        break;
      default:
        valA = a[sortField];
        valB = b[sortField];
    }
    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600">Loading orders...</div>
    );
  }

  if (!orders.length) {
    return (
      <div className="text-center py-10 text-gray-600">No orders found.</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-3xl font-bold mb-6 text-center">All User Orders</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-600 divide-y divide-gray-900">
          <thead className="bg-gray-300">
            <tr>
              {[
                { label: "Order ID", field: "id" },
                { label: "Customer", field: "customerName" },
                { label: "Date", field: "creationDate" },
                { label: "Delivery Address", field: null },
                { label: "Total (₹)", field: "orderAmount" },
                { label: "Status", field: "orderStatus" },
                { label: "Actions", field: null },
              ].map(({ label, field }) => (
                <th
                  key={label}
                  onClick={() => field && handleSort(field)}
                  className={`cursor-pointer px-4 py-3 text-left text-sm font-semibold text-gray-700 ${
                    !field ? "cursor-default" : ""
                  }`}
                >
                  {label}
                  {sortField === field && (sortOrder === "asc" ? " ▲" : " ▼")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedOrders.map((order) => (
              <React.Fragment key={order.id}>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">
                    #{order.id}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {order.customerName}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {new Date(order.creationDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 max-w-xs whitespace-normal text-sm text-gray-900">
                    {order.deliveryAddress}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-green-600">
                    ₹{order.orderAmount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <select
                      disabled={actionLoading[order.id]?.updating}
                      value={order.orderStatus}
                      onChange={(e) =>
                        updateOrderStatus(order.id, e.target.value)
                      }
                      className={`rounded border px-2 py-1 text-sm font-semibold ${
                        statusColors[order.orderStatus] ||
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {ORDER_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    {actionLoading[order.id]?.updating && (
                      <span className="ml-2 text-sm text-blue-500">
                        Updating...
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center space-x-6">
                    <button
                      onClick={() =>
                        setExpandedOrderId(
                          expandedOrderId === order.id ? null : order.id
                        )
                      }
                      className="text-blue-600 hover:underline text-sm mr-14"
                    >
                      {expandedOrderId === order.id
                        ? "Hide Items ▲"
                        : "View Items ▼"}
                    </button>
                    <button
                      onClick={() => confirmDeleteOrder(order.id)}
                      disabled={actionLoading[order.id]?.deleting}
                      className={`text-red-600 hover:underline text-sm ${
                        actionLoading[order.id]?.deleting
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      {actionLoading[order.id]?.deleting ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>

                {expandedOrderId === order.id && (
                  <tr>
                    <td colSpan={7} className="bg-gray-50 px-4 py-3">
                      <div className="space-y-5">
                        {order.orderLines.map((item) => (
                          <div
                            key={item.orderLineId}
                            className="flex items-center space-x-4"
                          >
                            {item.productImage && (
                              <img
                                src={item.productImage}
                                alt={item.productName}
                                className="w-12 h-12 object-cover rounded"
                              />
                            )}
                            <div>
                              <p className="font-semibold">{item.productName}</p>
                              <p className="text-sm text-gray-700">
                                Quantity: {item.quantity} × ₹{item.price.toFixed(2)}
                              </p>
                              <p className="text-sm text-gray-700">
                                Subtotal: ₹{item.subTotal.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

     {/* Modal Delete Confirmation Popup */}
{deleteConfirm.show && (
  <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
    <div className="bg-white rounded shadow-lg max-w-sm w-full p-15 space-y-4 ">
      <h2 className="text-xl font-semibold text-red-600">Confirm Delete</h2>
      <p>Are you sure you want to delete this order?</p>
      <div className="flex justify-end space-x-4 gap-4">
        <button
          onClick={cancelDelete}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={deleteOrder}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          disabled={actionLoading[deleteConfirm.orderId]?.deleting}
        >
          {actionLoading[deleteConfirm.orderId]?.deleting
            ? "Deleting..."
            : "Delete"}
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default OrderDetails;
