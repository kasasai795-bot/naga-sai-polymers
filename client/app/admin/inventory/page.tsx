"use client";

import { useEffect, useMemo, useState } from "react";

import {
  getInventory,
  stockIn,
  stockOut,
} from "@/services/inventoryService";

interface InventoryItem {
  id: number;

  quantity: number;

  minimumStock: number;

  product: {
    id: number;
    name: string;
    category: string;
  };
}

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadInventory();
  }, []);

  async function loadInventory() {
    try {
      setLoading(true);

      const data = await getInventory();

      setInventory(data);
    } catch (error) {
      console.error(error);

      alert("Failed to load inventory.");
    } finally {
      setLoading(false);
    }
  }

  const filteredInventory = useMemo(() => {
    return inventory.filter((item) =>
      item.product.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [inventory, search]);

  const totalProducts = inventory.length;

  const totalStock = inventory.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const lowStock = inventory.filter(
    (item) => item.quantity <= item.minimumStock
  ).length;
    if (loading) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold">
          Loading Inventory...
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-8">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold">
            Inventory Management
          </h1>

          <p className="text-gray-500">
            Manage product inventory and stock.
          </p>

        </div>

      </div>

      {/* Dashboard Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white rounded-xl shadow p-6">

          <p className="text-gray-500">
            Total Products
          </p>

          <h2 className="text-3xl font-bold text-blue-600">
            {totalProducts}
          </h2>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <p className="text-gray-500">
            Total Stock
          </p>

          <h2 className="text-3xl font-bold text-green-600">
            {totalStock}
          </h2>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <p className="text-gray-500">
            Low Stock
          </p>

          <h2 className="text-3xl font-bold text-red-600">
            {lowStock}
          </h2>

        </div>

      </div>

      {/* Search */}

      <div className="bg-white rounded-xl shadow p-5">

        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full border rounded-lg p-3"
        />

      </div>
            {/* Inventory Table */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-5 py-4 text-left">
                Product
              </th>

              <th className="px-5 py-4 text-left">
                Category
              </th>

              <th className="px-5 py-4 text-center">
                Current Stock
              </th>

              <th className="px-5 py-4 text-center">
                Minimum Stock
              </th>

              <th className="px-5 py-4 text-center">
                Status
              </th>

              <th className="px-5 py-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredInventory.map((item) => (

              <tr
                key={item.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="px-5 py-4 font-medium">
                  {item.product.name}
                </td>

                <td className="px-5 py-4">
                  {item.product.category}
                </td>

                <td className="px-5 py-4 text-center font-semibold">
                  {item.quantity}
                </td>

                <td className="px-5 py-4 text-center">
                  {item.minimumStock}
                </td>

                <td className="px-5 py-4 text-center">

                  {item.quantity <= item.minimumStock ? (

                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm">
                      Low Stock
                    </span>

                  ) : (

                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                      In Stock
                    </span>

                  )}

                </td>

                <td className="px-5 py-4">

                  <div className="flex justify-center gap-2">

                    <button
                      onClick={async () => {
                        const qty = prompt("Enter quantity to add");

                        if (!qty) return;

                        await stockIn(
                          item.id,
                          Number(qty),
                          "Manual Stock In"
                        );

                        loadInventory();
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm"
                    >
                      + Stock
                    </button>

                    <button
                      onClick={async () => {
                        const qty = prompt("Enter quantity to remove");

                        if (!qty) return;

                        await stockOut(
                          item.id,
                          Number(qty),
                          "Manual Stock Out"
                        );

                        loadInventory();
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm"
                    >
                      - Stock
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}