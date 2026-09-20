"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import MonthlyOrdersChart from "@/components/MonthlyOrdersChart";
import OrderStatusPieChart from "@/components/OrderStatusPieChart";
import RecentOrders from "@/components/RecentOrders";
import QuickActions from "@/components/QuickActions";
import NotificationBell from "@/components/NotificationBell";

import {
  dashboardService,
  DashboardStats,
} from "@/services/dashboardService";

export default function AdminDashboard() {
  const router = useRouter();

  const [dashboard, setDashboard] =
    useState<DashboardStats>({
      totalProducts: 0,
      totalCustomers: 0,
      totalInvoices: 0,
      totalRevenue: 0,

      totalOrders: 0,
      pendingOrders: 0,
      inProgressOrders: 0,
      completedOrders: 0,

      monthlyOrders: [],
      recentOrders: [],
    });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      router.replace("/admin");
      return;
    }

    fetchDashboard();
  }, []);

  async function fetchDashboard() {
    try {
      const data =
        await dashboardService.getDashboardStats();

      setDashboard(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8 text-xl font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <div className="flex justify-between items-center mb-10">

        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome back to Naga Sai Polymers ERP
          </p>
        </div>

        <div className="flex items-center gap-6">

          <div className="text-right">
            <p className="text-gray-500">
              Today
            </p>

            <h2 className="text-lg font-bold">
              {new Date().toLocaleDateString("en-IN")}
            </h2>
          </div>

          <NotificationBell />

        </div>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-indigo-600">
          <p className="text-gray-500 font-medium">Products</p>
          <h2 className="text-4xl font-bold mt-3 text-indigo-600">
            {dashboard.totalProducts}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-600">
          <p className="text-gray-500 font-medium">Customers</p>
          <h2 className="text-4xl font-bold mt-3 text-purple-600">
            {dashboard.totalCustomers}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600">
          <p className="text-gray-500 font-medium">Orders</p>
          <h2 className="text-4xl font-bold mt-3 text-blue-600">
            {dashboard.totalOrders}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600">
          <p className="text-gray-500 font-medium">Revenue</p>
          <h2 className="text-3xl font-bold mt-3 text-green-600">
            ₹{dashboard.totalRevenue.toLocaleString("en-IN")}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
          <p className="text-gray-500 font-medium">Invoices</p>
          <h2 className="text-4xl font-bold mt-3 text-orange-500">
            {dashboard.totalInvoices}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
          <p className="text-gray-500 font-medium">Pending</p>
          <h2 className="text-4xl font-bold mt-3 text-yellow-500">
            {dashboard.pendingOrders}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-cyan-600">
          <p className="text-gray-500 font-medium">In Progress</p>
          <h2 className="text-4xl font-bold mt-3 text-cyan-600">
            {dashboard.inProgressOrders}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-emerald-600">
          <p className="text-gray-500 font-medium">Completed</p>
          <h2 className="text-4xl font-bold mt-3 text-emerald-600">
            {dashboard.completedOrders}
          </h2>
        </div>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">

        <MonthlyOrdersChart
          data={dashboard.monthlyOrders}
        />

        <OrderStatusPieChart
          pending={dashboard.pendingOrders}
          inProgress={dashboard.inProgressOrders}
          completed={dashboard.completedOrders}
        />

      </div>

      <div className="mb-10">
        <RecentOrders
          orders={dashboard.recentOrders}
        />
      </div>

      <div className="mb-10">
        <QuickActions />
      </div>

    </div>
  );
}