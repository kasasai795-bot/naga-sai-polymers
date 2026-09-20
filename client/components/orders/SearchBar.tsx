"use client";

import React from "react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
}

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}: SearchBarProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 flex flex-col md:flex-row gap-4 justify-between">
      <input
        type="text"
        placeholder="Search orders..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border rounded-lg px-4 py-2 w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="border rounded-lg px-4 py-2 md:w-60"
      >
        <option value="All">All Status</option>
        <option value="Pending">Pending</option>
        <option value="Confirmed">Confirmed</option>
        <option value="Manufacturing">Manufacturing</option>
        <option value="Ready">Ready</option>
        <option value="Dispatched">Dispatched</option>
        <option value="Delivered">Delivered</option>
        <option value="Cancelled">Cancelled</option>
      </select>
    </div>
  );
}