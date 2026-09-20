"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Order, orderService } from "@/services/orderService";

type OrderWithExtraFields = Order & {
  dimensions?: string;
  packingPurpose?: string;
};

export default function OrderDetailsPage() {
  const params = useParams();
  const id = Number(params.id);

  const [order, setOrder] = useState<OrderWithExtraFields | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchOrder();
  }, []);

  async function fetchOrder() {
    try {
      const data = await orderService.getOrderById(id);
      setOrder(data as OrderWithExtraFields);
      setStatus(data.status);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusUpdate() {
    if (!order) return;

    try {
      await orderService.updateStatus(order.id!, status);

      alert("Status updated successfully.");

      fetchOrder();
    } catch (err) {
      console.error(err);
      alert("Failed to update status.");
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold">Loading Order...</h2>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold">Order not found.</h2>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      {/* Order Title */}
      <h1 className="text-3xl font-bold">
        Order {order.orderNumber}
      </h1>

      {/* Customer Details */}
      <div className="bg-white shadow rounded-xl p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-4">
          Order Details
        </h2>

        <p>
          <strong>Customer:</strong>{" "}
          {order.customerName}
        </p>

        <p>
          <strong>Company:</strong>{" "}
          {order.companyName || "-"}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {order.email || "-"}
        </p>

        <p>
          <strong>Phone:</strong>{" "}
          {order.phone || "-"}
        </p>

        {/* Dimensions */}
        <p>
          <strong>Dimensions:</strong>{" "}
          {order.dimensions || "-"}
        </p>

        {/* Packing Purpose */}
        <p>
          <strong>Packing Purpose:</strong>{" "}
          {order.packingPurpose || "-"}
        </p>

        {/* Status */}
        <div className="flex items-center gap-4">
          <strong>Status:</strong>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="border rounded px-3 py-2"
          >
            <option>Pending</option>
            <option>Confirmed</option>
            <option>In Production</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>

          <button
            onClick={handleStatusUpdate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>

        {/* Grand Total */}
        <p>
          <strong>Grand Total:</strong>{" "}
          ₹{Number(order.grandTotal || 0).toLocaleString("en-IN")}
        </p>

        {/* Delivery Date */}
        <p>
          <strong>Delivery Date:</strong>{" "}
          {order.deliveryDate
            ? new Date(
                order.deliveryDate
              ).toLocaleDateString("en-IN")
            : "-"}
        </p>

        {/* Requirements */}
        <p>
          <strong>Requirements:</strong>{" "}
          {order.requirements || "-"}
        </p>
      </div>

      {/* Products */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">
          Products
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="text-left p-3">
                  Product
                </th>

                <th className="text-center p-3">
                  Quantity
                </th>

                <th className="text-right p-3">
                  Unit Price
                </th>

                <th className="text-right p-3">
                  Total
                </th>
              </tr>
            </thead>

            <tbody>
              {order.items.map(
                (item: any, index) => (
                  <tr
                    key={index}
                    className="border-b"
                  >
                    <td className="p-3">
                      {item.product?.name ||
                        "Unknown Product"}
                    </td>

                    <td className="text-center p-3">
                      {item.quantity}
                    </td>

                    <td className="text-right p-3">
                      ₹
                      {Number(
                        item.unitPrice || 0
                      ).toLocaleString("en-IN")}
                    </td>

                    <td className="text-right p-3">
                      ₹
                      {Number(
                        item.totalAmount || 0
                      ).toLocaleString("en-IN")}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}