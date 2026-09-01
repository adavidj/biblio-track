"use client";

import { create } from "zustand";
import { fakeNotifications } from "./fake-data";

type Notification = (typeof fakeNotifications)[number];

interface NotificationStore {
  notifications: Notification[];
  markAllAsRead: () => void;
  markAsRead: (id: string) => void;
  removeNotification: (id: string) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [...fakeNotifications],
  markAllAsRead: () => set((state) => ({ notifications: state.notifications.map((notification) => ({ ...notification, isRead: true })) })),
  markAsRead: (id) => set((state) => ({ notifications: state.notifications.map((notification) => notification.id === id ? { ...notification, isRead: true } : notification) })),
  removeNotification: (id) => set((state) => ({ notifications: state.notifications.filter((notification) => notification.id !== id) })),
}));
