"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import SearchBar from "@/components/orders/SearchBar";
import OrderStats from "@/components/orders/OrderStats";
import OrderTable from "@/components/orders/OrderTable";

import {
  orderService,
  Order,
} from "@/services/orderService";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      setLoading(true);

      const data = await orderService.getAllOrders();

      setOrders(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        (order.orderNumber ?? "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (order.customerName ?? "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  if (loading) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold">
          Loading Orders...
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-8">

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold">
            Orders
          </h1>

          <p className="text-gray-500">
            Manage all customer orders
          </p>
        </div>

        <Link
          href="/admin/orders/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >
          + Create Order
        </Link>

      </div>

      <OrderStats orders={filteredOrders} />

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <OrderTable
  orders={filteredOrders}
  fetchOrders={fetchOrders}
/>

    </div>
  );
}