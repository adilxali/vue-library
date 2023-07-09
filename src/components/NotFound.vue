<script setup>
import { useRoute } from "vue-router";
const route = useRoute();

const resource = route.params.resource;
</script>
<template>
  <div
    class="fixed flex flex-col justify-center items-center w-screen h-screen bg-gray-900 text-white"
  >
    <h1 class="text-7xl font-extrabold mb-4 animate-bounce">404</h1>
    <p class="text-4xl font-medium italic transition-all duration-75 mb-4 animate-pulse">
      Oops! Page Not Found
    </p>
    <p class="text-lg animate-pulse mb-4">The Page you're looking for does not exits</p>
    <router-link
      to="/"
      class="px-6 py-3 bg-white text-indigo-600 rounded-full hover:bg-indigo-500 hover:text-white transition duration-300 ease-in-out"
    >
      Go Back to Home
    </router-link>
  </div>
</template>
