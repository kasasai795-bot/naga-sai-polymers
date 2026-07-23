import { Order } from "../../../types/order";

type OrdersTableProps = {
  orders: Order[];
  loading: boolean;
  search: string;
  updateStatus: (id: number, status: string) => void;
  deleteOrder: (id: number) => void;
};

export default function OrdersTable({
  orders,
  loading,
  search,
  updateStatus,
  deleteOrder,
}: OrdersTableProps) {
  const filteredOrders = orders.filter((order) => {
    const term = search.toLowerCase();

    return (
      order.customerName.toLowerCase().includes(term) ||
      order.companyName.toLowerCase().includes(term) ||
      order.productName.toLowerCase().includes(term)
    );
  });

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden mt-6">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100 border-b">
            <tr className="text-gray-700">
              <th className="px-6 py-4 text-left font-semibold">ID</th>
              <th className="px-6 py-4 text-left font-semibold">
                Customer
              </th>
              <th className="px-6 py-4 text-left font-semibold">
                Company
              </th>
              <th className="px-6 py-4 text-left font-semibold">
                Product
              </th>
              <th className="px-6 py-4 text-left font-semibold">
                Quantity
              </th>
              <th className="px-6 py-4 text-left font-semibold">
                Status
              </th>
              <th className="px-6 py-4 text-center font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-10 text-center text-gray-500"
                >
                  Loading orders...
                </td>
              </tr>
            ) : filteredOrders.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-10 text-center text-gray-500"
                >
                  No orders found.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-semibold">
                    #{order.id}
                  </td>

                  <td className="px-6 py-4">
                    {order.customerName}
                  </td>

                  <td className="px-6 py-4">
                    {order.companyName}
                  </td>

                  <td className="px-6 py-4">
                    {order.productName}
                  </td>

                  <td className="px-6 py-4 font-medium">
                    {order.quantity}
                  </td>

                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(order.id, e.target.value)
                      }
                      className={`px-3 py-2 rounded-lg border text-sm font-medium outline-none transition
                        ${
                          order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                            : order.status === "In Progress"
                            ? "bg-blue-100 text-blue-800 border-blue-300"
                            : "bg-green-100 text-green-800 border-green-300"
                        }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">
                        In Progress
                      </option>
                      <option value="Completed">
                        Completed
                      </option>
                    </select>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => deleteOrder(order.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      Delete
                    </button>
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