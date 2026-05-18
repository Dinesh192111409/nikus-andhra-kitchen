export type OrderStatus =
  | "Pending"
  | "Accepted"
  | "Rejected"
  | "Completed";

export type CustomerOrder = {
  id: string;
  type: "delivery" | "reservation" | "specials";
  customer: string;
  phone: string;
  items: string[];
  subtotal: number;
  gst: number;
  deliveryCharge?: number;
  total: number;
  payment: string;
  status: OrderStatus;
  date: string;
};

export function getOrders(): CustomerOrder[] {
  if (typeof window === "undefined") return [];

  const orders = localStorage.getItem("nikus_orders");

  return orders ? JSON.parse(orders) : [];
}

export function saveOrder(order: CustomerOrder) {
  const oldOrders = getOrders();

  const updatedOrders = [order, ...oldOrders];

  localStorage.setItem(
    "nikus_orders",
    JSON.stringify(updatedOrders)
  );
}

export function updateOrderStatus(
  id: string,
  status: OrderStatus
) {
  const orders = getOrders();

  const updatedOrders = orders.map((order) =>
    order.id === id
      ? {
          ...order,
          status,
        }
      : order
  );

  localStorage.setItem(
    "nikus_orders",
    JSON.stringify(updatedOrders)
  );
}