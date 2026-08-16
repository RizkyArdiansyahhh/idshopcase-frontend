export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  profile_picture: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type Address = {
  id: string;
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
  id: string;
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
  id: string;
  brand: string;
  model: string;
};

export type Material = {
  id: string;
  name: string;
  description: string;
};

export type Variant = {
  id: string;
  name: string;
  price: string;
  stock: number;
  max_images: number;
  createdAt: string;
  updatedAt: string;
};

export type ProductImage = {
  id: string;
  imageUrl: string;
  isPrimary: boolean;
};

export type ProductOrder = {
  id: string;
  name: string;
  price: string;
  ProductImages: ProductImage[];
};

export type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
  customImageId: string | null;
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
  id: string;
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
  id: string;
  userId: string;
  addressId: string;
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
    id: string;
    name: string;
    updatedAt: string;
  };
  Variant: Variant;
  cartId: string;
  createdAt: string;
  id: string;
  phoneTypeId: string;
  price: string;
  productId: string;
  quantity: number;
  updatedAt: string;
  variantId: string;
};

export interface CheckoutData {
  productId: string;
  quantity: number;
  phoneTypeId: string | null;
  phoneTypeName: string | null;
  variant: {
    id: string;
    name: string;
    price: string;
    stock: number;
    max_images: number;
  };
  cartId?: string;
}

export type OrderItemAdmin = {
  id: string;
  orderId: string;
  productId: string;
  customImageId: string | null;
  quantity: number;
  price: string;
  phoneTypeId: string | null;
  materialId: string | null;
  variantId: string | null;
  createdAt: string;
  updatedAt: string;
  Product: {
    id: string;
    name: string;
    price: string;
    category: string;
    ProductImages: ProductImage[];
  };
  PhoneType: {
    id: string;
    model: string;
  };

  Variant: {
    id: string;
    name: string;
    price: string;
    stock: number;
    max_images: number;
  };
  CustomImages: Array<{
    id: string;
    image_url: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    processed_url: any;
  }>;
};

export type OrderAdmin = {
  id: string;
  userId: string;
  addressId: string;
  status: string;
  total_price: string;
  payment_method: string;
  tracking_number: string | null;
  requestId: string;
  createdAt: string;
  updatedAt: string;
  User: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  OrderItems: OrderItemAdmin[];
  Payment: {
    id: string;
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
  id: string;
  quantity: number;
  price: number;
  subtotal: number;
  variantId: string;
};
