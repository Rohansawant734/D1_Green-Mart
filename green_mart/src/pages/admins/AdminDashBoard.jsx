import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";

// Register chart.js components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartDataLabels
);

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [supplierCount, setSupplierCount] = useState(0);
  const [productCount, setProductCount] = useState(0); //  new state
  const [categoryCounts, setCategoryCounts] = useState({});
  const [topProductsData, setTopProductsData] = useState(null);

  // Fetch all dashboard data
  useEffect(() => {
    axios.get("http://localhost:8080/dashboard/users/count").then((res) => {
      setUserCount(res.data);
    });

    axios.get("http://localhost:8080/dashboard/suppliers/count").then((res) => {
      setSupplierCount(res.data);
    });

    axios.get("http://localhost:8080/dashboard/product/count").then((res) => {
      setProductCount(res.data);
    });

    axios
      .get("http://localhost:8080/dashboard/products/by-category")
      .then((res) => {
        setCategoryCounts(res.data); // { Fruits: 35, Vegetables: 22, etc. }
      });

    axios
      .get("http://localhost:8080/dashboard/products/top")
      .then((res) => {
        const data = res.data;
        const labels = data.map((item) => Object.keys(item)[0]);
        const values = data.map((item) => Object.values(item)[0]);
        setTopProductsData({
          labels,
          datasets: [
            {
              label: "Top Products",
              data: values,
              backgroundColor: "#36a2eb",
            },
          ],
        });
      });
  }, []);

  // Bar chart options
  const barOptions = {
    plugins: {
      datalabels: {
        anchor: "end",
        align: "end",
        font: { weight: "bold" },
        formatter: (value) => value,
      },
      legend: { display: false },
    },
    responsive: true,
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Sidebar - Category Table */}
      <div className="w-1/4 bg-white p-4 shadow-md overflow-y-auto h-screen">
        <h2 className="text-xl font-bold mb-4">Product Categories</h2>
        {Object.entries(categoryCounts).length ? (
          <table className="min-w-full table-auto border border-gray-300 text-left text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border-b border-gray-300">Category</th>
                <th className="p-2 border-b border-gray-300">Product Count</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(categoryCounts).map(([category, count], index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-2 border-b border-gray-200">{category}</td>
                  <td className="p-2 border-b border-gray-200 font-semibold text-blue-600">
                    {count}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading categories...</p>
        )}
      </div>

      {/* Right Content Panel */}
      <div className="w-3/4 p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center">Admin Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-100 p-6 rounded-lg shadow text-center">
            <h2 className="text-xl font-semibold">Total Users</h2>
            <p className="text-3xl text-blue-800 font-bold">{userCount}</p>
          </div>
          <div className="bg-green-100 p-6 rounded-lg shadow text-center">
            <h2 className="text-xl font-semibold">Total Suppliers</h2>
            <p className="text-3xl text-green-800 font-bold">{supplierCount}</p>
          </div>
          <div className="bg-yellow-100 p-6 rounded-lg shadow text-center">
            <h2 className="text-xl font-semibold">Total Products</h2>
            <p className="text-3xl text-yellow-800 font-bold">{productCount}</p>
          </div>
        </div>

        {/* Bar Chart - Top Products */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4 text-center">Top Products</h2>
          {topProductsData ? (
            <Bar data={topProductsData} options={barOptions} />
          ) : (
            <p className="text-center">Loading chart...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
