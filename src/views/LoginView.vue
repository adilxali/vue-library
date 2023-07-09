<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Loader from "../components/Loader.vue";
import { supabase } from "@/supabaseClient.js";

const router = useRouter();
const username = ref("");
const password = ref("");

const errorMsg = ref(null);
const loading = ref(false);

const login = async () => {
  try {
    loading.value = true;
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username.value,
      password: password.value,
    });
    if (error) throw error;
    router.push({ name: "dashboard" });
  } catch (error) {
    if (error.message && error.message === 404) {
      router.push({ name: "404-resource" });
    } else {
      router.push({ name: "network-error" });
    }
    if (error.message === "Invalid credentials.") {
      errorMsg.value = "Invalid credentials. Please try again.";
    }
    errorMsg.value = error.message;
    console.log(error);
    setTimeout(() => {
      errorMsg.value = null;
    }, 3000);
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <Loader v-if="loading" />
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-30 w-auto"
        src="@/assets/Roorkee_Adventist_Logo_New-removebg-preview-e1653726521396.png"
        alt="Your Company"
      />
      <h1 class="mt-6 text-center text-2xl font-extrabold text-gray-900">
        Roorkee Adventist College
      </h1>
      <h2
        class="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Log in to Library
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="login()" class="space-y-6" id="loginForm">
        <div>
          <label for="username" class="block text-sm font-medium leading-6 text-gray-900"
            >Username</label
          >
          <div class="mt-2">
            <input
              v-model="username"
              id="username"
              name="username"
              type="text"
              autocomplete="email"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
          </div>
          <div class="mt-2">
            <input
              v-model="password"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <p v-if="errorMsg" class="text-center text-red-500">{{ errorMsg }}</p>

        <div class="flex justify-center">
          <button
            type="submit"
            class="flex w-[200px] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
