// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-05-03',
  srcDir: 'src/',
  devtools: {
    enabled: false
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL ?? '/api/v1',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
      auth: {
        loginPath: process.env.NUXT_PUBLIC_AUTH_LOGIN_PATH ?? '/auth/login',
        refreshPath: process.env.NUXT_PUBLIC_AUTH_REFRESH_PATH ?? '/auth/refresh',
        mePath: process.env.NUXT_PUBLIC_AUTH_ME_PATH ?? '/auth/me',
        logoutPath: process.env.NUXT_PUBLIC_AUTH_LOGOUT_PATH ?? '/auth/logout'
      }
    }
  },
  typescript: {
    strict: true,
    typeCheck: true
  },
  imports: {
    dirs: ['stores']
  },
  modules: ['@vueuse/nuxt', '@vueuse/motion/nuxt', '@pinia/nuxt', '@nuxtjs/i18n'],
  i18n: {
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    },
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English'
      },
      {
        code: 'uz',
        iso: 'uz-UZ',
        name: "O'zbek"
      },
      {
        code: 'ru',
        iso: 'ru-RU',
        name: 'Русский'
      }
    ],
    defaultLocale: 'en',
    vueI18n: './i18n.config.ts'
  },
  nitro: {
    compressPublicAssets: true
  },
  routeRules: {
    '/api/**': {
      headers: {
        'cache-control': 'no-store'
      }
    },
    '/**': {
      headers: {
        'x-content-type-options': 'nosniff',
        'x-frame-options': 'DENY',
        'referrer-policy': 'strict-origin-when-cross-origin',
        'permissions-policy': 'camera=(), microphone=(), geolocation=()'
      }
    }
  }
})
