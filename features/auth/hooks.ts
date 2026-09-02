// Auto-generated hooks
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import {
  authControllerRegister,
  authControllerVerifyOtp,
  authControllerResendOtp,
  authControllerLogin,
  authControllerRefresh,
  authControllerForgotPassword,
  authControllerResetPassword,
  authControllerUpdatePassword
} from './api';
import type { RegisterDto, VerifyOtpDto, LoginDto, RefreshTokenDto, ForgotPasswordDto, ResetPasswordDto, UpdatePasswordDto } from './types';

// Query Hooks


// Mutation Hooks

export const useAuthControllerRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RegisterDto) => authControllerRegister(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
    },
  });
};

export const useAuthControllerVerifyOtp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: VerifyOtpDto) => authControllerVerifyOtp(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
    },
  });
};

export const useAuthControllerResendOtp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authControllerResendOtp(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
    },
  });
};

export const useAuthControllerLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginDto) => authControllerLogin(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
    },
  });
};

export const useAuthControllerRefresh = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RefreshTokenDto) => authControllerRefresh(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
    },
  });
};

export const useAuthControllerForgotPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ForgotPasswordDto) => authControllerForgotPassword(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
    },
  });
};

export const useAuthControllerResetPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ResetPasswordDto) => authControllerResetPassword(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
    },
  });
};

export const useAuthControllerUpdatePassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdatePasswordDto) => authControllerUpdatePassword(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
    },
  });
};

