import { getAuthHeaders } from "@/utils/api";
import API_BASE_URL from "@/lib/api";

const API_URL = `${API_BASE_URL}/dashboard`;

export interface RecentOrder {
  id: number;
  customerName: string;
  companyName?: string | null;
  productName: string;
  quantity: number;
  status: string;
  deliveryDate: string;
}

export interface DashboardStats {
  totalProducts: number;
  totalCustomers: number;
  totalInvoices: number;
  totalRevenue: number;

  totalOrders: number;
  pendingOrders: number;
  inProgressOrders: number;
  completedOrders: number;

  monthlyOrders: {
    month: string;
    orders: number;
  }[];

  recentOrders: RecentOrder[];
}

export const dashboardService = {
  async getDashboardStats(): Promise<DashboardStats> {
    const res = await fetch(`${API_URL}/stats`, {
      headers: getAuthHeaders(),
    });

    if (res.status === 401) {
      localStorage.removeItem("adminToken");
      window.location.href = "/admin";
      throw new Error("Unauthorized");
    }

    if (!res.ok) {
      throw new Error("Failed to fetch dashboard");
    }

    return res.json();
  },
};