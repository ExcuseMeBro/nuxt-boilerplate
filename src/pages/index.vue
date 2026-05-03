<script setup lang="ts">
const { t } = useI18n()
const api = useApi()
const restMessage = ref('')

const loadRestDemo = async () => {
  const response = await api.get<{ message: string }>('/hello', {
    skipAuth: true
  })

  restMessage.value = response.message
}
</script>

<template>
  <section>
    <h1>{{ t('home.title') }}</h1>
    <p>{{ t('home.description') }}</p>
    <button @click="loadRestDemo">
      {{ t('home.restDemo') }}
    </button>
    <p v-if="restMessage">
      {{ restMessage }}
    </p>
  </section>
</template>
