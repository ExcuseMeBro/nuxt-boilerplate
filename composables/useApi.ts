export const useApi = <T>(request: string, opts?: any) => {
    const config = useRuntimeConfig()

    return useFetch<T>(request, { baseURL: config.public.baseURL, ...opts })
}

export const usePostApi = <T>(request: string, opts?: any) => {
    const config = useRuntimeConfig()

    return $fetch<T>(request, { baseURL: config.public.baseURL, ...opts })
}