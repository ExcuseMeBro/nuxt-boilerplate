export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore()

  if (auth.isAuthenticated) {
    return
  }

  if (auth.canRefresh && (await auth.refreshSession())) {
    return
  }

  return navigateTo({
    path: '/login',
    query: {
      redirect: to.fullPath
    }
  })
})
