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

export type Product = {
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
