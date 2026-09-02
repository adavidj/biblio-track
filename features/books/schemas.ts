// Auto-generated validation schemas
import { z } from 'zod';
export const createBookDtoSchema = z.object({
  title: z.string(),
  author: z.string(),
  description: z.string().optional().nullable(),
  fileUrl: z.string().optional().nullable(),
  totalPages: z.number().optional().nullable(),
  isbn: z.string().optional().nullable(),
  publisher: z.string().optional().nullable(),
  publishedYear: z.number().optional().nullable(),
  language: z.string().optional().nullable(),
  genreId: z.string().optional().nullable(),
  status: z.enum(["TO_READ", "IN_PROGRESS", "FINISHED"]).optional().nullable(),
});

export const updateBookDtoSchema = z.object({
  title: z.string().optional().nullable(),
  author: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  coverUrl: z.string().optional().nullable(),
  fileUrl: z.string().optional().nullable(),
  totalPages: z.number().optional().nullable(),
  isbn: z.string().optional().nullable(),
  publisher: z.string().optional().nullable(),
  publishedYear: z.number().optional().nullable(),
  language: z.string().optional().nullable(),
  genreId: z.string().optional().nullable(),
  status: z.enum(["TO_READ", "IN_PROGRESS", "FINISHED"]).optional().nullable(),
});

export const importBookDtoSchema = z.object({
  title: z.string(),
  author: z.string(),
  description: z.string().optional().nullable(),
  coverUrl: z.string().optional().nullable(),
  totalPages: z.number().optional().nullable(),
  isbn: z.string().optional().nullable(),
  publisher: z.string().optional().nullable(),
  publishedYear: z.number().optional().nullable(),
  language: z.string().optional().nullable(),
  externalSourceId: z.string().optional().nullable(),
  externalSource: z.string().optional().nullable(),
  genreId: z.string().optional().nullable(),
});

export const importByExternalIdDtoSchema = z.object({
  externalSourceId: z.string(),
  externalSource: z.enum(["open_library", "google_books"]),
  genreId: z.string().optional().nullable(),
});

export const updateProgressDtoSchema = z.object({
  currentPage: z.number(),
});

