export interface Stock {
  size: string;
  quantity: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPercentage?: number;
  images: string[];
  sizes: string[];
  stock: Stock[];
  color: string;
  inStock: boolean;
  gender: "Men" | "Women" | "Unisex";
  category: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
}
