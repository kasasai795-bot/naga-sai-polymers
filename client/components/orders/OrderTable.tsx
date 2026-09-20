"use client";

import Link from "next/link";
import StatusBadge from "./StatusBadge";
import { Order, orderService } from "@/services/orderService";

interface OrderTableProps {
  orders: Order[];
  fetchOrders: () => Promise<void>;
}

export default function OrderTable({
  orders,
  fetchOrders,
}: OrderTableProps) {
  async function handleDelete(id: number) {
    const confirmed = confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmed) return;

    try {
      await orderService.deleteOrder(id);

      alert("Order deleted successfully.");

      await fetchOrders();
    } catch (error) {
      console.error(error);
      alert("Failed to delete order.");
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">

      <table className="min-w-full">

        <thead className="bg-gray-100">
          <tr className="text-left text-gray-700">
            <th className="px-6 py-4">Order No.</th>
            <th className="px-6 py-4">Customer</th>
            <th className="px-6 py-4">Products</th>
            <th className="px-6 py-4">Items</th>
            <th className="px-6 py-4">Total</th>
            <th className="px-6 py-4">Delivery</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Invoice</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>

          {orders.length === 0 ? (

            <tr>
              <td
                colSpan={9}
                className="text-center py-12 text-gray-500"
              >
                No orders found.
              </td>
            </tr>

          ) : (

            orders.map((order) => (

              <tr
                key={order.id}
                className="border-t hover:bg-gray-50 transition"
              >

                <td className="px-6 py-4 font-semibold">
                  {order.orderNumber}
                </td>

                <td className="px-6 py-4">
                  {order.customerName}
                </td>

                <td className="px-6 py-4">
                  {order.items?.length ?? 0} Product(s)
                </td>

                <td className="px-6 py-4">
                  {order.items?.reduce(
                    (sum, item) => sum + item.quantity,
                    0
                  ) ?? 0}
                </td>

                <td className="px-6 py-4 font-semibold">
                  ₹{Number(order.grandTotal).toLocaleString("en-IN")}
                </td>

                <td className="px-6 py-4">
                  {order.deliveryDate
                    ? new Date(order.deliveryDate).toLocaleDateString("en-IN")
                    : "-"}
                </td>

                <td className="px-6 py-4">
                  <StatusBadge status={order.status} />
                </td>

                {/* Invoice Column */}

                <td className="px-6 py-4">

                  {order.invoice ? (

                    <Link
                      href={`/admin/invoices/${order.invoice.id}`}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg text-sm"
                    >
                      👁 View Invoice
                    </Link>

                  ) : (

                    <Link
                      href={`/admin/invoices/create?orderId=${order.id}`}
                      className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded-lg text-sm"
                    >
                      🧾 Generate
                    </Link>

                  )}

                </td>

                <td className="px-6 py-4">

                  <div className="flex justify-center gap-2">

                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="px-3 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
                    >
                      View
                    </Link>

                    <button
                      onClick={() => handleDelete(order.id!)}
                      className="px-3 py-2 rounded bg-red-600 text-white text-sm hover:bg-red-700"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}