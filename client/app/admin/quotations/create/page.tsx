"use client";

import { useEffect, useState } from "react";
import { Product } from "../../../../types/product";
import { getProducts } from "../../../../services/productService";

interface QuotationItem {
  productId: number | "";
  quantity: number;
  unitPrice: number;
}

export default function CreateQuotationPage() {
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);

  const [products, setProducts] = useState<QuotationItem[]>([
    {
      productId: "",
      quantity: 1,
      unitPrice: 0,
    },
  ]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setAvailableProducts(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load products");
    }
  };

  const addProduct = () => {
    setProducts([
      ...products,
      {
        productId: "",
        quantity: 1,
        unitPrice: 0,
      },
    ]);
  };

  const updateProduct = (
    index: number,
    field: keyof QuotationItem,
    value: any
  ) => {
    const updated = [...products];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setProducts(updated);
  };

  const grandTotal = products.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Create Quotation</h1>
        <p className="text-gray-500">
          Create a quotation for your customer.
        </p>
      </div>

      {/* Customer Details */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-5">
          Customer Details
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          <input
            className="border rounded-lg p-3"
            placeholder="Customer Name"
          />

          <input
            className="border rounded-lg p-3"
            placeholder="Company Name"
          />

          <input
            className="border rounded-lg p-3"
            placeholder="Phone"
          />

          <input
            className="border rounded-lg p-3"
            placeholder="Email"
          />
        </div>
      </div>

      {/* Products */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            Products
          </h2>

          <button
            type="button"
            onClick={addProduct}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            + Add Product
          </button>
        </div>

        {products.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-4 gap-4 mb-4"
          >
            <select
              className="border rounded-lg p-3"
              value={item.productId}
              onChange={(e) =>
                updateProduct(
                  index,
                  "productId",
                  Number(e.target.value)
                )
              }
            >
              <option value="">Select Product</option>

              {availableProducts.map((product) => (
                <option
                  key={product.id}
                  value={product.id}
                >
                  {product.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              className="border rounded-lg p-3"
              value={item.quantity}
              onChange={(e) =>
                updateProduct(
                  index,
                  "quantity",
                  Number(e.target.value)
                )
              }
            />

            <input
              type="number"
              className="border rounded-lg p-3"
              value={item.unitPrice}
              onChange={(e) =>
                updateProduct(
                  index,
                  "unitPrice",
                  Number(e.target.value)
                )
              }
            />

            <input
              readOnly
              className="border rounded-lg p-3 bg-gray-100"
              value={item.quantity * item.unitPrice}
            />
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-5">
          Summary
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          <input
            type="date"
            className="border rounded-lg p-3"
          />

          <select className="border rounded-lg p-3">
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>

          <textarea
            rows={4}
            className="border rounded-lg p-3 md:col-span-2"
            placeholder="Notes..."
          />
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div className="text-2xl font-bold">
            Grand Total : ₹{grandTotal}
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg">
            Save Quotation
          </button>
        </div>
      </div>
    </div>
  );
}