export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  profile_picture: string;
  role: "USER" | "ADMIN";
  createdAt: string;
  updatedAt: string;
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
  userId: number;
  recipient_name: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  sub_district: string;
  postal_code: string;
  detail?: string;
  is_primary: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Orders = {
  id: number;
  userId: number;
  addressId: number;
  status: "pending" | "shipped" | "completed";
  total_price: number;
  payment_method: string;
  tracking_number: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
};

export type Order = {
  id: number;
  userId: number;
  addressId: number;
  status: string;
  total_price: number;
  payment_method: string;
  tracking_number: string;
  createdAt: string;
  updatedAt: string;
  paymentId: number;
  items: OrderItem[];
};

export type OrderItem = {
  id: number;
  productId: number;
  customImageUrl: string | null;
  quantity: number;
  price: number;
};

export type Productss = {
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
