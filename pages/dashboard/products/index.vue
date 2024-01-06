<script setup lang="ts">
import {useApi} from "~/composables/useApi";
import type {IProducts} from "~/types";

definePageMeta({
  middleware: "auth-middleware"
})

const selectedCategoryId = ref(2)

const {data: products, error, pending, refresh} = await useApi<IProducts[]>('/products', {
  transform: (products: IProducts[]) => {
    return products.filter((product) => product.category.id === +selectedCategoryId.value)
  },
  lazy: true,
})

watch(() => selectedCategoryId.value, () => {
  refresh()
})



</script>
<template>
  <div>
    <div class="mb-3 flex items-center space-x-3">
      <select v-model="selectedCategoryId" id="countries" class="bg-gray-50 w-fit border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option selected>Choose a category</option>
        <option value="1">Clothes1</option>
        <option value="2">Electronics</option>
        <option value="3">Furniture</option>
        <option value="4">Fashion</option>
      </select>
      <button @click="refresh"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
        Refresh
      </button>
      <nuxt-link to="/dashboard/create-product"
                 class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        + Add
      </nuxt-link>
    </div>
    <span v-if="pending">Loading...</span>
    <div v-else-if="products" class="grid grid-cols-3 2xl:grid-cols-4 gap-5">
      <div v-for="(product, idx) in products" :key="idx"
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
          <nuxt-link :to="`/dashboard/products/${product?.id}`"
             class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            $ {{ product?.price }}
            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                 fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </nuxt-link>
        </div>
      </div>
    </div>

    <pre v-else-if="error">Error: {{ error }}</pre>
  </div>
</template>