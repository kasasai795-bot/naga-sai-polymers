"use client";

import { useEffect, useState } from "react";
import API_BASE_URL from "@/lib/api";

type Notification = {
  id: number;
  title: string;
  message: string;
  type: string;
  priority: string;
  isRead: boolean;
  actionUrl?: string;
};

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);

  async function fetchNotifications() {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch(
        `${API_BASE_URL}/notifications`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error(data);
        setNotifications([]);
        return;
      }

      setNotifications(
        Array.isArray(data) ? data : []
      );
    } catch (err) {
      console.error(err);
      setNotifications([]);
    }
  }

  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(
      fetchNotifications,
      10000
    );

    return () => clearInterval(interval);
  }, []);

  const unread = Array.isArray(notifications)
    ? notifications.filter((n) => !n.isRead).length
    : 0;

  return (
    <div className="relative">

      <button
        onClick={() => setOpen(!open)}
        className="relative text-2xl"
      >
        🔔

        {unread > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-96 bg-white rounded-xl shadow-xl border z-50">

          <div className="p-4 border-b font-bold">
            Notifications
          </div>

          {notifications.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No Notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b ${
                  notification.isRead
                    ? ""
                    : "bg-blue-50"
                }`}
              >
                <h3 className="font-semibold">
                  {notification.title}
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  {notification.message}
                </p>

                <div className="mt-2 text-xs text-gray-400">
                  {notification.priority}
                </div>
              </div>
            ))
          )}

        </div>
      )}

    </div>
  );
}