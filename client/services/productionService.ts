import { getAuthHeaders } from "@/utils/api";
import API_BASE_URL from "@/lib/api";

const API_URL = `${API_BASE_URL}/production`;

export interface Production {
  id: number;
  orderNo: string;
  customerName: string;
  stage: string;
  status: string;
  expectedDate?: string;
}

export const productionService = {
  async getAllProduction(): Promise<Production[]> {
    const res = await fetch(API_URL, {
      headers: getAuthHeaders(),
    });

    if (res.status === 401) {
      localStorage.removeItem("adminToken");
      window.location.href = "/admin";
      return [];
    }

    if (!res.ok) {
      throw new Error("Failed to fetch production");
    }

    const data = await res.json();

    return Array.isArray(data) ? data : [];
  },
};