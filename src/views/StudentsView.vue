<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { supabase } from "@/supabaseClient.js";
import Search from "../components/Search.vue";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
const router = useRouter();
const route = useRoute();
const search = ref("");
const loading = ref(false);
const students = ref([]);

const deleteStd = async (stdId) => {
  try {
    loading.value = true;
    const { error } = await supabase.from("students").delete().eq("student_id", stdId);
    if (error) throw error;
    students.value = students.value.filter((item) => item.student_id !== stdId);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
    router.push({ name: "students" });
  }
};

const filterStd = computed(() => {
  const query = search.value.toLowerCase();
  return students.value.filter((item) => {
    return (
      item.name.toLowerCase().includes(query) ||
      item.mobile.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query)
    );
  });
});
onMounted(() => {
  students.value = route.meta.studentsData;
  router.push({ name: "students" });
});
</script>
<template>
  <Search v-model="search" />
  <div class="mx-auto max-w-screen">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full">
        <thead class="text-sm text-gray-300 uppercase bg-gray-800">
          <tr>
            <th class="px-3 py-2 border-r">
              <div class="font-semibold text-center">Student ID</div>
            </th>
            <th class="px-3 py-2 border-r">
              <div class="font-semibold text-center">Name</div>
            </th>
            <th class="px-3 py-2 border-r">
              <div class="font-semibold text-center">Age</div>
            </th>
            <th class="px-3 py-2 border-r">
              <div class="font-semibold text-center">Gender</div>
            </th>
            <th class="px-3 py-2 border-r">
              <div class="font-semibold text-center">Course</div>
            </th>
            <th class="px-3 py-2 border-r">
              <div class="font-semibold text-center">Year</div>
            </th>
            <th class="px-3 py-2 border-r">
              <div class="font-semibold text-center">Email</div>
            </th>
            <th class="px-3 py-2 border-r">
              <div class="font-semibold text-center">Mobile</div>
            </th>
            <th class="px-3 py-2 border-r">
              <div class="font-semibold text-center sr-only">Actions</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b border-gray-200 text-center hover:bg-gray-300"
            v-if="filterStd.length > 0"
            v-for="student in filterStd"
          >
            <td class="px-3 py-2 border-r border-gray-300">
              <div class="font-semibold">{{ student.student_id }}</div>
            </td>
            <td class="px-3 py-2 border-r border-gray-300">
              <div class="font-semibold">{{ student.name }}</div>
            </td>
            <td class="px-3 py-2 border-r border-gray-300">
              <div class="font-semibold">{{ student.age }}</div>
            </td>
            <td class="px-3 py-2 border-r border-gray-300">
              <div class="font-semibold">{{ student.gender }}</div>
            </td>
            <td class="px-3 py-2 border-r border-gray-300">
              <div class="font-semibold">{{ student.course }}</div>
            </td>
            <td class="px-3 py-2 border-r border-gray-300">
              <div class="font-semibold">{{ student.year }}</div>
            </td>
            <td class="px-3 py-2 border-r border-gray-300">
              <div class="font-semibold">{{ student.email }}</div>
            </td>
            <td class="px-3 py-2 border-r border-gray-300">
              <div class="font-semibold">{{ student.mobile }}</div>
            </td>

            <td class="px-3 py-2 border-r border-gray-300">
              <div class="flex justify-center space-x-1">
                <button
                  class="text-gray-700 hover:bg-gray-700 hover:text-white font-bold py-1 px-2 rounded"
                >
                  Edit
                </button>
                <button
                  @click="deleteStd(student.student_id)"
                  class="text-red-500 hover:bg-red-700 hover:text-white font-bold py-1 px-2 rounded"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
          <tr v-else-if="loading">
            <td colspan="9" class="px-3 py-2 border-r border-gray-300">
              <div class="font-semibold">Loading...</div>
            </td>
          </tr>
          <tr
            class="bg-white border-b border-gray-200 text-center hover:bg-gray-300"
            v-else
          >
            <td colspan="9" class="px-3 py-2 border-r border-gray-300">
              <div class="font-semibold">No Data Found</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
