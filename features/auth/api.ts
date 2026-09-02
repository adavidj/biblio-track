// Auto-generated API functions
import api from '@/lib/axios';
import type { RegisterDto, VerifyOtpDto, LoginDto, RefreshTokenDto, ForgotPasswordDto, ResetPasswordDto, UpdatePasswordDto } from './types';

/**
 * Create a new account
 */
export const authControllerRegister = async (payload: RegisterDto): Promise<any> => {
  const { data } = await api.post<any>(`/auth/register`, payload);
  return data;
};

/**
 * Verify email with OTP code
 */
export const authControllerVerifyOtp = async (payload: VerifyOtpDto): Promise<any> => {
  const { data } = await api.post<any>(`/auth/verify-otp`, payload);
  return data;
};

/**
 * Resend OTP verification code
 */
export const authControllerResendOtp = async (): Promise<any> => {
  const { data } = await api.post<any>(`/auth/resend-otp`);
  return data;
};

/**
 * Login with email and password
 */
export const authControllerLogin = async (payload: LoginDto): Promise<any> => {
  const { data } = await api.post<any>(`/auth/login`, payload);
  return data;
};

/**
 * Refresh access token
 */
export const authControllerRefresh = async (payload: RefreshTokenDto): Promise<any> => {
  const { data } = await api.post<any>(`/auth/refresh`, payload);
  return data;
};

/**
 * Request password reset
 */
export const authControllerForgotPassword = async (payload: ForgotPasswordDto): Promise<any> => {
  const { data } = await api.post<any>(`/auth/forgot-password`, payload);
  return data;
};

/**
 * Reset password with code
 */
export const authControllerResetPassword = async (payload: ResetPasswordDto): Promise<any> => {
  const { data } = await api.post<any>(`/auth/reset-password`, payload);
  return data;
};

/**
 * Update password (authenticated)
 */
export const authControllerUpdatePassword = async (payload: UpdatePasswordDto): Promise<any> => {
  const { data } = await api.patch<any>(`/auth/update-password`, payload);
  return data;
};

