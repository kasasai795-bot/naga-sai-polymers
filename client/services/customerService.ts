import { getAuthHeaders } from "@/utils/api";
import API_BASE_URL from "@/lib/api";

const API_URL = `${API_BASE_URL}/customers`;

export interface Customer {
  id: number;
  customerName: string;
  companyName?: string;
  email?: string;
  phone?: string;
  address?: string;
  gstNumber?: string;
}

export const customerService = {
  async getAllCustomers(): Promise<Customer[]> {
    const res = await fetch(API_URL, {
      headers: getAuthHeaders(),
    });

    if (res.status === 401) {
      localStorage.removeItem("adminToken");
      window.location.href = "/admin";
      return [];
    }

    if (!res.ok) {
      throw new Error("Failed to fetch customers");
    }

    return res.json();
  },

  async getCustomerById(id: number): Promise<Customer> {
    const res = await fetch(`${API_URL}/${id}`, {
      headers: getAuthHeaders(),
    });

    if (res.status === 401) {
      localStorage.removeItem("adminToken");
      window.location.href = "/admin";
      throw new Error("Unauthorized");
    }

    if (!res.ok) {
      throw new Error("Failed to fetch customer");
    }

    return res.json();
  },
};