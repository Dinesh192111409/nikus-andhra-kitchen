import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "../lib/firebase";

export type FirebaseOrderStatus =
  | "Pending"
  | "Accepted"
  | "Rejected"
  | "Preparing"
  | "Served";

export type FirebaseOrder = {
  id?: string;
  tableId: string;
  customer: string;
  phone: string;
  orderType: "Dine In" | "Pickup";
  items: string[];
  subtotal: number;
  gst: number;
  packingCharge: number;
  total: number;
  payment: string;
  paymentStatus: "Paid" | "Cash Pending";
  status: FirebaseOrderStatus;
  createdAt?: any;
};

export const createFirebaseOrder = async (
  order: Omit<FirebaseOrder, "id" | "createdAt">,
) => {
  const docRef = await addDoc(collection(db, "orders"), {
    ...order,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
};

export const listenToOrders = (callback: (orders: FirebaseOrder[]) => void) => {
  const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));

  return onSnapshot(q, (snapshot) => {
    const orders = snapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...docItem.data(),
    })) as FirebaseOrder[];

    callback(orders);
  });
};

export const listenToSingleOrder = (
  orderId: string,
  callback: (order: FirebaseOrder | null) => void,
) => {
  return onSnapshot(doc(db, "orders", orderId), (snapshot) => {
    if (!snapshot.exists()) {
      callback(null);
      return;
    }

    callback({
      id: snapshot.id,
      ...snapshot.data(),
    } as FirebaseOrder);
  });
};

export const updateFirebaseOrderStatus = async (
  orderId: string,
  status: FirebaseOrderStatus,
) => {
  await updateDoc(doc(db, "orders", orderId), {
    status,
  });
};
export const deleteFirebaseOrder = async (orderId: string) => {
  await deleteDoc(doc(db, "orders", orderId));
};
