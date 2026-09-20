"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  getQuotations,
  deleteQuotation,
} from "@/services/quotationService";
import SearchBar from "@/components/quotations/SearchBar";
import QuotationStats from "@/components/quotations/QuotationStats";
import QuotationTable, {
  Quotation,
} from "@/components/quotations/QuotationTable";
export default function QuotationsPage() {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function loadQuotations() {
    try {
      setLoading(true);

      const data = await getQuotations();

      setQuotations(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load quotations.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadQuotations();
  }, []);

  async function handleDelete(id: number) {
    try {
      await deleteQuotation(id);

      await loadQuotations();
    } catch (error) {
      console.error(error);
      alert("Failed to delete quotation.");
    }
  }

  const filteredQuotations = useMemo(() => {
    return quotations.filter((quotation) => {
      const keyword = search.toLowerCase();

      return (
        quotation.customerName
          ?.toLowerCase()
          .includes(keyword) ||
        quotation.companyName
          ?.toLowerCase()
          .includes(keyword) ||
        quotation.quotationNumber
          ?.toLowerCase()
          .includes(keyword)
      );
    });
  }, [quotations, search]);

  return (
    <div className="space-y-6 p-6">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold">
            Quotations
          </h1>

          <p className="text-gray-500 mt-1">
            Manage customer quotations
          </p>

        </div>

        <Link
          href="/admin/quotations/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >
          + New Quotation
        </Link>

      </div>

      <QuotationStats
        quotations={filteredQuotations}
      />

      <SearchBar
        value={search}
        onChange={setSearch}
      />
            <QuotationTable
        quotations={filteredQuotations}
        loading={loading}
        onDelete={handleDelete}
      />

      {!loading && filteredQuotations.length === 0 && (
        <div className="bg-white rounded-xl shadow p-10 text-center">

          <h2 className="text-xl font-semibold text-gray-700">
            No Quotations Found
          </h2>

          <p className="text-gray-500 mt-2">
            Create your first quotation to get started.
          </p>

          <Link
            href="/admin/quotations/create"
            className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
          >
            Create Quotation
          </Link>

        </div>
      )}

    </div>
  );
}