<script setup lang="ts">

import {reactive} from "vue";
import type {ICreateProduct} from "~/types";

const form = reactive<ICreateProduct>({
  title: '',
  description: '',
  price: 0,
  categoryId: 4,
  images: ["https://api.lorem.space/image/fashion?w=640&h=480&r=4278"],
})


const config = useRuntimeConfig()

const submit = async () => {
  await useApi<ICreateProduct>('/products', {
    method: "POST",
    body: form
  }).then(() => {
    alert("Done")
  }).catch(() => alert('Error'))

}
</script>

<template>
  <div>
    <div class="mb-3 flex items-center space-x-3">
      <nuxt-link to="/dashboard/products"
                 class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
        Back
      </nuxt-link>
    </div>
    <div>
      <form @submit.prevent="submit" class="max-w-sm mx-auto">
        <div class="mb-5">
          <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
          <input v-model="form.title" type="text" id="title"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 placeholder="product title" required>
        </div>
        <div class="mb-5">
          <label for="desc" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
          <textarea v-model="form.description" id="desc" rows="5"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required></textarea>
        </div>
        <div class="mb-5">
          <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
          <input v-model="form.price" type="number" id="password"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 required>
        </div>
        <button type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Add
        </button>
      </form>

    </div>
  </div>
</template>

<style scoped>

</style>