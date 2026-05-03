export interface AuthUser {
  id: string
  email: string
  name?: string
  roles?: string[]
}

export interface AuthTokens {
  accessToken: string
  refreshToken?: string
  tokenType?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  accessToken?: string
  access_token?: string
  refreshToken?: string
  refresh_token?: string
  token?: string
  tokenType?: string
  token_type?: string
  user?: AuthUser
}
