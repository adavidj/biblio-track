// Auto-generated hooks
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import {
  statsControllerGetOverview,
  statsControllerGetProgress
} from './api';

// Query Hooks

export const useStatsControllerGetOverview = () => {
  return useQuery({
    queryKey: queryKeys.stats.lists(),
    queryFn: statsControllerGetOverview,
  });
};

export const useStatsControllerGetProgress = () => {
  return useQuery({
    queryKey: queryKeys.stats.lists(),
    queryFn: statsControllerGetProgress,
  });
};


// Mutation Hooks

