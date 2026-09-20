"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Package,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Factory,
  Cog,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Orders",
      href: "/admin/orders",
      icon: ClipboardList,
    },
    {
  name: "Production",
  href: "/admin/production",
  icon: Cog,
},
    {
      name: "Products",
      href: "/admin/products",
      icon: Package,
    },
    {
      name: "Customers",
      href: "/admin/customers",
      icon: Users,
    },
    {
      name: "Reports",
      href: "/admin/reports",
      icon: BarChart3,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="w-72 min-h-screen bg-slate-900 text-white flex flex-col shadow-xl">

      {/* Logo */}
      <div className="p-6 border-b border-slate-700 flex items-center gap-3">
        <Factory size={34} className="text-blue-400" />

        <div>
          <h1 className="text-xl font-bold">
            Naga Sai Polymers
          </h1>

          <p className="text-sm text-slate-400">
            Admin ERP
          </p>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all ${
                pathname === item.href
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-800 text-slate-300"
              }`}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}

      </nav>

      {/* Footer */}
      <div className="border-t border-slate-700 p-4">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-600 transition">
          <LogOut size={20} />
          Logout
        </button>
      </div>

    </aside>
  );
}