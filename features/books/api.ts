// Auto-generated API functions
import api from '@/lib/axios';
import type { CreateBookDto, UpdateBookDto, ImportBookDto, ImportByExternalIdDto, UpdateProgressDto } from './types';

/**
 * List all books with filters
 */
export const booksControllerFindAll = async (params?: { page?: number; limit?: number; search?: string; status?: 'TO_READ' | 'IN_PROGRESS' | 'FINISHED'; genreId?: string }): Promise<any> => {
  const { data } = await api.get<any>(`/books`, { params });
  return data;
};

/**
 * Add a book manually
 */
export const booksControllerCreate = async (payload: CreateBookDto): Promise<any> => {
  const { data } = await api.post<any>(`/books`, payload);
  return data;
};

/**
 * Search books externally (Open Library + Google Books)
 */
export const booksControllerExternalSearch = async (params?: { q?: string }): Promise<any> => {
  const { data } = await api.get<any>(`/books/external-search`, { params });
  return data;
};

/**
 * Get book details
 */
export const booksControllerFindOne = async (id: string): Promise<any> => {
  const { data } = await api.get<any>(`/books/${id}`);
  return data;
};

/**
 * Update a book
 */
export const booksControllerUpdate = async (id: string, payload: UpdateBookDto): Promise<any> => {
  const { data } = await api.patch<any>(`/books/${id}`, payload);
  return data;
};

/**
 * Delete a book
 */
export const booksControllerRemove = async (id: string): Promise<any> => {
  const { data } = await api.delete<any>(`/books/${id}`);
  return data;
};

/**
 * Get reading info for a book
 */
export const booksControllerGetReadingInfo = async (id: string): Promise<any> => {
  const { data } = await api.get<any>(`/books/${id}/read`);
  return data;
};

/**
 * Import a book from external source
 */
export const booksControllerImportBook = async (payload: ImportBookDto): Promise<any> => {
  const { data } = await api.post<any>(`/books/import`, payload);
  return data;
};

/**
 * Import a book by external ID (auto-fetch details)
 */
export const booksControllerImportByExternalId = async (payload: ImportByExternalIdDto): Promise<any> => {
  const { data } = await api.post<any>(`/books/import-external`, payload);
  return data;
};

/**
 * Update reading progress
 */
export const booksControllerUpdateProgress = async (id: string, payload: UpdateProgressDto): Promise<any> => {
  const { data } = await api.patch<any>(`/books/${id}/progress`, payload);
  return data;
};

/**
 * Upload a book file (PDF/EPUB)
 */
export const booksControllerUploadFile = async (id: string, payload: {

  file?: string;
}): Promise<any> => {
  const { data } = await api.post<any>(`/books/${id}/file`, payload, { headers: { 'Content-Type': 'multipart/form-data' } });
  return data;
};

/**
 * Upload a book cover image
 */
export const booksControllerUploadCover = async (id: string, payload: {

  cover?: string;
}): Promise<any> => {
  const { data } = await api.post<any>(`/books/${id}/cover`, payload, { headers: { 'Content-Type': 'multipart/form-data' } });
  return data;
};

