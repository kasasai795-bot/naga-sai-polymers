"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { invoiceService } from "@/services/invoiceService";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, []);

  async function fetchInvoices() {
    try {
      const data = await invoiceService.getInvoices();
      setInvoices(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8 text-xl font-semibold">
        Loading Invoices...
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Invoices
          </h1>

          <p className="text-gray-500">
            Manage customer invoices.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-5 py-4 text-left">
                Invoice No
              </th>

              <th className="px-5 py-4 text-left">
                Customer
              </th>

              <th className="px-5 py-4 text-left">
                Order
              </th>

              <th className="px-5 py-4 text-right">
                Total
              </th>

              <th className="px-5 py-4 text-center">
                Payment
              </th>

              <th className="px-5 py-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {invoices.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="text-center py-10 text-gray-500"
                >
                  No invoices found.
                </td>

              </tr>

            ) : (

              invoices.map((invoice) => (

                <tr
                  key={invoice.id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="px-5 py-4 font-semibold">
                    {invoice.invoiceNumber}
                  </td>

                  <td className="px-5 py-4">
                    {invoice.customer?.customerName ||
                      invoice.order?.customerName}
                  </td>

                  <td className="px-5 py-4">
                    {invoice.order?.orderNumber}
                  </td>

                  <td className="px-5 py-4 text-right font-semibold">
                    ₹{invoice.grandTotal}
                  </td>

                  <td className="px-5 py-4 text-center">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        invoice.paymentStatus === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {invoice.paymentStatus}
                    </span>

                  </td>

                  <td className="px-5 py-4 text-center">

                    <Link
                      href={`/admin/invoices/${invoice.id}`}
                      className="text-indigo-600 hover:underline"
                    >
                      View
                    </Link>

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