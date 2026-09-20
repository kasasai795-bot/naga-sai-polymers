"use client";

import Link from "next/link";
import {
  Package,
  ShoppingCart,
  PlusCircle,
  LayoutDashboard,
} from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      title: "Add Product",
      description: "Create a new product",
      href: "/admin/products",
      icon: Package,
      color: "bg-blue-500",
    },
    {
      title: "View Orders",
      description: "Manage customer orders",
      href: "/admin/orders",
      icon: ShoppingCart,
      color: "bg-green-500",
    },
    {
      title: "New Order",
      description: "Create a customer order",
      href: "/admin/orders",
      icon: PlusCircle,
      color: "bg-purple-500",
    },
    {
      title: "Dashboard",
      description: "Refresh dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-6">
        ⚡ Quick Actions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="border rounded-xl p-5 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            >
              <div
                className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4`}
              >
                <Icon size={24} />
              </div>

              <h3 className="font-semibold text-lg">
                {action.title}
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                {action.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}