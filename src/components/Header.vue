<script setup>
defineProps(["heading"]);
</script>
<template>
  <header class="bg-white shadow">
    <div class="mx-auto max-w-7xl p-4 sm:p-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">
        {{ heading }}
      </h1>
    </div>
  </header>
</template>
