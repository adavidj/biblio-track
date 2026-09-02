// Auto-generated hooks
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import {
  usersControllerGetProfile,
  usersControllerUpdateProfile,
  usersControllerUploadAvatar,
  usersControllerRemoveAvatar
} from './api';
import type { UpdateProfileDto } from './types';

// Query Hooks

export const useUsersControllerGetProfile = () => {
  return useQuery({
    queryKey: queryKeys.users.lists(),
    queryFn: usersControllerGetProfile,
  });
};


// Mutation Hooks

export const useUsersControllerUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfileDto) => usersControllerUpdateProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
    },
  });
};

export const useUsersControllerUploadAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {

  avatar?: string;
}) => usersControllerUploadAvatar(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
    },
  });
};

export const useUsersControllerRemoveAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => usersControllerRemoveAvatar(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
    },
  });
};

