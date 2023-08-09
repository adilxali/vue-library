<script setup>
import { RouterLink, useRouter } from "vue-router";
import { ref } from "vue";
import { supabase } from "@/supabaseClient";
import Loader from "@/components/Loader.vue";
defineProps(["ScrollClass"]);
const router = useRouter();

const open = ref(false);
const loading = ref(false);

const logout = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    router.push({ name: "login" });
  } catch (error) {
    console.log(error.message);
  } finally {
    loading.value = false;
  }
};
const Navigate = () => {
  open.value = false;
};
</script>

<template>
  <Loader v-if="loading" />

  <nav class="sticky top-0 z-40" :class="ScrollClass">
    <div class="mx-auto max-w-7xl px-4 sm:px-4 lg:px-6">
      <div class="flex items-center justify-between">
        <!-- Mobile Menu Buttons -->
        <div class="flex-shrink-0 flex items-center sm:hidden">
          <button
            @click="open = !open"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <!-- Icon when menu is closed. -->
            <svg
              v-if="!open"
              class="block h-6 w-6 menu-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <!-- Icon when menu is open. -->
            <svg
              v-if="open"
              class="block h-6 w-6 close-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <!-- Logo -->
        <div class="flex items-center">
          <img
            class="h-20 w-20 cursor-pointer"
            src="@/assets/Roorkee_Adventist_Logo_New-removebg-preview-e1653726521396.png"
            alt="Roorkee Adventist College"
          />

          <!-- Links -->
          <div class="pl-4 hidden sm:block">
            <div class="flex">
              <div class="flex items-center space-y-1 px-2 pb-3 pt-2 text-white">
                <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->

                <router-link
                  :to="{ name: 'dashboard' }"
                  class="block rounded-md px-3 py-2 text-sm font-medium"
                >
                  Home
                </router-link>
                <router-link
                  :to="{ name: 'books' }"
                  class="block rounded-md px-3 py-2 text-sm font-medium"
                  >Books</router-link
                >
                <router-link
                  :to="{ name: 'addbook' }"
                  class="block rounded-md px-3 py-2 text-sm font-medium"
                  >Add Book</router-link
                >
                <router-link
                  :to="{ name: 'issuebook' }"
                  class="block rounded-md px-3 py-2 text-sm font-medium"
                  >Issue Book</router-link
                >
                <router-link
                  :to="{ name: 'students' }"
                  class="block rounded-md px-3 py-2 text-sm font-medium"
                  >Students</router-link
                >
                <router-link
                  :to="{ name: 'registerstudent' }"
                  to="/regstd"
                  class="block rounded-md px-3 py-2 text-sm font-medium"
                  >Register Student</router-link
                >
                <router-link
                  :to="{ name: 'transactions' }"
                  class="block rounded-md px-3 py-2 text-sm font-medium"
                  >Transactions</router-link
                >
              </div>
            </div>
          </div>
        </div>
        <!-- Logout -->
        <div class="flex">
          <button class="flex" @click="logout">
            <span class="sr-only">Logout</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-log-out h-8 w-8 rounded-full text-white"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span
              class="text-white rounded-md px-3 py-1.5 text-sm font-medium hidden sm:block"
              >Logout</span
            >
          </button>
        </div>
      </div>
    </div>
    <div v-if="open" class="sm:hidden" id="mobile-menu">
      <div class="space-y-1 px-2 pb-3 pt-2 text-white">
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
        <router-link
          to="/"
          @click="Navigate"
          class="block rounded-md px-3 py-2 text-sm font-medium"
          >Home</router-link
        >
        <router-link
          to="/books"
          @click="Navigate"
          class="block rounded-md px-3 py-2 text-sm font-medium"
          >Books</router-link
        >
        <router-link
          to="/addbook"
          @click="Navigate"
          class="block rounded-md px-3 py-2 text-sm font-medium"
          >Add Book</router-link
        >
        <router-link
          @click="Navigate"
          to="/issuebook"
          class="block rounded-md px-3 py-2 text-sm font-medium"
          >Issue Book</router-link
        >
        <router-link
          @click="Navigate"
          to="/students"
          class="block rounded-md px-3 py-2 text-sm font-medium"
          >Students</router-link
        >
        <router-link
          @click="Navigate"
          to="/regstd"
          class="block rounded-md px-3 py-2 text-sm font-medium"
          >Register Student</router-link
        >
        <router-link
          @click="Navigate"
          to="/transactions"
          class="block rounded-md px-3 py-2 text-sm font-medium"
          >Transactions</router-link
        >
      </div>
    </div>
  </nav>
</template>
<style scoped>
nav .active {
  @apply bg-gray-900 text-white;
}
nav a:hover {
  @apply bg-gray-700 text-white;
}
</style>
