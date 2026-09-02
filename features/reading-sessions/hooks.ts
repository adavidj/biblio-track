// Auto-generated hooks
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import {
  readingSessionsControllerFindByBook,
  readingSessionsControllerCreate,
  readingSessionsControllerRemove
} from './api';
import type { CreateSessionDto } from './types';

// Query Hooks

export const useReadingSessionsControllerFindByBook = (bookId: string) => {
  return useQuery({
    queryKey: queryKeys.readingSessions.detail(bookId),
    queryFn: () => readingSessionsControllerFindByBook(bookId),
    enabled: !!(bookId),
  });
};


// Mutation Hooks

export const useReadingSessionsControllerCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: CreateSessionDto & { bookId: string }) => readingSessionsControllerCreate(vars.bookId, vars),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.readingSessions.all });
    },
  });
};

export const useReadingSessionsControllerRemove = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: { id: string }) => readingSessionsControllerRemove(vars.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.readingSessions.all });
    },
  });
};

