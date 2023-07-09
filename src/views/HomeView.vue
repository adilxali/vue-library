<script setup>
import { RouterView, useRoute } from "vue-router";
import NotAuthorized from "@/components/Pages/NotAuthorized.vue";
import { ref, computed } from "vue";
import Navbar from "@/components/Navbar.vue";
import Header from "@/components/Header.vue";

const isScroll = ref(false);
const scroll = () => {
  if (window.scrollY > 100) {
    isScroll.value = true;
  } else {
    isScroll.value = false;
  }
};
window.addEventListener("scroll", scroll);

const token = JSON.parse(localStorage.getItem("token"));
const headingTitle = computed(() => {
  const route = useRoute();
  const { name } = route;
  return name.toUpperCase();
});
</script>

<template>
  <div v-if="token">
    <Navbar
      :ScrollClass="[
        isScroll
          ? 'backdrop-blur-sm backdrop-brightness-700 bg-gray-900 bg-opacity-70'
          : ' bg-gray-800',
      ]"
    />
    <Header :heading="headingTitle" />

    <main class="-z-50">
      <div class="mx-auto max-w-[97%]">
        <router-view> </router-view>
      </div>
    </main>
  </div>
  <div v-else>
    <NotAuthorized />
  </div>
</template>
