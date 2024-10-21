"use client";

import { NotifcationBody } from "@/helpers/commons/client";
import { useState, useEffect } from "react";

function NotificationComponent({}: {}) {

  const [notifications, setNotifications] = useState<NotifcationBody[]>([]);

  useEffect(() => {
    // Listen for credit usage updates
    const handleNotification = ({ detail }: { detail: NotifcationBody }) => {
      setNotifications((prev) => [...prev, detail]);
      setTimeout(() => {
        setNotifications((prev) => prev.slice(1)); //to remove the notification after 5 seconds
      }, 5000);
    }

    window.addEventListener(
      "quickcv:newNotification" as any,
      handleNotification
    );

    return () => {
      window.removeEventListener(
        "quickcv:newNotification" as any,
        handleNotification
      );
    };
  }, []);

  return (
    <div className="p-2 px-4 fixed top-5 right-3 z-50">
      {notifications.map((notification, index) => (
        <div
          key={index}
          className={`p-2 rounded-md mb-2 text-white ${
            notification.type === "error"
              ? "bg-red-500"
              : notification.type === "success"
              ? "bg-green-500"
              : "bg-blue-500"
          }`}
        >
          {notification.message}
        </div>
      ))}
    </div>
  );
}


export default NotificationComponent;