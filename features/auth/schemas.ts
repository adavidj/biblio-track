// Auto-generated validation schemas
import { z } from 'zod';
export const registerDtoSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z.string(),
});

export const verifyOtpDtoSchema = z.object({
  email: z.string(),
  code: z.string(),
});

export const loginDtoSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const refreshTokenDtoSchema = z.object({
  refreshToken: z.string(),
});

export const forgotPasswordDtoSchema = z.object({
  email: z.string(),
});

export const resetPasswordDtoSchema = z.object({
  email: z.string(),
  code: z.string(),
  newPassword: z.string(),
});

export const updatePasswordDtoSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string(),
});

