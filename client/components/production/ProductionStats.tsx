"use client";

interface ProductionStatsProps {
  production: any[];
}

export default function ProductionStats({
  production,
}: ProductionStatsProps) {
  const total = production.length;

  const pending = production.filter(
    (item) => item.status === "Pending"
  ).length;

  const inProduction = production.filter(
    (item) => item.status === "In Production"
  ).length;

  const completed = production.filter(
    (item) => item.status === "Completed"
  ).length;

  const cards = [
    {
      title: "Total Jobs",
      value: total,
    },
    {
      title: "Pending",
      value: pending,
    },
    {
      title: "In Production",
      value: inProduction,
    },
    {
      title: "Completed",
      value: completed,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-xl shadow p-6"
        >
          <h3 className="text-gray-500 text-sm">
            {card.title}
          </h3>

          <p className="text-3xl font-bold mt-2">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}