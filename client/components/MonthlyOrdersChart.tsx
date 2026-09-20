"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type MonthlyOrder = {
  month: string;
  orders: number;
};

interface MonthlyOrdersChartProps {
  data: MonthlyOrder[];
}

export default function MonthlyOrdersChart({
  data,
}: MonthlyOrdersChartProps) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-6">
        📈 Monthly Orders
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="orders"
              stroke="#2563eb"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}