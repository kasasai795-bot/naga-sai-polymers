"use client";

import { useState } from "react";
import API_BASE_URL from "@/lib/api";

export default function ChangePasswordPage() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch(
        `${API_BASE_URL}/admin/change-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      alert(data.message);

      if (res.ok) {
        setForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow rounded-xl p-6">
      <h1 className="text-2xl font-bold mb-6">
        Change Password
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          value={form.currentPassword}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={form.newPassword}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white rounded-lg py-3 hover:bg-blue-700"
        >
          {loading ? "Updating..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}