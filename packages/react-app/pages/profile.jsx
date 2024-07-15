"use client";

import React from "react";

const orders = [
  {
    id: 1,
    date: "2024-06-01",
    items: ["Product 1", "Product 2"],
    total: "$150",
  },
  { id: 2, date: "2024-06-15", items: ["Product 3"], total: "$200" },
  // Add more orders here
];

const ProfilePage = () => {
  const accountStatus = "Basic"; // Change to 'Premium' for premium users

  return (
    <div className=" w-full h-screen">
      <div className="flex flex-col gap-4 md:flex-row md:gap-10 justify-start w-full mt-2">
        <div className="border border-orange-300 rounded-lg shadow-sm p-5">
          <h1 className="orange_gradient text-3xl font-bold mb-6">Profile</h1>
          <div className="flex flex-col mb-6">
            <h2 className="text-md font-semibold mb-2">Name: username</h2>
            <h2 className="text-md font-semibold mb-2">Date joined: 02/8/24</h2>
            <h2 className="text-md font-semibold mb-2">
              Account Status: {accountStatus}
            </h2>
            <button className="mt-4 border bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 rounded-3xl py-2 px-6 text-[12px] text-white">
              Upgrade Account
            </button>

            <button className="justify-start  mt-4 px-4 py-2 bg-red-500 text-white rounded-3xl hover:bg-red-600">
              Sign Out
            </button>
          </div>
        </div>

        <div className="border border-orange-300 rounded-lg shadow-sm p-5 mb-6">
          <h2 className="orange_gradient text-2xl font-semibold mb-2">
            Order History
          </h2>
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-4 border border-orange-300 rounded-lg shadow-sm"
              >
                <h3 className="text-lg font-bold">Order #{order.id}</h3>
                <p>Date: {order.date}</p>
                <p>Items: {order.items.join(", ")}</p>
                <p>Total: {order.total}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
