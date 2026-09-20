"use client";

import { useEffect, useState } from "react";

import ProductionTable from "@/components/production/ProductionTable";
import ProductionStats from "@/components/production/ProductionStats";

import {
  productionService,
  Production,
} from "@/services/productionService";

export default function ProductionPage() {
  const [production, setProduction] = useState<Production[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchProduction() {
    try {
      setLoading(true);

      const data =
        await productionService.getAllProduction();

      setProduction(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProduction();
  }, []);

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Production Management
        </h1>

        <p className="text-gray-500">
          Track all production jobs.
        </p>
      </div>

      <ProductionStats production={production} />

      <ProductionTable
        production={production}
        refresh={fetchProduction}
        loading={loading}
      />

    </div>
  );
}