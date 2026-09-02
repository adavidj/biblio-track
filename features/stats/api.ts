// Auto-generated API functions
import api from '@/lib/axios';
/**
 * Get reading statistics overview
 */
export const statsControllerGetOverview = async (): Promise<any> => {
  const { data } = await api.get<any>(`/stats/overview`);
  return data;
};

/**
 * Get reading progress over time
 */
export const statsControllerGetProgress = async (): Promise<any> => {
  const { data } = await api.get<any>(`/stats/progress`);
  return data;
};

