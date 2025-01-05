export enum OrderStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED'
}
  
  export interface OrderItem {
    id: number;
    name: string;
    size: string;
    quantity: number;
    price: number;
  }
  
  export interface Order {
    id: string;
    userId: string;
    items: OrderItem[];
    total: number;
    status: OrderStatus;
    createdAt: string;
    updatedAt: string;
  }
  
  