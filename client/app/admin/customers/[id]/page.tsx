"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Customer,
  customerService,
} from "@/services/customerService";

export default function CustomerDetailsPage() {
  const params = useParams();
  const id = Number(params.id);

  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomer();
  }, []);

  async function fetchCustomer() {
    try {
      const data = await customerService.getCustomerById(id);
      setCustomer(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold">
          Loading Customer...
        </h2>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold">
          Customer not found.
        </h2>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">

      <h1 className="text-3xl font-bold">
        {customer.customerName}
      </h1>

      {/* Customer Information */}

      <div className="bg-white rounded-xl shadow p-6 space-y-3">

        <p><strong>Company:</strong> {customer.companyName || "-"}</p>

        <p><strong>Email:</strong> {customer.email || "-"}</p>

        <p><strong>Phone:</strong> {customer.phone || "-"}</p>

        <p><strong>Address:</strong> {customer.address || "-"}</p>

        <p><strong>GST Number:</strong> {customer.gstNumber || "-"}</p>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-gray-500">
            Total Orders
          </h2>

          <p className="text-4xl font-bold text-indigo-600 mt-2">
            {customer.totalOrders}
          </p>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-gray-500">
            Total Purchase
          </h2>

          <p className="text-4xl font-bold text-green-600 mt-2">
            ₹{Number(customer.totalPurchase).toLocaleString("en-IN")}
          </p>

        </div>

      </div>

      {/* Order History */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <div className="p-6 border-b">

          <h2 className="text-2xl font-bold">
            Order History
          </h2>

        </div>

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left px-6 py-4">
                Order No.
              </th>

              <th className="text-left px-6 py-4">
                Status
              </th>

              <th className="text-left px-6 py-4">
                Grand Total
              </th>

              <th className="text-left px-6 py-4">
                Created
              </th>

            </tr>

          </thead>

          <tbody>

            {customer.orders.length === 0 ? (

              <tr>

                <td
                  colSpan={4}
                  className="text-center py-10 text-gray-500"
                >
                  No orders found.
                </td>

              </tr>

            ) : (

              customer.orders.map((order: any) => (

                <tr
                  key={order.id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="px-6 py-4 font-semibold">
                    {order.orderNumber}
                  </td>

                  <td className="px-6 py-4">
                    {order.status}
                  </td>

                  <td className="px-6 py-4">
                    ₹{Number(order.grandTotal).toLocaleString("en-IN")}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(order.createdAt).toLocaleDateString("en-IN")}
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}