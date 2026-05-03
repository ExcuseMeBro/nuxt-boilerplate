import { jwtDecode } from 'jwt-decode'

interface JwtPayload {
  exp?: number
  iat?: number
  sub?: string
  [key: string]: unknown
}

export const readJwtPayload = <T extends JwtPayload = JwtPayload>(token: string) =>
  jwtDecode<T>(token)

export const isJwtExpired = (token?: string | null, skewSeconds = 30) => {
  if (!token) {
    return true
  }

  try {
    const payload = readJwtPayload(token)

    if (!payload.exp) {
      return false
    }

    return payload.exp * 1000 <= Date.now() + skewSeconds * 1000
  } catch {
    return true
  }
}
