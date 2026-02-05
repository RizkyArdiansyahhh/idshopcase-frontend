export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  profile_picture: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

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

export type Product = {
  id: number;
  name: string;
  description: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  ProductImages: ProductImage[];
  Variants?: Variant[];
  PhoneTypes?: PhoneType[];
};

export type PhoneType = {
  id: number;
  brand: string;
  model: string;
};

export type Material = {
  id: number;
  name: string;
  description: string;
};

export type Variant = {
  id: number;
  name: string;
  price: string;
  stock: number;
  max_images: number;
  createdAt: string;
  updatedAt: string;
};

export type ProductImage = {
  id: number;
  imageUrl: string;
  isPrimary: boolean;
};

export type ProductOrder = {
  id: number;
  name: string;
  price: string;
  ProductImages: ProductImage[];
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
  Variant: Variant;
  PhoneType: PhoneType;
  CustomImage: ProductImage | null;
};

export type Payment = {
  id: number;
  payment_gateway: string;
  status: string;
  amount: string;
  createdAt: string;
  updatedAt: string;
  request_id: string;
  transaction_id: string | null;
  payment_url: string;
  expired_at: string;
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

export type CartItem = {
  PhoneType: PhoneType;
  Product: {
    PhoneTypes: PhoneType[];
    ProductImages: ProductImage[];
    category: string;
    createdAt: string;
    description: string;
    id: number;
    name: string;
    updatedAt: string;
  };
  Variant: Variant;
  cartId: number;
  createdAt: string;
  id: number;
  phoneTypeId: number;
  price: string;
  productId: number;
  quantity: number;
  updatedAt: string;
  variantId: number;
};

export interface CheckoutData {
  productId: number;
  quantity: number;
  phoneTypeId: number | null;
  phoneTypeName: string | null;
  variant: {
    id: number;
    name: string;
    price: string;
    stock: number;
    max_images: number;
  };
  cartId?: number;
}

export type OrderItemAdmin = {
  id: number;
  orderId: number;
  productId: number;
  customImageId: number | null;
  quantity: number;
  price: string;
  phoneTypeId: number | null;
  materialId: number | null;
  variantId: number | null;
  createdAt: string;
  updatedAt: string;
  Product: {
    id: number;
    name: string;
    price: string;
    category: string;
    ProductImages: ProductImage[];
  };
  PhoneType: {
    id: number;
    model: string;
  };

  Variant: {
    id: number;
    name: string;
    price: string;
    stock: number;
    max_images: number;
  };
  CustomImages: Array<{
    id: number;
    image_url: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    processed_url: any;
  }>;
};

export type OrderAdmin = {
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
  User: {
    id: number;
    name: string;
    email: string;
    phone: string;
  };
  OrderItems: OrderItemAdmin[];
  Payment: {
    id: number;
    payment_gateway: string;
    status: string;
    amount: string;
  };
  Address: Address;
};

export type OrderSummary = {
  items: OrderItemSummary[];
  shipping: {
    courier: string;
    service: string;
    cost: number;
  };
  subtotal: number;
  total: number;
  buyNow: boolean;
};

type OrderItemSummary = {
  id: number;
  quantity: number;
  price: number;
  subtotal: number;
  variantId: number;
};
