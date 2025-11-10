export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  profile_picture: string;
  role: "customer" | "admin";
};

export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  basePrice?: number;
  baseStock?: number;
  images: string[];
  variantOptions?: VariantOptionForm[];
  variantCombinations?: VariantCombination[];
  createdAt?: string;
  updatedAt?: string;
}

export interface VariantOptionForm {
  id?: number;
  nameVariant: string;
  valueVariant?: ValueVariantForm[];
}

export interface ValueVariantForm {
  id?: number;
  label: string;
  imageVariant?: string;
}

export interface VariantCombination {
  combination: Record<string, string>;
  stock: number;
  price: number;
}

export type Address = {
  id: number;
  recipient_name: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  postal_code: string;
  details?: string;
  is_primary: boolean;
};

export type Products = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  material: string;
  phone_type: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type ProductOrder = {
  id: number;
  name: string;
  price: string;
  image: string;
};

export type OrderItem = {
  id: number;
  orderId: number;
  productId: number;
  customImageId: number | null;
  quantity: number;
  price: string;
  createdAt: string;
  updatedAt: string;
  Product: ProductOrder;
};

export type Payment = {
  id: number;
  payment_gateway: string;
  status: string;
  amount: string;
};

export type Order = {
  id: number;
  userId: number;
  addressId: number;
  status: string;
  total_price: string;
  payment_method: string;
  tracking_number: string | null;
  requestId: string;
  createdAt: string;
  updatedAt: string;
  OrderItems: OrderItem[];
  Payment: Payment;
  Address: Address;
};

export type OrdersResponse = {
  orders: Order[];
};
