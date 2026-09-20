"use client";

import { useState } from "react";
import { Product } from "../types/product";
import API_BASE_URL from "@/lib/api";

interface ProductsTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export default function ProductsTable({
  products,
  onEdit,
  onDelete,
}: ProductsTableProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">GSM</th>
              <th className="px-4 py-3 text-left">Size</th>
              <th className="px-4 py-3 text-left">Color</th>
              <th className="px-4 py-3 text-left">Printing</th>
              <th className="px-4 py-3 text-left">Lamination</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {products.map((product) => {
              const imageUrl = `${API_BASE_URL.replace(
                "/api",
                ""
              )}${product.image}`;

              return (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50"
                >
                  <td className="px-4 py-4">
                    <img
                      src={imageUrl}
                      alt={product.name}
                      onClick={() => setSelectedImage(imageUrl)}
                      className="w-16 h-16 rounded-lg object-cover border cursor-pointer hover:scale-105 transition-transform"
                      title="Click to view full image"
                    />
                  </td>

                  <td className="px-4 py-4 font-medium">
                    {product.name}
                  </td>

                  <td className="px-4 py-4">
                    {product.category}
                  </td>

                  <td className="px-4 py-4">
                    {product.gsm || "-"}
                  </td>

                  <td className="px-4 py-4">
                    {product.size || "-"}
                  </td>

                  <td className="px-4 py-4">
                    {product.color || "-"}
                  </td>

                  <td className="px-4 py-4">
                    {product.printing || "-"}
                  </td>

                  <td className="px-4 py-4">
                    {product.lamination ? (
                      <span className="text-green-600 font-semibold">
                        Yes
                      </span>
                    ) : (
                      <span className="text-red-600 font-semibold">
                        No
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        product.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>

                  <td className="px-4 py-4 max-w-xs">
                    <p className="truncate">
                      {product.description}
                    </p>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(product)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg"
                      >
                        ✏ Edit
                      </button>

                      <button
                        onClick={() => onDelete(product.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg"
                      >
                        🗑 Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Full Image Preview */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-4 -right-4 z-10 w-10 h-10 rounded-full bg-white text-black text-2xl font-bold shadow-lg hover:bg-gray-200"
              aria-label="Close image preview"
            >
              ×
            </button>

            <img
              src={selectedImage}
              alt="Product full preview"
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl bg-white"
            />
          </div>
        </div>
      )}
    </>
  );
}