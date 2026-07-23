const API_URL = "http://localhost:5000/api/orders";

export const getOrders = async () => {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }

  return res.json();
};

export const updateOrderStatus = async (
  id: number,
  status: string
) => {
  const res = await fetch(`${API_URL}/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    throw new Error("Failed to update status");
  }

  return res.json();
};

export const deleteOrderById = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete order");
  }

  return res.json();
};