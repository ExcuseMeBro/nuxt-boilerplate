<script setup lang="ts">
definePageMeta({
  middleware: "auth-middleware"
})

const route = useRoute()

</script>
<template>
  <div>
    Optional page {{ route.params.optional }}
  </div>
</template>