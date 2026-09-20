"use client";

import { getAuthHeaders } from "@/utils/api";
import API_BASE_URL from "@/lib/api";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Customer = {
  id: number;
  customerName: string;
  companyName?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  gstNumber?: string | null;
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/customers`, {
        headers: getAuthHeaders(),
      });

      if (res.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin";
        return;
      }

      if (!res.ok) {
        throw new Error("Failed to fetch customers");
      }

      const data = await res.json();

      setCustomers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) =>
      `${customer.customerName} ${customer.companyName ?? ""} ${
        customer.email ?? ""
      } ${customer.phone ?? ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [customers, search]);

  if (loading) {
    return (
      <div className="text-xl font-semibold">
        Loading Customers...
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Customers
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all customers.
          </p>
        </div>

        <Link
          href="/admin/customers/create"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg"
        >
          + Add Customer
        </Link>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Total Customers
          </p>

          <h2 className="text-4xl font-bold mt-2 text-indigo-600">
            {customers.length}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Companies
          </p>

          <h2 className="text-4xl font-bold mt-2 text-green-600">
            {customers.filter((c) => c.companyName).length}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            GST Registered
          </p>

          <h2 className="text-4xl font-bold mt-2 text-blue-600">
            {customers.filter((c) => c.gstNumber).length}
          </h2>
        </div>
      </div>

      {/* Search */}

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-3 w-full md:w-96"
        />
      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-6 py-4">
                Customer
              </th>

              <th className="text-left px-6 py-4">
                Company
              </th>

              <th className="text-left px-6 py-4">
                Email
              </th>

              <th className="text-left px-6 py-4">
                Phone
              </th>

              <th className="text-left px-6 py-4">
                GST Number
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-10 text-gray-500"
                >
                  No customers found.
                </td>
              </tr>
            ) : (
              filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-semibold">
                    <Link
                      href={`/admin/customers/${customer.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {customer.customerName}
                    </Link>
                  </td>

                  <td className="px-6 py-4">
                    {customer.companyName || "-"}
                  </td>

                  <td className="px-6 py-4">
                    {customer.email || "-"}
                  </td>

                  <td className="px-6 py-4">
                    {customer.phone || "-"}
                  </td>

                  <td className="px-6 py-4">
                    {customer.gstNumber || "-"}
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