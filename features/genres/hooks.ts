// Auto-generated hooks
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import {
  genresControllerFindAll,
  genresControllerCreate,
  genresControllerUpdate,
  genresControllerRemove
} from './api';
import type { CreateGenreDto } from './types';

// Query Hooks

export const useGenresControllerFindAll = () => {
  return useQuery({
    queryKey: queryKeys.genres.lists(),
    queryFn: genresControllerFindAll,
  });
};


// Mutation Hooks

export const useGenresControllerCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateGenreDto) => genresControllerCreate(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.genres.all });
    },
  });
};

export const useGenresControllerUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: CreateGenreDto & { id: string }) => genresControllerUpdate(vars.id, vars),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.genres.all });
    },
  });
};

export const useGenresControllerRemove = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: { id: string }) => genresControllerRemove(vars.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.genres.all });
    },
  });
};

