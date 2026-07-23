export interface Order {
  id: number;
  customerName: string;
  companyName: string;
  email: string;
  phone: string;
  productName: string;
  quantity: number;
  deliveryDate: string;
  requirements: string;
  status: "Pending" | "In Progress" | "Completed";
  createdAt: string;
}