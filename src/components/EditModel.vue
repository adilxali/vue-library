<script setup>
defineEmits(["close"]);
</script>
<template>
  <Transition
    enter-active-class="ease-out duration-200"
    enter-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="ease-in duration-100"
    leave-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      class="fixed top-0 left-0 z-50 flex justify-center items-center max-w-full w-full max-h-full bg-gray-500 md:inset-0 h-[calc(100%-1rem)] md:h-auto md:overflow-y-auto transition-opacity duration-300"
    >
      <div class="relative w-full max-w-md max-h-full" @click="$emit('close')">
        <div class="relative bg-white rounded-lg shadow">
          <button
            @click="$emit('close')"
            type="button"
            class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <div class="px-6 py-6 lg:px-8">
            <h3 class="mb-4 text-xl font-medium text-gray-900">
              Sign in to our platform
            </h3>
            <form class="space-y-6" action="#">
              <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900"
                  >Your email {{ bookid }}</label
                >
                <input
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="Email"
                />
              </div>
              <div>
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900"
                  >Your password</label
                >
                <input
                  type="password"
                  name="password"
                  id="password"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="Password"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
