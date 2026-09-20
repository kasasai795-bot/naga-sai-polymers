"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  pending: number;
  inProgress: number;
  completed: number;
};

const COLORS = ["#f59e0b", "#3b82f6", "#22c55e"];

export default function OrderStatusPieChart({
  pending,
  inProgress,
  completed,
}: Props) {
  const data = [
    {
      name: "Pending",
      value: pending,
    },
    {
      name: "In Progress",
      value: inProgress,
    },
    {
      name: "Completed",
      value: completed,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6 h-full">
      <h2 className="text-xl font-semibold mb-6">
        📊 Order Status
      </h2>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={90}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}