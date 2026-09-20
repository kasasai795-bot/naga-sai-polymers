"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { orderService } from "@/services/orderService";
import { invoiceService } from "@/services/invoiceService";

function CreateInvoiceContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const orderId = searchParams.get("orderId");

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  // Customer-specific prices
  const [prices, setPrices] = useState<{
    [key: number]: string;
  }>({});

  const [vehicleNumber, setVehicleNumber] = useState("");
  const [dispatchMode, setDispatchMode] = useState("");
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  async function fetchOrder() {
    try {
      setLoading(true);

      const data = await orderService.getOrderById(
        Number(orderId)
      );

      setOrder(data);
    } catch (err) {
      console.error("Fetch Order Error:", err);
    } finally {
      setLoading(false);
    }
  }

  const subtotal = order
    ? order.items.reduce(
        (sum: number, item: any) => {
          const price = Number(
            prices[item.productId] || 0
          );

          return sum + price * item.quantity;
        },
        0
      )
    : 0;

  const cgst = subtotal * 0.09;
  const sgst = subtotal * 0.09;
  const grandTotal = subtotal + cgst + sgst;

  function updatePrice(
    productId: number,
    value: string
  ) {
    setPrices((previous) => ({
      ...previous,
      [productId]: value,
    }));
  }

  async function generateInvoice() {
    if (!order) return;

    // Make sure every product has a price
    const missingPrice = order.items.some(
      (item: any) =>
        !prices[item.productId] ||
        Number(prices[item.productId]) <= 0
    );

    if (missingPrice) {
      alert(
        "Please enter a valid price for every product."
      );
      return;
    }

    try {
      setGenerating(true);

      const year = new Date().getFullYear();

      const invoiceNumber = `NSP-${year}-${Date.now()
        .toString()
        .slice(-5)}`;

      const items = order.items.map(
        (item: any) => {
          const unitPrice = Number(
            prices[item.productId]
          );

          return {
            productId: item.productId,
            quantity: item.quantity,
            unitPrice,
            amount:
              item.quantity * unitPrice,
          };
        }
      );

      const invoice =
        await invoiceService.createInvoice({
          invoiceNumber,
          orderId: order.id,
          customerId: order.customerId,
          subtotal,
          cgst,
          sgst,
          igst: 0,
          grandTotal,
          paymentStatus: "Unpaid",
          vehicleNumber,
          dispatchMode,
          remarks,
          items,
        });

      alert(
        "Invoice Generated Successfully"
      );

      router.push(
        `/admin/invoices/${invoice.id}`
      );
    } catch (err: any) {
      console.error(
        "Generate Invoice Error:",
        err
      );

      if (
        err.message?.includes("409")
      ) {
        alert(
          "Invoice already exists for this order."
        );
        return;
      }

      alert(
        err.message ||
          "Failed to generate invoice"
      );
    } finally {
      setGenerating(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold">
          Loading Order...
        </h2>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold">
          Order not found.
        </h2>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">

      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">
          Generate Invoice
        </h1>

        <p className="text-gray-500 mt-2">
          Order {order.orderNumber}
        </p>
      </div>

      {/* Customer Details */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold mb-5">
          Customer Details
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <p className="text-sm text-gray-500">
              Customer
            </p>

            <p className="font-semibold mt-1">
              {order.customerName}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Company
            </p>

            <p className="font-semibold mt-1">
              {order.companyName || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Email
            </p>

            <p className="font-semibold mt-1">
              {order.email || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Phone
            </p>

            <p className="font-semibold mt-1">
              {order.phone || "-"}
            </p>
          </div>

        </div>

      </div>

      {/* Order Details */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold mb-5">
          Order Details
        </h2>

        <div className="grid md:grid-cols-3 gap-5">

          <div>
            <p className="text-sm text-gray-500">
              Dimensions
            </p>

            <p className="font-semibold mt-1">
              {order.dimensions || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Packing Purpose
            </p>

            <p className="font-semibold mt-1">
              {order.packingPurpose || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Delivery Date
            </p>

            <p className="font-semibold mt-1">
              {order.deliveryDate
                ? new Date(
                    order.deliveryDate
                  ).toLocaleDateString(
                    "en-IN"
                  )
                : "-"}
            </p>
          </div>

        </div>

      </div>

      {/* Products + Customer Specific Pricing */}

      <div className="bg-white rounded-xl shadow p-6">

        <div className="flex justify-between items-center mb-5">

          <h2 className="text-xl font-bold">
            Products & Pricing
          </h2>

          <span className="text-sm text-gray-500">
            Enter customer-specific prices
          </span>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="border-b bg-gray-50">

                <th className="text-left p-4">
                  Product
                </th>

                <th className="text-center p-4">
                  Quantity
                </th>

                <th className="text-right p-4">
                  Unit Price
                </th>

                <th className="text-right p-4">
                  Amount
                </th>

              </tr>
            </thead>

            <tbody>

              {order.items.map(
                (item: any) => {

                  const unitPrice =
                    Number(
                      prices[
                        item.productId
                      ] || 0
                    );

                  const amount =
                    unitPrice *
                    item.quantity;

                  return (
                    <tr
                      key={item.id}
                      className="border-b"
                    >

                      <td className="p-4 font-medium">
                        {item.product?.name ||
                          "Unknown Product"}
                      </td>

                      <td className="p-4 text-center">
                        {item.quantity}
                      </td>

                      <td className="p-4">

                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={
                            prices[
                              item.productId
                            ] || ""
                          }
                          onChange={(e) =>
                            updatePrice(
                              item.productId,
                              e.target.value
                            )
                          }
                          placeholder="Enter price"
                          className="w-40 ml-auto block border rounded-lg px-3 py-2 text-right"
                        />

                      </td>

                      <td className="p-4 text-right font-medium">
                        ₹
                        {amount.toLocaleString(
                          "en-IN",
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}
                      </td>

                    </tr>
                  );
                }
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* Dispatch Details */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold mb-5">
          Dispatch Details
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          <div>

            <label className="block text-sm font-medium mb-2">
              Vehicle Number
            </label>

            <input
              type="text"
              value={vehicleNumber}
              onChange={(e) =>
                setVehicleNumber(
                  e.target.value
                )
              }
              placeholder="Enter vehicle number"
              className="w-full border rounded-lg px-4 py-3"
            />

          </div>

          <div>

            <label className="block text-sm font-medium mb-2">
              Dispatch Mode
            </label>

            <select
              value={dispatchMode}
              onChange={(e) =>
                setDispatchMode(
                  e.target.value
                )
              }
              className="w-full border rounded-lg px-4 py-3"
            >

              <option value="">
                Select dispatch mode
              </option>

              <option value="Transport">
                Transport
              </option>

              <option value="Customer Pickup">
                Customer Pickup
              </option>

              <option value="Courier">
                Courier
              </option>

              <option value="Other">
                Other
              </option>

            </select>

          </div>

        </div>

        <div className="mt-5">

          <label className="block text-sm font-medium mb-2">
            Remarks
          </label>

          <textarea
            value={remarks}
            onChange={(e) =>
              setRemarks(e.target.value)
            }
            placeholder="Enter invoice remarks"
            rows={4}
            className="w-full border rounded-lg px-4 py-3"
          />

        </div>

      </div>

      {/* Invoice Summary */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold mb-5">
          Invoice Summary
        </h2>

        <div className="max-w-md ml-auto space-y-3">

          <div className="flex justify-between">
            <span>Subtotal</span>

            <span>
              ₹
              {subtotal.toLocaleString(
                "en-IN",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              )}
            </span>
          </div>

          <div className="flex justify-between">
            <span>CGST (9%)</span>

            <span>
              ₹
              {cgst.toLocaleString(
                "en-IN",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              )}
            </span>
          </div>

          <div className="flex justify-between">
            <span>SGST (9%)</span>

            <span>
              ₹
              {sgst.toLocaleString(
                "en-IN",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              )}
            </span>
          </div>

          <div className="border-t pt-3 flex justify-between text-xl font-bold">

            <span>
              Grand Total
            </span>

            <span>
              ₹
              {grandTotal.toLocaleString(
                "en-IN",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              )}
            </span>

          </div>

        </div>

      </div>

      {/* Generate */}

      <div className="flex justify-end gap-4">

        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={generateInvoice}
          disabled={generating}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-7 py-3 rounded-lg font-semibold"
        >
          {generating
            ? "Generating..."
            : "Generate Invoice"}
        </button>

      </div>

    </div>
  );
}

export default function CreateInvoicePage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-xl font-semibold">
          Loading Invoice...
        </div>
      }
    >
      <CreateInvoiceContent />
    </Suspense>
  );
}