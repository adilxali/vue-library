<script setup>
import { ref, onMounted, computed } from "vue";
import { supabase } from "@/supabaseClient.js";

const bookIssues = ref([]);
const totalBooks = ref([]);
const returnedBooksCount = ref([]);
const studentCount = ref([]);
const loading = ref(true);
const getItem = async () => {
  try {
    loading.value = true;
    const { count: issueBook, error: issueBookError } = await supabase
      .from("transaction")
      .select("*", { count: "exact", head: true });
    if (issueBookError) throw issueBookError;
    bookIssues.value = issueBook;
    const { count: totalBooksCount, error: totalBooksError } = await supabase
      .from("books")
      .select("*", { count: "exact", head: true });
    if (totalBooksError) throw totalBooksError;
    totalBooks.value = totalBooksCount;

    const { count: student, error: studentError } = await supabase
      .from("students")
      .select("*", { count: "exact", head: true });
    if (studentError) throw studentError;
    studentCount.value = student;

    const { count: returnedBooks, error: returnedBooksError } = await supabase
      .from("transaction")
      .select("*", { count: "exact", head: true })
      .not("return_date", "is", null);
    if (returnedBooksError) throw returnedBooksError;
    returnedBooksCount.value = returnedBooks;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
onMounted(() => {
  getItem();
});
</script>
<template>
  <div v-if="loading">
    <div class="fixed w-screen flex items-center justify-center h-96">
      <div
        class="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-b-gray-900 border-t-orange-700"
      ></div>
      <div class="absolute animate-pulse">
        <h1 class="text-gray-900 font-bold italic">Loading...</h1>
      </div>
    </div>
  </div>
  <div
    v-else
    class="mx-auto flex justify-center flex-wrap sm:justify-normal max-w-7xl w-screen gap-2 mt-2"
  >
    <div
      class="flex justify-center items-center max-w-sm w-96 p-6 text-center bg-gray-900 border border-gray-200 rounded-lg shadow hover:bg-gray-800"
    >
      <a href="#">
        <h5
          class="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          Total Books
        </h5>
        <p class="font-bold text-3xl text-gray-400">
          {{ totalBooks ? totalBooks : 0 }}
        </p>
        <p class="text-gray-700 font-medium align-text-bottom">
          Total Books in the Library
        </p>
      </a>
    </div>
    <div
      class="flex justify-center items-center max-w-sm w-96 p-6 text-center bg-gray-900 border border-gray-200 rounded-lg shadow hover:bg-gray-800"
    >
      <a href="#">
        <h5
          class="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          Total Students
        </h5>
        <p class="font-bold text-3xl text-gray-400">
          {{ studentCount }}
        </p>
        <p class="text-gray-700 font-medium align-text-bottom">
          Total Students Register in the Library
        </p>
      </a>
    </div>
    <div
      class="flex justify-center items-center max-w-sm w-96 p-6 text-center bg-gray-900 border border-gray-200 rounded-lg shadow hover:bg-gray-800"
    >
      <a href="#">
        <h5
          class="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          Total Books Issue
        </h5>
        <p class="font-bold text-3xl text-gray-400">
          {{ bookIssues ? bookIssues : 0 }}
        </p>
        <p class="text-gray-700 font-medium align-text-bottom">
          Total Books Issues to Students
        </p>
      </a>
    </div>
    <div
      class="flex justify-center items-center max-w-sm w-96 p-6 text-center bg-gray-900 border border-gray-200 rounded-lg shadow hover:bg-gray-800"
    >
      <a href="#">
        <h5
          class="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          Returns Books
        </h5>
        <p class="font-bold text-3xl text-gray-400">
          {{ returnedBooksCount ? returnedBooksCount : 0 }}
        </p>
        <p class="text-gray-700 font-medium align-text-bottom">
          Total Returns Books to the Library
        </p>
      </a>
    </div>
    <div
      class="flex justify-center items-center max-w-sm w-96 p-6 text-center bg-gray-900 border border-gray-200 rounded-lg shadow hover:bg-gray-800"
    >
      <a href="#">
        <h5
          class="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          Pending Books
        </h5>
        <p class="font-bold text-3xl text-gray-400">
          {{ bookIssues - returnedBooksCount }}
        </p>
        <p class="text-gray-700 font-medium align-text-bottom">
          Pending Books to be Returned
        </p>
      </a>
    </div>
  </div>
</template>
