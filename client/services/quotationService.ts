import API_BASE_URL from "@/lib/api";

const API_URL = `${API_BASE_URL}/quotations`;

// ===============================
// Get All Quotations
// ===============================
export const getQuotations = async () => {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch quotations");
  }

  return res.json();
};

// ===============================
// Get Single Quotation
// ===============================
export const getQuotation = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch quotation");
  }

  return res.json();
};

// ===============================
// Create Quotation
// ===============================
export const createQuotation = async (quotation: any) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quotation),
  });

  if (!res.ok) {
    throw new Error("Failed to create quotation");
  }

  return res.json();
};

// ===============================
// Update Quotation
// ===============================
export const updateQuotation = async (
  id: number,
  quotation: any
) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quotation),
  });

  if (!res.ok) {
    throw new Error("Failed to update quotation");
  }

  return res.json();
};

// ===============================
// Delete Quotation
// ===============================
export const deleteQuotation = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete quotation");
  }

  return res.json();
};