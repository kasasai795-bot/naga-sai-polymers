import { getAuthHeaders } from "@/utils/api";
import API_BASE_URL from "@/lib/api";

const API_URL = `${API_BASE_URL}/orders`;

export interface OrderItem {
  productId: number;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
}

export interface OrderInvoice {
  id: number;
  invoiceNumber: string;
}

export interface Order {
  id?: number;
  orderNumber?: string;

  customerId?: number;

  customerName: string;
  companyName?: string;
  email?: string;
  phone?: string;

  deliveryDate?: string;
  requirements?: string;

  status: string;
  grandTotal: number;

  items: OrderItem[];

  invoice?: OrderInvoice | null;
}

export const orderService = {
  async getAllOrders(): Promise<Order[]> {
    const res = await fetch(API_URL, {
      headers: getAuthHeaders(),
    });

    if (res.status === 401) {
      localStorage.removeItem("adminToken");
      window.location.href = "/admin";
      return [];
    }

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch orders");
    }

    return Array.isArray(data) ? data : [];
  },

  async getOrderById(id: number): Promise<Order> {
    const res = await fetch(`${API_URL}/${id}`, {
      headers: getAuthHeaders(),
    });

    if (res.status === 401) {
      localStorage.removeItem("adminToken");
      window.location.href = "/admin";
      throw new Error("Unauthorized");
    }

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch order");
    }

    return data;
  },

  async createOrder(order: Order) {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(order),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to create order");
    }

    return data;
  },

  async deleteOrder(id: number) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to delete order");
    }

    return data;
  },

  async updateStatus(id: number, status: string) {
    const res = await fetch(`${API_URL}/${id}/status`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        status,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to update status");
    }

    return data;
  },
};