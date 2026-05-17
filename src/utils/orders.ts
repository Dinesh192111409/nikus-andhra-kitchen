import { getStorageData, setStorageData } from "./storage";

export type CustomerOrder = {
  id: string;
  type: "specials" | "delivery" | "reservation";
  customer: string;
  phone: string;
  items: string[];
  subtotal: number;
  gst: number;
  deliveryCharge?: number;
  total: number;
  payment: string;
  date: string;
};

export function saveCustomerOrder(order: CustomerOrder) {
  const oldOrders = getStorageData<CustomerOrder[]>("nikus_orders", []);

  const updatedOrders = [order, ...oldOrders];

  setStorageData("nikus_orders", updatedOrders);
}