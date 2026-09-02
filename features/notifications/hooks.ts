// Auto-generated hooks
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import {
  notificationsControllerFindAll,
  notificationsControllerMarkAsRead,
  notificationsControllerMarkAllAsRead
} from './api';

// Query Hooks

export const useNotificationsControllerFindAll = () => {
  return useQuery({
    queryKey: queryKeys.notifications.lists(),
    queryFn: notificationsControllerFindAll,
  });
};


// Mutation Hooks

export const useNotificationsControllerMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: { id: string }) => notificationsControllerMarkAsRead(vars.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all });
    },
  });
};

export const useNotificationsControllerMarkAllAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationsControllerMarkAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all });
    },
  });
};

