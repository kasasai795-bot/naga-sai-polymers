interface Quotation {
  id: number;
  status: string;
  grandTotal: number;
}

interface Props {
  quotations: Quotation[];
}

export default function QuotationStats({
  quotations,
}: Props) {
  const total = quotations.length;

  const pending = quotations.filter(
    (q) => q.status === "Pending"
  ).length;

  const approved = quotations.filter(
    (q) => q.status === "Approved"
  ).length;

  const revenue = quotations.reduce(
    (sum, q) => sum + Number(q.grandTotal || 0),
    0
  );

  const cards = [
    {
      title: "Total Quotations",
      value: total,
      color: "text-blue-600",
    },
    {
      title: "Pending",
      value: pending,
      color: "text-yellow-600",
    },
    {
      title: "Approved",
      value: approved,
      color: "text-green-600",
    },
    {
      title: "Revenue",
      value: `₹${revenue.toLocaleString()}`,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-xl shadow p-6"
        >
          <h3 className="text-gray-500 text-sm">
            {card.title}
          </h3>

          <p className={`text-3xl font-bold mt-2 ${card.color}`}>
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}