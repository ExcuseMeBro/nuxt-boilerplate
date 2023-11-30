<script setup lang="ts">
const form = reactive({
  login: '',
  password: '',
})

const loading = ref(false)

const onSubmitLogin = () => {
  loading.value = true
  setTimeout(() => {
    navigateTo('/dashboard')
    loading.value = false
  }, 1000)
}

definePageMeta({
  layout: 'auth'
})
</script>

<template>
  <div class="flex items-center justify-center w-full h-screen">
    <div class="flex flex-col space-y-3">
      <UInput type="text" v-model="form.login"/>
      <UInput type="password" v-model="form.password"/>
      <UButton label="Login" :loading="loading" @click="onSubmitLogin"/>
    </div>
  </div>
</template>

<style scoped>

</style>