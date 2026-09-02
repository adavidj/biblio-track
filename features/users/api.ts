// Auto-generated API functions
import api from '@/lib/axios';
import type { UpdateProfileDto } from './types';

/**
 * Get current user profile
 */
export const usersControllerGetProfile = async (): Promise<any> => {
  const { data } = await api.get<any>(`/users/me`);
  return data;
};

/**
 * Update current user profile
 */
export const usersControllerUpdateProfile = async (payload: UpdateProfileDto): Promise<any> => {
  const { data } = await api.patch<any>(`/users/me`, payload);
  return data;
};

/**
 * Upload avatar image
 */
export const usersControllerUploadAvatar = async (payload: {

  avatar?: string;
}): Promise<any> => {
  const { data } = await api.patch<any>(`/users/me/avatar`, payload);
  return data;
};

/**
 * Remove profile avatar
 */
export const usersControllerRemoveAvatar = async (): Promise<any> => {
  const { data } = await api.delete<any>(`/users/me/avatar`);
  return data;
};

