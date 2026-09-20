"use client";

import Link from "next/link";
import StatusBadge from "./StatusBadge";

export interface Quotation {
  id: number;
  quotationNumber: string;
  customerName: string;
  companyName: string;
  phone: string;
  email: string;
  grandTotal: number;
  status: string;
  createdAt: string;
}

interface Props {
  quotations: Quotation[];
  loading: boolean;
  onDelete: (id: number) => void;
}

export default function QuotationTable({
  quotations,
  loading,
  onDelete,
}: Props) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center">
        Loading quotations...
      </div>
    );
  }

  if (quotations.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
        No quotations found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Quotation
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Customer
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Company
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Phone
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Date
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Amount
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Status
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {quotations.map((quotation) => (

              <tr
                key={quotation.id}
                className="border-t hover:bg-gray-50 transition"
              >

                <td className="px-6 py-5 font-semibold text-blue-700">
                  {quotation.quotationNumber}
                </td>

                <td className="px-6 py-5">
                  {quotation.customerName}
                </td>

                <td className="px-6 py-5">
                  {quotation.companyName}
                </td>

                <td className="px-6 py-5">
                  {quotation.phone}
                </td>

                <td className="px-6 py-5">
                  {new Date(
                    quotation.createdAt
                  ).toLocaleDateString()}
                </td>

                <td className="px-6 py-5 font-semibold text-green-700">
                  ₹{Number(
                    quotation.grandTotal
                  ).toLocaleString()}
                </td>

                <td className="px-6 py-5">

                  <StatusBadge
                    status={quotation.status}
                  />

                </td>

                <td className="px-6 py-5">
                                      <div className="flex items-center justify-center gap-2">

                    <Link
                      href={`/admin/quotations/${quotation.id}`}
                      className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm transition"
                    >
                      View
                    </Link>

                    <Link
                      href={`/admin/quotations/create?id=${quotation.id}`}
                      className="px-3 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm transition"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => {
                        if (
                          confirm(
                            "Are you sure you want to delete this quotation?"
                          )
                        ) {
                          onDelete(quotation.id);
                        }
                      }}
                      className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm transition"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="bg-gray-50 border-t px-6 py-4 flex justify-between items-center">

        <p className="text-gray-600 text-sm">
          Showing
          <span className="font-semibold mx-1">
            {quotations.length}
          </span>
          quotation(s)
        </p>

        <p className="font-semibold text-gray-700">
          Total Value :
          <span className="text-green-700 ml-2">
            ₹
            {quotations
              .reduce(
                (sum, quotation) =>
                  sum + Number(quotation.grandTotal),
                0
              )
              .toLocaleString()}
          </span>
        </p>

      </div>

    </div>
  );
}