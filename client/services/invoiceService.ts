import { getAuthHeaders } from "@/utils/api";
import API_BASE_URL from "@/lib/api";

const API_URL = `${API_BASE_URL}/invoices`;

export interface InvoiceItem {
  productId: number;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface Invoice {
  id?: number;

  invoiceNumber: string;

  orderId: number;
  customerId?: number;

  subtotal: number;
  cgst: number;
  sgst: number;
  igst: number;

  grandTotal: number;

  paymentStatus: string;

  vehicleNumber?: string;
  dispatchMode?: string;
  remarks?: string;

  items: InvoiceItem[];
}

export const invoiceService = {
  async getInvoices() {
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
      throw new Error(data.message || "Failed to fetch invoices");
    }

    return data;
  },

  async getInvoice(id: number) {
    const res = await fetch(`${API_URL}/${id}`, {
      headers: getAuthHeaders(),
    });

    if (res.status === 401) {
      localStorage.removeItem("adminToken");
      window.location.href = "/admin";
      return;
    }

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch invoice");
    }

    return data;
  },

  async createInvoice(invoice: Invoice) {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(invoice),
    });

    if (res.status === 401) {
      localStorage.removeItem("adminToken");
      window.location.href = "/admin";
      return;
    }

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to create invoice");
    }

    return data;
  },

  async updatePaymentStatus(
    id: number,
    paymentStatus: string
  ) {
    const res = await fetch(`${API_URL}/${id}/payment`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        paymentStatus,
      }),
    });

    if (res.status === 401) {
      localStorage.removeItem("adminToken");
      window.location.href = "/admin";
      return;
    }

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.message || "Failed to update payment status"
      );
    }

    return data;
  },

  async deleteInvoice(id: number) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (res.status === 401) {
      localStorage.removeItem("adminToken");
      window.location.href = "/admin";
      return;
    }

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to delete invoice");
    }

    return data;
  },
};