export interface OrderItem {
  id: string;
  price: number;
  quantity: number;
  totalPrice: number;
  size: string;
  Product: {
    id: number;
    name: string;
    images: string[];
    discountPercentage: number;
  };
}

export interface Order {
  id: number;
  orderId: string;
  status: string;
  paymentStatus: string;
  orderDate: string;
  shippingAddress: string;
  paymentMethod: string;
  OrderItems: OrderItem[];
  totalAmount: number;
  shippingCost: number;
}

export interface OrderItemCheckout {
  productId: number;
  quantity: number;
  price: number;
  totalPrice: number;
  size: string;
  image: string;
}

export interface OrderCheckout {
  orderId: string;
  userId: string | null;
  orderDate: string;
  totalAmount: number;
  shippingCost: number;
  status: string;
  shippingAddress: string;
  paymentMethod: string;
  email: string;
  OrderItems: OrderItem[];
}
