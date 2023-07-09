<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <svg
      class="w-16 h-16 text-red-500 mb-4"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        d="M10 0C4.477 0 0 4.477 0 10c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10C20 4.477 15.523 0 10 0zm-.293 14.707a1 1 0 01-1.414-1.414 4.97 4.97 0 000-7.072 1 1 0 111.414-1.414 6.97 6.97 0 010 9.9z"
      />
    </svg>
    <h1 class="text-2xl font-bold text-gray-900 mb-4">Network Error</h1>
    <p class="text-lg text-gray-600 mb-8">
      Oops! There was a problem connecting to the network. Please check your internet
      connection and try again.
    </p>
    <button
      class="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition duration-300 ease-in-out"
    >
      Retry
    </button>
  </div>
</template>

<style scoped>
button {
  cursor: pointer;
}
</style>
