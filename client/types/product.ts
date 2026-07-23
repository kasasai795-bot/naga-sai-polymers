export interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}