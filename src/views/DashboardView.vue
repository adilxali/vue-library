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
</template>
