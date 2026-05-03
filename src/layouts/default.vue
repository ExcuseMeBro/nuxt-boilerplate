<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <header>
    <nav aria-label="Main navigation">
      <NuxtLink to="/">
        {{ t('nav.home') }}
      </NuxtLink>
      <NuxtLink to="/users">
        {{ t('nav.users') }}
      </NuxtLink>
      <NuxtLink to="/login">
        {{ t('nav.login') }}
      </NuxtLink>
      <LocaleSwitch />
    </nav>
  </header>
  <main>
    <slot />
  </main>
  <footer>
    {{ t('footer') }}
  </footer>
</template>
