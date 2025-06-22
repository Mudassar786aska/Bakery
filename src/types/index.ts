export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  user: User;
  items: CartItem[];
  total: number;
  shippingDetails: ShippingDetails;
  bankDetails?: BankDetails;
  status: 'pending' | 'dispatched' | 'delivered';
  createdAt: Date;
  updatedAt?: Date;
}

export interface ShippingDetails {
  fullName: string;
  address: string;
  city: string;
  phone: string;
  email: string;
}

export interface BankDetails {
  accountHolder: string;
  accountNumber: string;
  bankName: string;
  branchCode: string;
}