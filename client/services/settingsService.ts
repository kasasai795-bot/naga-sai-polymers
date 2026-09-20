import { getAuthHeaders } from "@/utils/api";
import API_BASE_URL from "@/lib/api";

const API_URL = `${API_BASE_URL}/settings`;

export interface Settings {
  companyName: string;
  gstNumber: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  invoicePrefix: string;
  logo: string;

  // Invoice Settings
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  branch: string;

  panNumber: string;
  state: string;

  declaration: string;
  authorizedSign: string;
}

export const settingsService = {
  async getSettings(): Promise<Settings> {
    const res = await fetch(API_URL, {
      headers: getAuthHeaders(),
    });

    if (res.status === 401) {
      localStorage.removeItem("adminToken");
      window.location.href = "/admin";
      throw new Error("Unauthorized");
    }

    if (!res.ok) {
      throw new Error("Failed to fetch settings");
    }

    return res.json();
  },

  async updateSettings(settings: Settings) {
    const res = await fetch(API_URL, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(settings),
    });

    if (res.status === 401) {
      localStorage.removeItem("adminToken");
      window.location.href = "/admin";
      return;
    }

    if (!res.ok) {
      throw new Error("Failed to update settings");
    }

    return res.json();
  },
};