<script setup lang="ts">
import {useApi} from "~/composables/useApi";
import type {IProducts} from "~/types";

const route = useRoute()

definePageMeta({
  middleware: "auth-middleware"
})

const {data: product, error, pending, refresh} = await useApi<IProducts>(`/products/${route.params.id}`, {
  lazy: true,
})
</script>
<template>
  <div>
    <div class="mb-3 flex items-center space-x-3">
      <nuxt-link to="/dashboard/products"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
        Back
      </nuxt-link>
    </div>
    <span v-if="pending">Loading...</span>
    <div v-else-if="product" class="grid grid-cols-3 2xl:grid-cols-4 gap-5">
      <div
           class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img class="rounded-t-lg" :src="product?.images?.at(0)" alt=""/>
        </a>
        <div class="p-5">
          <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {{ product?.title }}
            </h5>
          </a>
          <a href="#">
            <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {{ product?.category?.name }}
            </h5>
          </a>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {{ product?.description }}
          </p>
          <a href="#"
             class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            $ {{ product?.price }}
            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                 fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </a>
        </div>
      </div>
    </div>

    <pre v-else-if="error">Error: {{ error }}</pre>
  </div>
</template>