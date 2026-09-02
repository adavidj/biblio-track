// Auto-generated API functions
import api from '@/lib/axios';
import type { CreateSessionDto } from './types';

/**
 * List reading sessions for a book
 */
export const readingSessionsControllerFindByBook = async (bookId: string): Promise<any> => {
  const { data } = await api.get<any>(`/books/${bookId}/sessions`);
  return data;
};

/**
 * Log a reading session
 */
export const readingSessionsControllerCreate = async (bookId: string, payload: CreateSessionDto): Promise<any> => {
  const { data } = await api.post<any>(`/books/${bookId}/sessions`, payload);
  return data;
};

/**
 * Delete a reading session
 */
export const readingSessionsControllerRemove = async (id: string): Promise<any> => {
  const { data } = await api.delete<any>(`/sessions/${id}`);
  return data;
};

