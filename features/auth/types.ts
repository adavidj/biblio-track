// Auto-generated TypeScript types

export interface RegisterDto {

  firstName: string;

  lastName: string;

  email: string;

  password: string;
}

export interface VerifyOtpDto {

  email: string;

  code: string;
}

export interface LoginDto {

  email: string;

  password: string;
}

export interface RefreshTokenDto {

  refreshToken: string;
}

export interface ForgotPasswordDto {

  email: string;
}

export interface ResetPasswordDto {

  email: string;

  code: string;

  newPassword: string;
}

export interface UpdatePasswordDto {

  currentPassword: string;

  newPassword: string;
}

