export default defineEventHandler(() => {
  return {
    status: 'ok',
    service: 'nuxt-boilerplate',
    timestamp: new Date().toISOString()
  }
})
