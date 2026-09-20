"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAuthHeaders } from "@/utils/api";
import API_BASE_URL from "@/lib/api";

export default function CreateCustomerPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    customerName: "",
    companyName: "",
    email: "",
    phone: "",
    address: "",
    gstNumber: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit() {
    if (!form.customerName.trim()) {
      alert("Customer Name is required.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE_URL}/customers`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(form),
      });

      if (res.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin";
        return;
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to create customer"
        );
      }

      alert("Customer created successfully.");

      router.push("/admin/customers");
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8">

      <h1 className="text-3xl font-bold mb-8">
        Add Customer
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        <input
          name="customerName"
          placeholder="Customer Name"
          value={form.customerName}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

        <input
          name="companyName"
          placeholder="Company Name"
          value={form.companyName}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

      </div>

      <textarea
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
        rows={4}
        className="border rounded-lg p-3 w-full mt-6"
      />

      <input
        name="gstNumber"
        placeholder="GST Number"
        value={form.gstNumber}
        onChange={handleChange}
        className="border rounded-lg p-3 w-full mt-6"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-8 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg"
      >
        {loading ? "Saving..." : "Save Customer"}
      </button>

    </div>
  );
}