<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { supabase } from "@/supabaseClient.js";
import Search from "../components/Search.vue";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
const router = useRouter();
const route = useRoute();
const search = ref("");
const loading = ref(false);
const trans = ref([]);
const getTransactions = async () => {
  try {
    Nprogress.start();
    loading.value = true;
    const { data, error } = await supabase
      .from("transaction")
      .select(`*, students(name, course),books(title, author)`)
      .order("transaction_id", { ascending: true });
    if (error) throw error;
    trans.value = data;
    console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    Nprogress.done();
    loading.value = false;
  }
};
const returnBook = async (bookid) => {
  try {
    const { data, error } = await supabase
      .from("transaction")
      .update({ return_date: new Date() })
      .eq("book_id", bookid);
    if (error) throw error;

    //update Book quantity
    const { data: updateData, error: updateError } = await supabase
      .from("books")
      .update({ quantity: 1 })
      .eq("book_id", bookid);
    if (updateError) throw updateError;

    getTransactions();
  } catch (error) {
    console.log(error);
  }
};
const filteredTransactions = computed(() => {
  const query = search.value.toLowerCase();
  return trans.value.filter(
    (item) =>
      item.books.title?.toLowerCase().includes(query) ||
      item.books.author?.toLowerCase().includes(query) ||
      item.students.name?.toLowerCase().includes(query)
  );
});
onMounted(() => {
  // trans.value = route.meta.transactionsData;
  getTransactions();
});
</script>
<template>
  <Search v-model="search" />
  <div class="relative max-w-screen overflow-x-auto shadow-md sm:rounded-lg">
    <table id="studentTable" class="w-full text-md text-left text-gray-700">
      <thead class="text-sm text-gray-300 uppercase bg-gray-800">
        <tr class="border-b">
          <th scope="col" class="px-6 py-3 border-r">trans id</th>
          <th scope="col" class="px-6 py-3 border-r">ACCESSION NO.</th>
          <th scope="col" class="px-6 py-3 border-r">Book Title</th>
          <th scope="col" class="px-6 py-3 border-r">Author</th>
          <th scope="col" class="px-6 py-3 border-r">Student Name</th>
          <th scope="col" class="px-6 py-3 border-r">Course</th>
          <th scope="col" class="px-6 py-3 border-r">ISSUE date</th>
          <th scope="col" class="px-6 py-3 border-r">RETURN DATE</th>
          <th scope="col" class="px-6 py-3 border-r">STATUS</th>

          <th scope="col" class="px-6 py-3 border-r">
            <span class="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <div class="fixed w-screen flex items-center justify-center h-96">
            <div
              class="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-b-gray-900 border-t-orange-700"
            ></div>
            <div class="absolute animate-pulse">
              <h1 class="text-gray-900 font-bold italic">Loading...</h1>
            </div>
          </div>
        </tr>
        <tr v-if="filteredTransactions.length > 0" v-for="item in filteredTransactions">
          <td class="px-6 py-2 border-r font-medium text-gray-500">
            {{ item.transaction_id }}
          </td>
          <td class="px-6 py-2 border-r font-medium text-gray-500">{{ item.book_id }}</td>
          <td class="px-6 py-2 border-r font-medium text-gray-500">
            {{ item.books.title }}
          </td>
          <td class="px-6 py-2 border-r font-medium text-gray-500">
            {{ item.books.author }}
          </td>
          <td class="px-6 py-2 border-r font-medium text-gray-500">
            {{ item.students.name }}
          </td>
          <td class="px-6 py-2 border-r font-medium text-gray-500">
            {{ item.students.course }}
          </td>
          <td class="px-6 py-2 border-r font-medium text-gray-500">
            {{ item.transaction_date }}
          </td>
          <td class="px-6 py-2 border-r font-medium text-gray-500">
            {{ item.return_date }}
          </td>

          <td class="px-6 py-2 border-r">
            <span
              class="font-semibold leading-tight text-green-700"
              v-if="item.return_date"
            >
              Returned
            </span>
            <span class="font-semibold leading-tight text-yellow-700" v-else>
              Pending
            </span>
          </td>
          <td class="px-6 py-2 border-r font-medium text-gray-500">
            <button
              @click="returnBook(item.book_id)"
              class="px-4 py-2 font-semibold text-white transition duration-500 ease-in-out transform bg-blue-500 rounded-lg hover:bg-blue-700 hover:to-black focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2"
              v-if="!item.return_date"
            >
              Return
            </button>
          </td>
        </tr>
        <tr v-if="!loading && filteredTransactions.length === 0" class="text-center">
          <td colspan="10" class="px-6 py-3 font-bold text-3xl italic">
            No Data Found
            <span class="underline">
              {{ search }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
