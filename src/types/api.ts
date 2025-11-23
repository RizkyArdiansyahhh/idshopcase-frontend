import { product } from "@/mocks/products";

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  profile_picture: string;
  role: string;
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
  price: string;
  stock: number;
  category: string;
  createdAt: string;
  updatedAt: string;
  ProductImages: ProductImage[];
  Materials?: Material[];
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
  description: string;
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

export type CartItem = {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  price: string;
  createdAt: Date;
  updatedAt: string;
  Product: {
    id: number;
    name: string;
    description: string;
    price: string;
    stock: number;
    category: string;
    material: string | null;
    variation: string | null;
    phone_type: string | null;
    createdAt: string;
    updatedAt: string;
    image: string;
  };
  CustomImage: null;
  Material: Material | null;
  Variant: Variant | null;
  PhoneType: PhoneType | null;
};

export interface CheckoutData {
  productId: number;
  quantity: number;
  materialId: number | null;
  materialName: string | null;
  phoneTypeId: number | null;
  phoneTypeName: string | null;
  variantId: number | null;
  variantName: string | null;
  cartId?: number;
  price?: number;
}

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
  OrderItems: Array<{
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
      ProductImages: ProductImage[];
      CustomImage: Array<{
        id: number;
        image_url: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        processed_url: any;
      }>;
      PhoneType: {
        id: number;
        model: string;
      };
      Material: {
        id: number;
        name: string;
      };
      Variant: {
        id: number;
        name: string;
      };
    };
    Payment: {
      id: number;
      payment_gateway: string;
      status: string;
      amount: string;
    };
    Address: Address;
  }>;
};
