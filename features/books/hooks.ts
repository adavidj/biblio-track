// Auto-generated hooks
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import {
  booksControllerFindAll,
  booksControllerCreate,
  booksControllerExternalSearch,
  booksControllerFindOne,
  booksControllerUpdate,
  booksControllerRemove,
  booksControllerGetReadingInfo,
  booksControllerImportBook,
  booksControllerImportByExternalId,
  booksControllerUpdateProgress,
  booksControllerUploadFile,
  booksControllerUploadCover
} from './api';
import type { CreateBookDto, UpdateBookDto, ImportBookDto, ImportByExternalIdDto, UpdateProgressDto } from './types';

// Query Hooks

export const useBooksControllerFindAll = (params?: { page?: number; limit?: number; search?: string; status?: 'TO_READ' | 'IN_PROGRESS' | 'FINISHED'; genreId?: string }) => {
  return useQuery({
    queryKey: queryKeys.books.list(params),
    queryFn: () => booksControllerFindAll(params),
  });
};

export const useBooksControllerExternalSearch = (params?: { q?: string }) => {
  return useQuery({
    queryKey: queryKeys.books.list(params),
    queryFn: () => booksControllerExternalSearch(params),
  });
};

export const useBooksControllerFindOne = (id: string) => {
  return useQuery({
    queryKey: queryKeys.books.detail(id),
    queryFn: () => booksControllerFindOne(id),
    enabled: !!(id),
  });
};

export const useBooksControllerGetReadingInfo = (id: string) => {
  return useQuery({
    queryKey: queryKeys.books.detail(id),
    queryFn: () => booksControllerGetReadingInfo(id),
    enabled: !!(id),
  });
};


// Mutation Hooks

export const useBooksControllerCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBookDto) => booksControllerCreate(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.books.all });
    },
  });
};

export const useBooksControllerUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: UpdateBookDto & { id: string }) => booksControllerUpdate(vars.id, vars),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.books.all });
    },
  });
};

export const useBooksControllerRemove = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: { id: string }) => booksControllerRemove(vars.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.books.all });
    },
  });
};

export const useBooksControllerImportBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ImportBookDto) => booksControllerImportBook(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.books.all });
    },
  });
};

export const useBooksControllerImportByExternalId = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ImportByExternalIdDto) => booksControllerImportByExternalId(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.books.all });
    },
  });
};

export const useBooksControllerUpdateProgress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: UpdateProgressDto & { id: string }) => booksControllerUpdateProgress(vars.id, vars),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.books.all });
    },
  });
};

export const useBooksControllerUploadFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: {

  file?: string;
} & { id: string }) => booksControllerUploadFile(vars.id, vars),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.books.all });
    },
  });
};

export const useBooksControllerUploadCover = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: {

  cover?: string;
} & { id: string }) => booksControllerUploadCover(vars.id, vars),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.books.all });
    },
  });
};

