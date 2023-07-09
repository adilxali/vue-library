<script setup>
import { RouterView } from "vue-router";

import { ref, onMounted } from "vue";
import { supabase } from "@/supabaseClient.js";

const token = ref("");

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    token.value = data.session;
    localStorage.setItem("token", JSON.stringify(token.value));
  });
  supabase.auth.onAuthStateChange((_, _session) => {
    token.value = _session;
    localStorage.setItem("token", JSON.stringify(token.value));
  });
});
</script>

<template>
  <RouterView />
</template>

<style scoped>
/* Your scoped styles here */
</style>
