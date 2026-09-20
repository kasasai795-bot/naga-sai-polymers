"use client";

import OrderForm from "@/components/orders/OrderForm";

export default function CreateOrderPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Create Order
        </h1>

        <p className="text-gray-500 mt-1">
          Create a new customer order.
        </p>
      </div>

      <OrderForm />
    </div>
  );
}