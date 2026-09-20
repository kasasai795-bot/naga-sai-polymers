"use client";

type RecentOrder = {
  id: number;
  customerName: string;
  companyName?: string | null;
  productName: string;
  quantity: number;
  status: string;
  deliveryDate: string;
};

interface RecentOrdersProps {
  orders: RecentOrder[];
}

export default function RecentOrders({
  orders,
}: RecentOrdersProps) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-6">
        📋 Recent Orders
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-center">Qty</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Delivery</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-6 text-gray-500"
                >
                  No recent orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    <div className="font-medium">
                      {order.customerName}
                    </div>

                    {order.companyName && (
                      <div className="text-sm text-gray-500">
                        {order.companyName}
                      </div>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {order.productName}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {order.quantity}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : order.status === "In Progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-center">
                    {order.deliveryDate}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}