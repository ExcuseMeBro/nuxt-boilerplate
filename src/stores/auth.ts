import type { AuthResponse, AuthTokens, AuthUser, LoginCredentials } from '~/types/auth'
import { isJwtExpired } from '~/utils/jwt'

const authCookieOptions = {
  sameSite: 'lax' as const,
  secure: import.meta.env.PROD,
  path: '/'
}

const normalizeTokens = (response: AuthResponse): AuthTokens => {
  const accessToken = response.accessToken ?? response.access_token ?? response.token
  const refreshToken = response.refreshToken ?? response.refresh_token
  const tokenType = response.tokenType ?? response.token_type ?? 'Bearer'

  if (!accessToken) {
    throw new Error('Access token missing in auth response')
  }

  return {
    accessToken,
    refreshToken,
    tokenType
  }
}

export const useAuthStore = defineStore('auth', () => {
  const config = useRuntimeConfig()
  const accessToken = useCookie<string | null>('access_token', authCookieOptions)
  const refreshToken = useCookie<string | null>('refresh_token', {
    ...authCookieOptions,
    maxAge: 60 * 60 * 24 * 30
  })
  const tokenType = useCookie<string>('token_type', {
    ...authCookieOptions,
    default: () => 'Bearer'
  })
  const user = useState<AuthUser | null>('auth:user', () => null)

  const isAuthenticated = computed(() => !isJwtExpired(accessToken.value))
  const canRefresh = computed(
    () => Boolean(refreshToken.value) && !isJwtExpired(refreshToken.value)
  )
  const authorizationHeader = computed(() => {
    if (!accessToken.value) {
      return null
    }

    return `${tokenType.value || 'Bearer'} ${accessToken.value}`
  })

  const setSession = (tokens: AuthTokens, nextUser?: AuthUser | null) => {
    accessToken.value = tokens.accessToken
    refreshToken.value = tokens.refreshToken ?? refreshToken.value ?? null
    tokenType.value = tokens.tokenType ?? 'Bearer'

    if (nextUser !== undefined) {
      user.value = nextUser
    }
  }

  const clearSession = () => {
    accessToken.value = null
    refreshToken.value = null
    tokenType.value = 'Bearer'
    user.value = null
  }

  const login = async (credentials: LoginCredentials) => {
    const response = await $fetch<AuthResponse>(config.public.auth.loginPath, {
      baseURL: config.public.apiBaseUrl,
      method: 'POST',
      body: credentials
    })

    setSession(normalizeTokens(response), response.user ?? null)

    return response
  }

  const refreshSession = async () => {
    if (!refreshToken.value) {
      return false
    }

    try {
      const response = await $fetch<AuthResponse>(config.public.auth.refreshPath, {
        baseURL: config.public.apiBaseUrl,
        method: 'POST',
        body: {
          refreshToken: refreshToken.value,
          refresh_token: refreshToken.value
        }
      })

      setSession(normalizeTokens(response), response.user)

      return true
    } catch {
      clearSession()
      return false
    }
  }

  const fetchUser = async () => {
    if (!authorizationHeader.value) {
      return null
    }

    const nextUser = await $fetch<AuthUser>(config.public.auth.mePath, {
      baseURL: config.public.apiBaseUrl,
      headers: {
        Authorization: authorizationHeader.value
      }
    })

    user.value = nextUser

    return nextUser
  }

  const logout = async () => {
    if (config.public.auth.logoutPath) {
      await $fetch(config.public.auth.logoutPath, {
        baseURL: config.public.apiBaseUrl,
        method: 'POST',
        headers: authorizationHeader.value
          ? { Authorization: authorizationHeader.value }
          : undefined
      }).catch(() => undefined)
    }

    clearSession()
  }

  return {
    accessToken,
    refreshToken,
    tokenType,
    user,
    isAuthenticated,
    canRefresh,
    authorizationHeader,
    setSession,
    clearSession,
    login,
    refreshSession,
    fetchUser,
    logout
  }
})
