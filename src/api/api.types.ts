export interface TokenResponse {
  token: string;
  error: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
}

export interface UserInfo {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}
