"use client";

import { getAuthHeaders } from "@/utils/api";
import API_BASE_URL from "@/lib/api";

interface ProductionTableProps {
  production: any[];
  loading: boolean;
  refresh: () => void;
}

const STAGES = [
  "Pending",
  "In Production",
  "Quality Check",
  "Completed",
];

export default function ProductionTable({
  production,
  loading,
  refresh,
}: ProductionTableProps) {
  const updateStage = async (id: number, stage: string) => {
    try {
      let status = "In Production";

      if (stage === "Pending") {
        status = "Pending";
      } else if (stage === "In Production") {
        status = "In Production";
      } else if (stage === "Quality Check") {
        status = "In Production";
      } else if (stage === "Completed") {
        status = "Completed";
      }

      const response = await fetch(
        `${API_BASE_URL}/production/${id}`,
        {
          method: "PATCH",
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            stage,
            status,
          }),
        }
      );

      if (response.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin";
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
          errorData?.message ||
            errorData?.error ||
            "Failed to update production"
        );
      }

      await refresh();
    } catch (err) {
      console.error("Production update error:", err);

      alert(
        err instanceof Error
          ? err.message
          : "Failed to update production stage."
      );
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        Loading production...
      </div>
    );
  }

  if (production.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
        No production jobs found.
      </div>
    );
  }

  const badgeColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";

      case "In Production":
        return "bg-blue-100 text-blue-700";

      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (date: string | null) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr className="text-sm text-gray-700">
              <th className="px-4 py-3 text-left">
                Order No
              </th>

              <th className="px-4 py-3 text-left">
                Customer
              </th>

              <th className="px-4 py-3 text-left">
                Stage
              </th>

              <th className="px-4 py-3 text-left">
                Status
              </th>

              <th className="px-4 py-3 text-left">
                Expected Date
              </th>
            </tr>
          </thead>

          <tbody>
            {production.map((item: any) => (
              <tr
                key={item.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-4 py-3 font-medium">
                  {item.order?.orderNumber || "-"}
                </td>

                <td className="px-4 py-3">
                  {item.order?.customerName || "-"}
                </td>

                <td className="px-4 py-3">
                  <select
                    value={item.stage}
                    onChange={(e) => {
                      const stage = e.target.value;

                      if (
                        stage === "Completed" &&
                        !confirm(
                          "Mark this production as completed?"
                        )
                      ) {
                        return;
                      }

                      updateStage(item.id, stage);
                    }}
                    disabled={item.stage === "Completed"}
                    className="border rounded-lg px-3 py-2 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    {STAGES.map((stage) => (
                      <option
                        key={stage}
                        value={stage}
                      >
                        {stage}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${badgeColor(
                      item.status
                    )}`}
                  >
                    {item.status || "Pending"}
                  </span>
                </td>

                <td className="px-4 py-3">
                  {formatDate(item.expectedDate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}