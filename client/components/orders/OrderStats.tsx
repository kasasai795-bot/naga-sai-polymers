import { Order } from "@/services/orderService";

interface OrderStatsProps {
  orders: Order[];
}

export default function OrderStats({ orders }: OrderStatsProps) {
  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.grandTotal || 0),
    0
  );

  const cards = [
    {
      title: "Total Orders",
      value: totalOrders,
      color: "text-blue-600",
    },
    {
      title: "Pending",
      value: pendingOrders,
      color: "text-yellow-600",
    },
    {
      title: "Delivered",
      value: deliveredOrders,
      color: "text-green-600",
    },
    {
      title: "Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-xl border shadow-sm p-6"
        >
          <p className="text-gray-500 text-sm">
            {card.title}
          </p>

          <h2 className={`text-3xl font-bold mt-2 ${card.color}`}>
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}