<script setup>
import { ref } from "vue";

import { supabase } from "@/supabaseClient.js";
defineProps(["bookId"]);
const title = ref("");
const author = ref("");
const isbn = ref("");
const edition = ref("");
const publisher = ref("");
const year = ref("");
const pages = ref("");
const price = ref("");
const bill_number = ref("");
const bill_date = ref("");
const class_number = ref("");
const book_number = ref("");
const description = ref("");
const remarks = ref("");
const addBook = async (bookId) => {
  try {
    const { data: bookData, error: bookError } = await supabase
      .from("books")
      .update([
        {
          title: title.value,
          author: author.value,
          isbn: isbn.value,
          edition: edition.value,
          publication: publisher.value,
          publication_year: year.value,
          pages: pages.value,
          price: price.value,
          bill_number: bill_number.value,
          bill_date: bill_date.value,
          class_number: class_number.value,
          book_number: book_number.value,
          description: description.value,
          remarks: remarks.value,
          quantity: 1,
        },
      ])
      .eq("book_id", bookId.value);
    if (bookError) throw bookError;
    alert("Book Updated successfully");
    router.push({ name: "books" });
  } catch (error) {
    alert(error.message);
  }
};
</script>
<template>
  <form @submit.prevent="addBook()">
    <div class="space-y-6">
      <div class="border-b border-gray-900/10 pb-10">
        <div class="mt-6 grid grid-colos-1 gap-x-6 gap-y-2 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label for="title" class="block text-sm font-medium text-gray-700"
              >Title</label
            >
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              >
                <input
                  v-model="title"
                  type="text"
                  name="title"
                  id="title"
                  required
                  class="block flex-1 border-1 border-gray-900 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="title"
                />
              </div>
            </div>
          </div>
          <div class="sm:col-span-3">
            <label for="author" class="block text-sm font-medium text-gray-700"
              >Author</label
            >
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              >
                <input
                  v-model="author"
                  type="text"
                  name="author"
                  id="author"
                  required
                  class="block flex-1 border-1 border-gray-900 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Author"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="mt-10 grid grid-colos-1 gap-x-6 gap-y-2 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label for="isbn" class="block text-sm font-medium text-gray-700">ISBN</label>
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              >
                <input
                  v-model="isbn"
                  type="text"
                  name="isbn"
                  id="isbn"
                  required
                  class="block flex-1 border-1 border-gray-900 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="ISBN"
                />
              </div>
            </div>
          </div>
          <div class="sm:col-span-3">
            <label for="edition" class="block text-sm font-medium text-gray-700"
              >Edition</label
            >
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              >
                <input
                  v-model="edition"
                  type="text"
                  name="edition"
                  id="edition"
                  required
                  class="block flex-1 border-1 border-gray-900 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Edition"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="mt-10 grid grid-colos-1 gap-x-6 gap-y-2 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label for="publisher" class="block text-sm font-medium text-gray-700"
              >Publication</label
            >
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              >
                <input
                  v-model="publisher"
                  type="text"
                  name="publisher"
                  id="publisher"
                  required
                  class="block flex-1 border-1 border-gray-900 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Publication"
                />
              </div>
            </div>
          </div>
          <div class="sm:col-span-3">
            <label for="year" class="block text-sm font-medium text-gray-700">Year</label>
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              >
                <input
                  v-model="year"
                  type="text"
                  name="year"
                  id="year"
                  required
                  class="block flex-1 border-1 border-gray-900 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Year"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="mt-10 grid grid-colos-1 gap-x-6 gap-y-2 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label for="pages" class="block text-sm font-medium text-gray-700"
              >Pages</label
            >
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              >
                <input
                  v-model="pages"
                  type="text"
                  name="pages"
                  id="pages"
                  required
                  class="block flex-1 border-1 border-gray-900 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Pages"
                />
              </div>
            </div>
          </div>
          <div class="sm:col-span-3">
            <label for="price" class="block text-sm font-medium text-gray-700"
              >Price</label
            >
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              >
                <input
                  v-model="price"
                  type="text"
                  name="price"
                  id="price"
                  required
                  class="block flex-1 border-1 border-gray-900 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Year"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="mt-10 grid grid-colos-1 gap-x-6 gap-y-2 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label for="bill_number" class="block text-sm font-medium text-gray-700"
              >Bill Number</label
            >
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              >
                <input
                  v-model="bill_number"
                  type="text"
                  name="bill_number"
                  id="bill_number"
                  required
                  class="block flex-1 border-1 border-gray-900 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Bill Number"
                />
              </div>
            </div>
          </div>
          <div class="sm:col-span-3">
            <label for="bill_date" class="block text-sm font-medium text-gray-700"
              >Bill Date</label
            >
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              >
                <input
                  v-model="bill_date"
                  type="text"
                  name="bill_date"
                  id="bill_date"
                  required
                  class="block flex-1 border-1 border-gray-900 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Bill Date"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="mt-10 grid grid-colos-1 gap-x-6 gap-y-2 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label for="class_number" class="block text-sm font-medium text-gray-700"
              >Class Number</label
            >
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              >
                <input
                  v-model="class_number"
                  type="text"
                  name="class_number"
                  id="class_number"
                  required
                  class="block flex-1 border-1 border-gray-900 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Class Number"
                />
              </div>
            </div>
          </div>
          <div class="sm:col-span-3">
            <label for="book_number" class="block text-sm font-medium text-gray-700"
              >Book Number</label
            >
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              >
                <input
                  v-model="book_number"
                  type="text"
                  name="book_number"
                  id="book_number"
                  required
                  class="block flex-1 border-1 border-gray-900 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Bill Date"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="mt-10 grid grid-colos-1 gap-x-6 gap-y-2 sm:grid-cols-6">
          <div class="col-span-6">
            <label
              for="description"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Description</label
            >
            <div class="mt-2">
              <textarea
                v-model="description"
                id="description"
                name="description"
                rows="3"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Description"
              ></textarea>
            </div>
          </div>
          <div class="col-span-6">
            <label for="remarks" class="block text-sm font-medium leading-6 text-gray-900"
              >Remarks</label
            >
            <div class="mt-2">
              <textarea
                v-model="remarks"
                id="remarks"
                name="remarks"
                rows="3"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Remarks"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button type="reset" class="text-sm font-semibold lesding-6 text-gray-900">
        Cancel
      </button>
      <button
        type="submit"
        class="rounded-md bg-indigo-600 px-3 py-2 text-sm text-white hover:bg-indigo-500"
      >
        Save
      </button>
    </div>
  </form>
</template>
