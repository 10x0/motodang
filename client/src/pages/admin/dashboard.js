import React from "react";

const Dashboard = () => {
  return (
    <section className="flex h-screen p-40 gap-8">
      <a
        href="/admin/products"
        className="w-full rounded bg-gray-800 flex items-center justify-center hover:scale-105 cursor-pointer"
      >
        <p className="text-4xl text-gray-100 font-semibold">Products</p>
      </a>
      <a
        href="/admin/orders"
        className="w-full rounded bg-red-500 flex items-center justify-center hover:scale-105 cursor-pointer"
      >
        <p className="text-4xl text-gray-100 font-semibold">Orders</p>
      </a>
    </section>
  );
};

export default Dashboard;
