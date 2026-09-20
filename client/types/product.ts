export interface Product {
  id: number;

  name: string;
  category: string;

  gsm?: string;
  size?: string;
  color?: string;
  printing?: string;
  lamination?: boolean;

  description: string;

  image: string;

  status: string;

  createdAt?: string;
  updatedAt?: string;
}