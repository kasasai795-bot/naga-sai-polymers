"use client";

import { useEffect, useState } from "react";

import SearchBar from "../../components/admin/SearchBar";
import OrdersTable from "../../components/admin/OrdersTable";

import { Order } from "../../../types/order";
import {
  getOrders,
  updateOrderStatus,
  deleteOrderById,
} from "../../../services/orderService";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (
    id: number,
    status: string
  ) => {
    try {
      await updateOrderStatus(id, status);
      fetchOrders();
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  const deleteOrder = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) return;

    try {
      await deleteOrderById(id);
      fetchOrders();
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Orders Management
        </h1>

        <p className="text-gray-500 mt-1">
          Manage all customer enquiries.
        </p>
      </div>

      {/* Search */}
      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      {/* Orders Table */}
      <OrdersTable
        orders={orders}
        loading={loading}
        search={search}
        updateStatus={updateStatus}
        deleteOrder={deleteOrder}
      />
    </>
  );
}