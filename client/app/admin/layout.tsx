"use client";

import Link from "next/link";
import {
  usePathname,
  useRouter,
} from "next/navigation";
import {
  useEffect,
  useState,
} from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Don't protect login page
    if (pathname === "/admin/login") {
      setAuthorized(true);
      return;
    }

    const token = localStorage.getItem("adminToken");

    if (!token) {
      router.replace("/admin/login");
      return;
    }

    setAuthorized(true);
  }, [pathname, router]);

  const logout = () => {
    localStorage.removeItem("adminToken");
    router.replace("/admin/login");
  };

  if (!authorized) {
    return null;
  }

 const menu = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: "🏠",
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: "📦",
  },
  {
    name: "Customers",
    href: "/admin/customers",
    icon: "👥",
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: "📋",
  },
  {
    name: "Production",
    href: "/admin/production",
    icon: "🏭",
  },
  {
    name: "Inventory",
    href: "/admin/inventory",
    icon: "📦",
  },
  {
    name: "Reports",
    href: "/admin/reports",
    icon: "📊",
  },
  {
  name: "Company Settings",
  href: "/admin/settings",
  icon: "⚙️",
},
  {
    name: "Change Password",
    href: "/admin/settings/change-password",
    icon: "🔒",
  },
];

  return (
    <div className="min-h-screen flex bg-gray-100">

      <aside className="w-64 bg-gray-900 text-white flex flex-col">

        <div className="text-2xl font-bold text-center py-6 border-b border-gray-700">
          Naga Sai Polymers
        </div>

        <nav className="flex-1 p-4 space-y-2">

          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-lg px-4 py-3 transition ${
                pathname === item.href
                  ? "bg-blue-600"
                  : "hover:bg-gray-800"
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.name}
            </Link>
          ))}

        </nav>

        <div className="p-4 border-t border-gray-700">

          <button
            onClick={logout}
            className="w-full bg-red-600 hover:bg-red-700 rounded-lg py-3"
          >
            Logout
          </button>

        </div>

      </aside>

      <main className="flex-1 p-8">
        {children}
      </main>

    </div>
  );
}