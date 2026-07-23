"use client";

import { Product } from "../../types/product";

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
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-6 py-3 text-left">Image</th>
          <th className="px-6 py-3 text-left">Product</th>
          <th className="px-6 py-3 text-left">Category</th>
          <th className="px-6 py-3 text-left">Status</th>
          <th className="px-6 py-3 text-left">Description</th>
          <th className="px-6 py-3 text-left">Actions</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200">
        {products.map((product) => (
          <tr key={product.id}>
            <td className="px-6 py-4">
              <img
                src={`http://localhost:5000${product.image}`}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-lg border"
              />
            </td>

            <td className="px-6 py-4">{product.name}</td>

            <td className="px-6 py-4">{product.category}</td>

            <td className="px-6 py-4">
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

           <td className="px-6 py-4">{product.description}</td>

<td className="px-6 py-4">
  <div className="flex gap-2">
    <button
      onClick={() => onEdit(product)}
      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
    >
      ✏ Edit
    </button>

    <button
      onClick={() => onDelete(product.id)}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
    >
      🗑 Delete
    </button>
  </div>
</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}