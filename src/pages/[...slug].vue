<script setup lang="ts">
const { t } = useI18n()

definePageMeta({
  layout: 'empty'
})
</script>

<template>
  <div class="flex flex-center column error">
    <h1 class="q-mb-md">404</h1>
    <p>
      {{ t('errors.notFound') }}
    </p>
    <NuxtLink to="/">
      {{ t('errors.backHome') }}
    </NuxtLink>
  </div>
</template>
