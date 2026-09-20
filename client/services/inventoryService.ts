import { getAuthHeaders } from "@/utils/api";
import API_BASE_URL from "@/lib/api";

const API_URL = `${API_BASE_URL}/inventory`;

export const getInventory = async () => {
  const res = await fetch(API_URL, {
    headers: getAuthHeaders(),
  });

  if (res.status === 401) {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin";
    return [];
  }

  if (!res.ok) {
    throw new Error("Failed to fetch inventory");
  }

  const data = await res.json();

  return Array.isArray(data) ? data : [];
};

export const stockIn = async (
  inventoryId: number,
  quantity: number,
  remarks: string
) => {
  const res = await fetch(`${API_URL}/stock-in`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      inventoryId,
      quantity,
      remarks,
    }),
  });

  if (res.status === 401) {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin";
    return;
  }

  if (!res.ok) {
    throw new Error("Stock In Failed");
  }

  return res.json();
};

export const stockOut = async (
  inventoryId: number,
  quantity: number,
  remarks: string
) => {
  const res = await fetch(`${API_URL}/stock-out`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      inventoryId,
      quantity,
      remarks,
    }),
  });

  if (res.status === 401) {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin";
    return;
  }

  if (!res.ok) {
    throw new Error("Stock Out Failed");
  }

  return res.json();
};