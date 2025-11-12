// Product Types
export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  description: string;
  price: number;
  oldPrice?: number;
  composition?: string;
  care?: string;
  images: string[];
  categoryId: string;
  category?: Category;
  inStock: boolean;
  isNew: boolean;
  isFeatured: boolean;
  isActive: boolean;
  variants?: ProductVariant[];
  viewsCount: number;
  salesCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  size?: string;
  color?: string;
  colorHex?: string;
  material?: string;
  quantity: number;
  sku: string;
  price?: number;
  isActive: boolean;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  children?: Category[];
  isActive: boolean;
  sortOrder: number;
}

// Order Types
export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export enum DeliveryMethod {
  CDEK_PICKUP = 'CDEK_PICKUP',
  CDEK_COURIER = 'CDEK_COURIER',
  RUSSIAN_POST = 'RUSSIAN_POST',
}

export interface Order {
  id: string;
  orderNumber: string;
  customerEmail: string;
  customerPhone: string;
  customerFirstName: string;
  customerLastName: string;
  deliveryMethod: DeliveryMethod;
  deliveryAddress: string;
  deliveryCity: string;
  deliveryZipCode?: string;
  deliveryPrice: number;
  trackingNumber?: string;
  subtotal: number;
  total: number;
  paymentStatus: PaymentStatus;
  paymentId?: string;
  status: OrderStatus;
  customerNote?: string;
  adminNote?: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
  paidAt?: string;
  shippedAt?: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product?: Product;
  variantId?: string;
  variant?: ProductVariant;
  productName: string;
  productSku: string;
  variantSize?: string;
  variantColor?: string;
  price: number;
  quantity: number;
  subtotal: number;
}

// Cart & Wishlist Types
export interface CartItem {
  productId: string;
  variantId?: string;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
}

// User Types (for admin)
export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  CONTENT_MANAGER = 'CONTENT_MANAGER',
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
