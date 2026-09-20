"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { orderService } from "@/services/orderService";
import API_BASE_URL from "@/lib/api";
import { getAuthHeaders } from "@/utils/api";

type Customer = {
  id: number;
  customerName: string;
  companyName?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  gstNumber?: string | null;
};

type Product = {
  id: number;
  name: string;
  category?: string;
  description?: string;
};

type OrderItem = {
  productId: number;
  quantity: number;
  unitPrice: number;
};

export default function OrderForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [selectedCustomer, setSelectedCustomer] = useState("");

  const [deliveryDate, setDeliveryDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const [notes, setNotes] = useState("");

  const [items, setItems] = useState<OrderItem[]>([
    {
      productId: 0,
      quantity: 1,
      unitPrice: 0,
    },
  ]);

  useEffect(() => {
    loadCustomers();
    loadProducts();
  }, []);

  async function loadCustomers() {
    try {
      const res = await fetch(
        `${API_BASE_URL}/customers`,
        {
          headers: getAuthHeaders(),
        }
      );

      if (res.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin";
        return;
      }

      if (!res.ok) {
        throw new Error("Failed to load customers");
      }

      const data = await res.json();

      setCustomers(
        Array.isArray(data) ? data : []
      );
    } catch (err) {
      console.error(err);
    }
  }

  async function loadProducts() {
    try {
      const res = await fetch(
        `${API_BASE_URL}/products`,
        {
          headers: getAuthHeaders(),
        }
      );

      if (res.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin";
        return;
      }

      if (!res.ok) {
        throw new Error("Failed to load products");
      }

      const data = await res.json();

      setProducts(
        Array.isArray(data) ? data : []
      );
    } catch (err) {
      console.error(err);
    }
  }

  const addItem = () => {
    setItems([
      ...items,
      {
        productId: 0,
        quantity: 1,
        unitPrice: 0,
      },
    ]);
  };

  const removeItem = (index: number) => {
    setItems(
      items.filter((_, i) => i !== index)
    );
  };

  const updateItem = (
    index: number,
    field: keyof OrderItem,
    value: number
  ) => {
    const updated = [...items];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setItems(updated);
  };

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      return (
        sum +
        item.quantity *
          Number(item.unitPrice || 0)
      );
    }, 0);
  }, [items]);

  const handleSave = async () => {
    try {
      if (!selectedCustomer) {
        alert("Please select a customer.");
        return;
      }

      if (items.length === 0) {
        alert("Please add at least one product.");
        return;
      }

      if (
        items.some(
          (item) => item.productId === 0
        )
      ) {
        alert(
          "Please select a product for every item."
        );
        return;
      }

      if (
        items.some(
          (item) => item.quantity <= 0
        )
      ) {
        alert(
          "Quantity must be greater than zero."
        );
        return;
      }

      const customer = customers.find(
        (c) =>
          c.id === Number(selectedCustomer)
      );

      if (!customer) {
        alert("Customer not found.");
        return;
      }

      setLoading(true);

      const orderNumber = `ORD-${Date.now()}`;

      await orderService.createOrder({
        orderNumber,

        customerName: customer.customerName,
        companyName: customer.companyName ?? "",
        email: customer.email ?? "",
        phone: customer.phone ?? "",

        deliveryDate,

        requirements: notes,

        status,

        grandTotal: subtotal,

        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: Number(
            item.unitPrice || 0
          ),
          totalAmount:
            item.quantity *
            Number(item.unitPrice || 0),
        })),
      });

      alert("Order Created Successfully");

      router.push("/admin/orders");
    } catch (err) {
      console.error(err);
      alert("Failed to create order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">

      <h1 className="text-3xl font-bold mb-8">
        Create Order
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="block mb-2 font-medium">
            Customer
          </label>

          <select
            className="w-full border rounded-lg p-3"
            value={selectedCustomer}
            onChange={(e) =>
              setSelectedCustomer(
                e.target.value
              )
            }
          >
            <option value="">
              Select Customer
            </option>

            {customers.map((customer) => (
              <option
                key={customer.id}
                value={customer.id}
              >
                {customer.customerName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Delivery Date
          </label>

          <input
            type="date"
            className="w-full border rounded-lg p-3"
            value={deliveryDate}
            onChange={(e) =>
              setDeliveryDate(e.target.value)
            }
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Status
          </label>

          <select
            className="w-full border rounded-lg p-3"
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >
            <option>Pending</option>
            <option>Confirmed</option>
            <option>In Production</option>
            <option>Ready</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>

      </div>

      {/* Product Section */}

      <div className="mt-8">

        <div className="flex justify-between items-center mb-4">

          <h3 className="text-xl font-semibold">
            Products
          </h3>

          <button
            type="button"
            onClick={addItem}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            + Add Product
          </button>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full border rounded-lg">

            <thead className="bg-gray-100">

              <tr>

                <th className="border p-3 text-left">
                  Product
                </th>

                <th className="border p-3 text-center">
                  Quantity
                </th>

                <th className="border p-3 text-center">
                  Unit Price
                </th>

                <th className="border p-3 text-center">
                  Total
                </th>

                <th className="border p-3 text-center">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {items.map((item, index) => (

                <tr key={index}>

                  <td className="border p-2">

                    <select
                      className="w-full border rounded-lg p-2"
                      value={item.productId}
                      onChange={(e) =>
                        updateItem(
                          index,
                          "productId",
                          Number(e.target.value)
                        )
                      }
                    >
                      <option value={0}>
                        Select Product
                      </option>

                      {products.map((product) => (

                        <option
                          key={product.id}
                          value={product.id}
                        >
                          {product.name}
                        </option>

                      ))}

                    </select>

                  </td>

                  <td className="border p-2">

                    <input
                      type="number"
                      min={1}
                      className="w-24 border rounded-lg p-2 text-center"
                      value={item.quantity}
                      onFocus={(e) =>
                        e.target.select()
                      }
                      onChange={(e) =>
                        updateItem(
                          index,
                          "quantity",
                          Number(e.target.value)
                        )
                      }
                    />

                  </td>

                  <td className="border p-2">

                    <input
                      type="number"
                      min={0}
                      placeholder="0"
                      className="w-32 border rounded-lg p-2 text-center"
                      value={item.unitPrice}
                      onFocus={(e) => {
                        e.target.select();
                      }}
                      onChange={(e) =>
                        updateItem(
                          index,
                          "unitPrice",
                          Number(e.target.value)
                        )
                      }
                    />

                  </td>

                  <td className="border p-2 text-center font-semibold text-blue-700">

                    ₹{" "}
                    {(
                      Number(
                        item.quantity || 0
                      ) *
                      Number(
                        item.unitPrice || 0
                      )
                    ).toLocaleString("en-IN")}

                  </td>

                  <td className="border p-2 text-center">

                    {items.length > 1 && (

                      <button
                        type="button"
                        onClick={() =>
                          removeItem(index)
                        }
                        className="text-red-600 hover:text-red-800 font-semibold"
                      >
                        Remove
                      </button>

                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* Notes */}

      <div className="mt-8">

        <label className="block mb-2 font-medium">
          Notes / Requirements
        </label>

        <textarea
          rows={4}
          className="w-full border rounded-lg p-3"
          placeholder="Enter customer requirements..."
          value={notes}
          onChange={(e) =>
            setNotes(e.target.value)
          }
        />

      </div>

      {/* Order Summary */}

      <div className="mt-8 border rounded-xl p-6 bg-gray-50">

        <div className="flex justify-between text-lg">

          <span className="font-semibold">
            Grand Total
          </span>

          <span className="font-bold text-2xl text-blue-700">
            ₹ {subtotal.toLocaleString("en-IN")}
          </span>

        </div>

      </div>

      <div className="mt-8 flex justify-end gap-4">

        <button
          type="button"
          onClick={() =>
            router.push("/admin/orders")
          }
          className="px-6 py-3 rounded-lg border"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleSave}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg"
        >
          {loading
            ? "Saving..."
            : "Create Order"}
        </button>

      </div>

    </div>
  );
}