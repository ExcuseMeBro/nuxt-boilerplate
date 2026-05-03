type ApiMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

type ApiRequestOptions = NonNullable<Parameters<typeof $fetch>[1]> & {
  skipAuth?: boolean
  retryOnAuth?: boolean
}

const getResponseStatus = (error: unknown) => {
  if (typeof error !== 'object' || error === null || !('response' in error)) {
    return undefined
  }

  return (error as { response?: { status?: number } }).response?.status
}

export const useApi = () => {
  const config = useRuntimeConfig()
  const auth = useAuthStore()
  const localeCookie = useCookie<string>('i18n_redirected')

  const request = async <T>(url: string, options: ApiRequestOptions = {}) => {
    const { skipAuth = false, retryOnAuth = true, ...fetchOptions } = options
    const headers = new Headers(fetchOptions.headers as HeadersInit)

    headers.set('Accept', 'application/json')
    headers.set('Accept-Language', localeCookie.value || 'en')

    if (!skipAuth && auth.authorizationHeader && !headers.has('Authorization')) {
      headers.set('Authorization', auth.authorizationHeader)
    }

    try {
      return await $fetch<T>(url, {
        ...fetchOptions,
        baseURL: fetchOptions.baseURL ?? config.public.apiBaseUrl,
        headers
      })
    } catch (error) {
      const shouldRefresh = !skipAuth && retryOnAuth && getResponseStatus(error) === 401

      if (!shouldRefresh || !(await auth.refreshSession())) {
        throw error
      }

      const retryHeaders = new Headers(headers)

      if (auth.authorizationHeader) {
        retryHeaders.set('Authorization', auth.authorizationHeader)
      }

      return await $fetch<T>(url, {
        ...fetchOptions,
        baseURL: fetchOptions.baseURL ?? config.public.apiBaseUrl,
        headers: retryHeaders
      })
    }
  }

  const withMethod = <T>(method: ApiMethod, url: string, options: ApiRequestOptions = {}) => {
    return request<T>(url, {
      ...options,
      method
    })
  }

  return {
    request,
    get: <T>(url: string, options?: ApiRequestOptions) => withMethod<T>('GET', url, options),
    post: <T>(url: string, options?: ApiRequestOptions) => withMethod<T>('POST', url, options),
    put: <T>(url: string, options?: ApiRequestOptions) => withMethod<T>('PUT', url, options),
    patch: <T>(url: string, options?: ApiRequestOptions) => withMethod<T>('PATCH', url, options),
    delete: <T>(url: string, options?: ApiRequestOptions) => withMethod<T>('DELETE', url, options)
  }
}
