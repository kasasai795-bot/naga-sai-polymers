import { getAuthHeaders } from "@/utils/api";
import API_BASE_URL from "@/lib/api";

const API_URL = `${API_BASE_URL}/products`;

export const getProducts = async () => {
  const res = await fetch(API_URL, {
    headers: getAuthHeaders(),
  });

  if (res.status === 401) {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin";
    return [];
  }

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();

  return Array.isArray(data) ? data : [];
};

export const createProduct = async (product: any) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(product),
  });

  if (res.status === 401) {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin";
    return;
  }

  if (!res.ok) {
    throw new Error("Failed to create product");
  }

  return res.json();
};

export const updateProduct = async (
  id: number,
  product: any
) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(product),
  });

  if (res.status === 401) {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin";
    return;
  }

  if (!res.ok) {
    throw new Error("Failed to update product");
  }

  return res.json();
};

export const deleteProduct = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (res.status === 401) {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin";
    return;
  }

  if (!res.ok) {
    throw new Error("Failed to delete product");
  }

  return res.json();
};