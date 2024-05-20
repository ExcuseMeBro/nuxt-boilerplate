import en from '~/locales/en.json'
import uz from '~/locales/uz.json'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en,
    uz
  }
}))
