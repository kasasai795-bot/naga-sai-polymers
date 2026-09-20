"use client";

import { useEffect, useState } from "react";
import { getAuthHeaders } from "@/utils/api";
import API_BASE_URL from "@/lib/api";

type ReportStats = {
  totalRevenue: number;
  totalOrders: number;
  totalInvoices: number;
  totalCustomers: number;
};

export default function ReportsPage() {
  const [stats, setStats] = useState<ReportStats>({
    totalRevenue: 0,
    totalOrders: 0,
    totalInvoices: 0,
    totalCustomers: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  async function fetchReports() {
    try {
      const res = await fetch(
        `${API_BASE_URL}/dashboard/stats`,
        {
          headers: getAuthHeaders(),
        }
      );

      if (res.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin";
        return;
      }

      if (!res.ok) {
        throw new Error("Failed to fetch report statistics");
      }

      const data = await res.json();

      setStats({
        totalRevenue: Number(data?.totalRevenue ?? 0),
        totalOrders: Number(data?.totalOrders ?? 0),
        totalInvoices: Number(data?.totalInvoices ?? 0),
        totalCustomers: Number(data?.totalCustomers ?? 0),
      });
    } catch (err) {
      console.error("Reports Error:", err);

      setStats({
        totalRevenue: 0,
        totalOrders: 0,
        totalInvoices: 0,
        totalCustomers: 0,
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8 text-xl font-semibold">
        Loading Reports...
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">
        Reports
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-gray-500">Revenue</p>

          <h2 className="text-3xl font-bold text-green-600 mt-3">
            ₹{stats.totalRevenue.toLocaleString("en-IN")}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-gray-500">Orders</p>

          <h2 className="text-3xl font-bold text-blue-600 mt-3">
            {stats.totalOrders.toLocaleString("en-IN")}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-gray-500">Invoices</p>

          <h2 className="text-3xl font-bold text-orange-600 mt-3">
            {stats.totalInvoices.toLocaleString("en-IN")}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-gray-500">Customers</p>

          <h2 className="text-3xl font-bold text-purple-600 mt-3">
            {stats.totalCustomers.toLocaleString("en-IN")}
          </h2>
        </div>

      </div>
    </div>
  );
}