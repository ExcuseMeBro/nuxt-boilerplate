<script setup lang="ts">
const items = [
  [{
    label: 'ben@example.com',
    slot: 'account',
    disabled: true
  }], [{
    label: 'Settings',
    icon: 'i-heroicons-cog-8-tooth'
  }], [{
    label: 'Documentation',
    icon: 'i-heroicons-book-open'
  }, {
    label: 'Changelog',
    icon: 'i-heroicons-megaphone'
  }, {
    label: 'Status',
    icon: 'i-heroicons-signal'
  }], [{
    label: 'Sign out',
    icon: 'i-heroicons-arrow-left-on-rectangle'
  }]
]

const darkMode = ref(false)
const colorMode = useColorMode()
colorMode.preference = 'dark'

watch(() => darkMode.value, (val) => {
  if (val) {
    colorMode.preference = 'light'
  } else {
    colorMode.preference = 'dark'
  }
})
</script>

<template>
  <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start rtl:justify-end">
          <span
              class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">NUXT3</span>
        </div>
        <div class="flex items-center">
          <div class="flex items-center space-x-2">
            <UToggle
                on-icon="i-heroicons-sun-20-solid"
                off-icon="i-heroicons-moon-20-solid"
                v-model="darkMode"
            />
            <UDropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }"
                       :popper="{ placement: 'bottom-start' }">
              <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4"/>

              <template #account="{ item }">
                <div class="text-left">
                  <p>
                    Signed in as
                  </p>
                  <p class="truncate font-medium text-gray-900 dark:text-white">
                    {{ item.label }}
                  </p>
                </div>
              </template>

              <template #item="{ item }">
                <span class="truncate">{{ item.label }}</span>

                <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"/>
              </template>
            </UDropdown>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>