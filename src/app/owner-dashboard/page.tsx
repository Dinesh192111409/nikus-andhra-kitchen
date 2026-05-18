"use client";

import dynamic from "next/dynamic";

const OwnerDashboard = dynamic(
  () => import("../../components/admin/OwnerDashboard"),
  {
    ssr: false,
    loading: () => (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-3xl font-black text-orange-400">Loading...</h1>
      </main>
    ),
  }
);

export default function OwnerDashboardPage() {
  return <OwnerDashboard />;
}