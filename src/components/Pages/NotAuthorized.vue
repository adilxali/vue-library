<template>
  <div class="flex items-center justify-center h-screen">
    <div class="bg-white shadow-lg rounded-lg p-6">
      <h2 class="text-3xl font-bold mb-4">Not Authorized</h2>
      <p class="text-gray-600">Sorry, you are not authorized to access this page.</p>
      <button
        @click="router.push({ name: 'login' })"
        class="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
      >
        Go Back
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style scoped>
/* Component-specific styles go here */
</style>
