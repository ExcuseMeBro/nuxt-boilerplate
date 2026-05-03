<script setup lang="ts">
interface AppError {
  statusCode?: number
  statusMessage?: string
  message?: string
}

const { t } = useI18n()
const error = useError()
const currentError = computed(() => error.value as AppError | undefined)

const errorCode = computed(() => currentError.value?.statusCode ?? 500)
const errorMessage = computed(
  () => currentError.value?.statusMessage ?? currentError.value?.message ?? t('errors.default')
)

const handleError = () => {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="error">
    <h1 class="code">
      {{ errorCode }}
    </h1>
    <p class="message">
      {{ errorMessage }}
    </p>
    <button @click="handleError">
      {{ t('errors.backHome') }}
    </button>
  </div>
</template>
