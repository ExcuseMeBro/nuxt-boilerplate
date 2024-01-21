<script setup>
const router = useRouter()
const error = useError()
</script>

<template>
<div class="w-full h-screen flex items-center justify-center text-center">
  <div class="space-y-4">
    <h1 class="font-bold text-7xl">{{ error.statusCode }}</h1>
    <h1 class="font-bold text-2xl">{{ error.message }}</h1>
    <UButton @click="router.back()">Go back</UButton>
  </div>
</div>
</template>

<style scoped>

</style>