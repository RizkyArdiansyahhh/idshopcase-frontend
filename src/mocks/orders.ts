// app/account/orders/orders.ts

export type Order = {
  id: string;
  productName: string;
  amount: number;
  status: "pending" | "shipped" | "completed";
  date: string;
};

export const mockOrders: Order[] = [
  {
    id: "ORD-001",
    productName: "Sepatu Running",
    amount: 450000,
    status: "pending",
    date: "2025-09-20",
  },
  {
    id: "ORD-002",
    productName: "Kemeja Batik",
    amount: 250000,
    status: "shipped",
    date: "2025-09-21",
  },
  {
    id: "ORD-003",
    productName: "Laptop Stand",
    amount: 180000,
    status: "completed",
    date: "2025-09-15",
  },
  {
    id: "ORD-004",
    productName: "Mouse Wireless",
    amount: 120000,
    status: "pending",
    date: "2025-09-25",
  },
  {
    id: "ORD-005",
    productName: "Mouse Wireless",
    amount: 120000,
    status: "pending",
    date: "2025-09-25",
  },
  {
    id: "ORD-006",
    productName: "Mouse Wireless",
    amount: 120000,
    status: "pending",
    date: "2025-09-25",
  },
  {
    id: "ORD-007",
    productName: "Mouse Wireless",
    amount: 120000,
    status: "pending",
    date: "2025-09-25",
  },
];
