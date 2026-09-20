"use client";

import { useState } from "react";
import API_BASE_URL from "@/lib/api";

export default function QuotePage() {
  const [form, setForm] = useState({
    customerName: "",
    companyName: "",
    email: "",
    phone: "",
    product: "",
    quantity: "",
    dimensions: "",
    packingPurpose: "",
    message: "",
    deliveryDate: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: form.customerName,
          companyName: form.companyName,
          email: form.email,
          phone: form.phone,
          productName: form.product,
          quantity: form.quantity,
          dimensions: form.dimensions,
          packingPurpose: form.packingPurpose,
          requirements: form.message,
          deliveryDate: form.deliveryDate,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
          errorData?.error || "Failed to submit quote"
        );
      }

      alert("✅ Quote Request Submitted Successfully!");

      setForm({
        customerName: "",
        companyName: "",
        email: "",
        phone: "",
        product: "",
        quantity: "",
        dimensions: "",
        packingPurpose: "",
        message: "",
        deliveryDate: "",
      });
    } catch (error) {
      console.error(error);

      alert(
        `❌ ${
          error instanceof Error
            ? error.message
            : "Failed to submit quote"
        }`
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold text-center text-blue-900 mb-3">
          Naga Sai New Polymers
        </h1>

        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          Request a Quote
        </h2>

        <p className="text-center text-gray-600 mb-10">
          Fill in your requirements and our team will contact you with the best quotation.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-6 md:p-8 grid md:grid-cols-2 gap-6"
        >

          <input
            required
            type="text"
            name="customerName"
            placeholder="Customer Name"
            value={form.customerName}
            onChange={handleChange}
            className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-600 outline-none"
          />

          <input
            type="date"
            name="deliveryDate"
            value={form.deliveryDate}
            onChange={handleChange}
            className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-600 outline-none"
          />

          <input
            required
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={form.companyName}
            onChange={handleChange}
            className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-600 outline-none"
          />

          <input
            required
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-600 outline-none"
          />

          <input
            required
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-600 outline-none"
          />

          <select
            required
            name="product"
            value={form.product}
            onChange={handleChange}
            className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-600 outline-none"
          >
            <option value="">Select Product</option>
            <option>PP Woven Bags</option>
            <option>PP Woven Fabric Rolls</option>
            <option>HDPE Bags</option>
            <option>Leno Bags</option>
            <option>BOPP Bags</option>
          </select>

          <input
            required
            type="text"
            name="dimensions"
            placeholder="Bag Dimensions (e.g. 26 × 40 inches)"
            value={form.dimensions}
            onChange={handleChange}
            className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-600 outline-none"
          />

          <input
            required
            type="number"
            name="quantity"
            placeholder="Required Quantity (Kg / Bags)"
            value={form.quantity}
            onChange={handleChange}
            className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-600 outline-none"
          />

          <input
            required
            type="text"
            name="packingPurpose"
            placeholder="Packing Purpose (e.g. Rice, Fertilizer, Cement)"
            value={form.packingPurpose}
            onChange={handleChange}
            className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-600 outline-none"
          />

          <textarea
            name="message"
            rows={5}
            placeholder="Additional Requirements"
            value={form.message}
            onChange={handleChange}
            className="md:col-span-2 border rounded-lg p-3 focus:ring-2 focus:ring-blue-600 outline-none"
          />

          <button
            type="submit"
            className="w-full md:col-span-2 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Send Quote Request
          </button>

        </form>
      </div>
    </div>
  );
}