"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function AdminDashboard() {
  const router = useRouter();

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
 

  // Protect Dashboard
  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      router.push("/admin/login");
      return;
    }

    fetchOrders();
  }, []);

  // Fetch Orders
  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  // Update Status
  const updateStatus = async (id: number, status: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        alert("Failed to update status");
        return;
      }

      fetchOrders();
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  // Delete Order
  const deleteOrder = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        alert("Failed to delete order");
        return;
      }

      fetchOrders();
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <>
      {/* Header */}
    <div className="flex justify-between items-center mb-8">
  <div>
    <h1 className="text-3xl font-bold text-gray-800">
      Dashboard
    </h1>

    <p className="text-gray-500 mt-1">
      Welcome to Naga Sai Polymers Admin Panel
    </p>
  </div>

  <button
    onClick={handleLogout}
    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
  >
    Logout
  </button>
</div>

      <div className="p-8">

  

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-500">Total Orders</h2>
            <p className="text-4xl font-bold mt-2">
              {orders.length}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-500">Pending Orders</h2>
            <p className="text-4xl font-bold text-yellow-600 mt-2">
              {orders.filter(o => o.status === "Pending").length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
  <h2 className="text-gray-500">In Progress</h2>
  <p className="text-4xl font-bold text-blue-600 mt-2">
    {orders.filter(o => o.status === "In Progress").length}
  </p>
</div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-500">Completed Orders</h2>
            <p className="text-4xl font-bold text-green-600 mt-2">
              {orders.filter(o => o.status === "Completed").length}
            </p>
          </div>

        </div>
        

       {/* Quick Actions */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

  <a
    href="/admin/orders"
    className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
  >
    <h3 className="text-lg font-semibold">📦 Orders</h3>
    <p className="text-gray-500 mt-2">
      View and manage customer enquiries.
    </p>
  </a>

  <a
    href="/admin/products"
    className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
  >
    <h3 className="text-lg font-semibold">🏭 Products</h3>
    <p className="text-gray-500 mt-2">
      Manage your products.
    </p>
  </a>

  <a
    href="/admin/customers"
    className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
  >
    <h3 className="text-lg font-semibold">👥 Customers</h3>
    <p className="text-gray-500 mt-2">
      View customer details.
    </p>
  </a>

  <a
    href="/admin/reports"
    className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
  >
    <h3 className="text-lg font-semibold">📊 Reports</h3>
    <p className="text-gray-500 mt-2">
      Business insights and analytics.
    </p>
  </a>

</div>

      </div>
       </>
);
}