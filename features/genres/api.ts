// Auto-generated API functions
import api from '@/lib/axios';
import type { CreateGenreDto } from './types';

/**
 * List all genres
 */
export const genresControllerFindAll = async (): Promise<any> => {
  const { data } = await api.get<any>(`/genres`);
  return data;
};

/**
 * Create a new genre
 */
export const genresControllerCreate = async (payload: CreateGenreDto): Promise<any> => {
  const { data } = await api.post<any>(`/genres`, payload);
  return data;
};

/**
 * Update a genre
 */
export const genresControllerUpdate = async (id: string, payload: CreateGenreDto): Promise<any> => {
  const { data } = await api.patch<any>(`/genres/${id}`, payload);
  return data;
};

/**
 * Delete a genre
 */
export const genresControllerRemove = async (id: string): Promise<any> => {
  const { data } = await api.delete<any>(`/genres/${id}`);
  return data;
};

