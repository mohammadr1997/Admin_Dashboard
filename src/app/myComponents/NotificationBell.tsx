"use client";
import { useState, useEffect } from "react";
import { Bell, BellOff } from "lucide-react";

type Notification = {
  id: number;
  message: string;
  read: boolean;
};

interface NotificationBellProps {
  enabled: boolean;
}


export default function NotificationBell({ enabled }: NotificationBellProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);

 
  useEffect(() => {
    const stored = localStorage.getItem("notifications");
    if (stored) {
      setNotifications(JSON.parse(stored));
    } else {
      const initial: Notification[] = [];
      setNotifications(initial);
      localStorage.setItem("notifications", JSON.stringify(initial));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  if (!enabled) {
    return <BellOff   className="cursor-not-allowed  mt-5 opacity-85"
        color="gray"/>
   
  }else{
  return (
    <div className="relative">
     
      <Bell
        className="cursor-pointer  mt-5"
        color="gray"
        onClick={() => setOpen(!open)}
      />

     
      {unreadCount > 0 && (
        <span className="absolute top-3 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
      )}

     
      {open && (
        <div className="absolute top-14 right-0 w-80 bg-white dark:bg-[#1e293b] text-black dark:text-white shadow-xl rounded-xl p-3 z-50">
          <h3 className="font-bold mb-2">Notifications</h3>
          {notifications.length > 0 ? (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => markAsRead(n.id)}
                className={`p-2 mb-1 rounded-lg cursor-pointer ${
                  n.read
                    ? "bg-gray-100 dark:bg-gray-700"
                    : "bg-blue-100 dark:bg-blue-900"
                }`}
              >
                {n.message}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No notifications
            </p>
          )}
        </div>
      )}
    </div>
  );}
}
