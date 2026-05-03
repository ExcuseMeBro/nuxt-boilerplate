<script setup lang="ts">
import type { LoginCredentials } from '~/types/auth'

const { t } = useI18n()
const route = useRoute()
const auth = useAuthStore()

const form = reactive<LoginCredentials>({
  email: '',
  password: ''
})
const pending = ref(false)
const errorMessage = ref('')

const submit = async () => {
  pending.value = true
  errorMessage.value = ''

  try {
    await auth.login(form)
    await navigateTo(String(route.query.redirect || '/'))
  } catch {
    errorMessage.value = t('auth.failed')
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <section>
    <h1>{{ t('auth.signIn') }}</h1>
    <form @submit.prevent="submit">
      <label>
        <span>{{ t('auth.email') }}</span>
        <input v-model="form.email" type="email" name="email" autocomplete="email" required />
      </label>
      <label>
        <span>{{ t('auth.password') }}</span>
        <input
          v-model="form.password"
          type="password"
          name="password"
          autocomplete="current-password"
          required
        />
      </label>
      <p v-if="errorMessage" role="alert">
        {{ errorMessage }}
      </p>
      <button type="submit" :disabled="pending">
        {{ pending ? t('auth.signingIn') : t('auth.signIn') }}
      </button>
    </form>
  </section>
</template>
