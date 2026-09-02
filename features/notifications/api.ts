// Auto-generated API functions
import api from '@/lib/axios';
/**
 * List all notifications
 */
export const notificationsControllerFindAll = async (): Promise<any> => {
  const { data } = await api.get<any>(`/notifications`);
  return data;
};

/**
 * Mark notification as read
 */
export const notificationsControllerMarkAsRead = async (id: string): Promise<any> => {
  const { data } = await api.patch<any>(`/notifications/${id}/read`);
  return data;
};

/**
 * Mark all notifications as read
 */
export const notificationsControllerMarkAllAsRead = async (): Promise<any> => {
  const { data } = await api.patch<any>(`/notifications/read-all`);
  return data;
};

