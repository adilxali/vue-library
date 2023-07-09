<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { supabase } from "@/supabaseClient.js";
import Search from "@/components/Search.vue";

import Model from "@/components/Model.vue";
const route = useRoute();
const router = useRouter();
const search = ref("");
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
const isEdit = ref(false);

const bookid = ref(null);
const loading = ref(false);
const openModel = (bookId) => {
  bookid.value = bookId;
  router.replace({ query: { edit: bookid.value } });
};
const closeModel = () => {
  isEdit.value = false;
  isIssue.value = false;
  bookid.value = null;
  router.push({ path: route.path });
};
const book = computed(() => {
  return bookData.value.find((item) => item.book_id === bookid.value);
});

const bookData = ref([]);

const filterBooks = computed(() => {
  return bookData.value.filter((book) => {
    return (
      book.title.toLowerCase().includes(search.value.toLowerCase()) ||
      book.author.toLowerCase().includes(search.value.toLowerCase()) ||
      book.isbn.toLowerCase().includes(search.value.toLowerCase())
    );
  });
});

const deleteBook = async (bookId) => {
  confirm("Are you sure you want to delete this book?");

  try {
    loading.value = true;
    const { data, error } = await supabase
      .from("books")
      .delete()
      .match({ book_id: bookId });
    if (error) throw error;
    alert("Book deleted successfully");
    console.log(data);
    router.push({ name: "books" });
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const updateBook = async (bookId) => {
  try {
    loading.value = true;
    const { error } = await supabase
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
      .eq("book_id", bookId);
    if (error) throw error;
    alert("Book Updated successfully");
  } catch (error) {
    console.log(error);
    console.log(error.message);
    alert("Unable to update book");
  } finally {
    loading.value = false;
    closeModel();
  }
};

onMounted(() => {
  router.push({ path: route.path });
  bookData.value = route.meta.booksData;
});
</script>
<template>
  <Search v-model="search" />
  <div class="mx-auto max-w-screen mb-3">
    <Teleport to="#model">
      <Model v-if="isEdit" @close="closeModel">
        <div class="px-6 py-4 lg:px-8">
          <div class="px-4">
            <h3
              class="bg-gray-900 mb-2 text-xl text-center rounded-md font-bold text-gray-100 italic px-16"
            >
              Update Book {{ book?.book_id }} - {{ book?.title }}
            </h3>
          </div>
          <form @submit.prevent="updateBook(book?.book_id)">
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
                    <label for="isbn" class="block text-sm font-medium text-gray-700"
                      >ISBN</label
                    >
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
                    <label for="year" class="block text-sm font-medium text-gray-700"
                      >Year</label
                    >
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
                    <label
                      for="bill_number"
                      class="block text-sm font-medium text-gray-700"
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
                    <label
                      for="class_number"
                      class="block text-sm font-medium text-gray-700"
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
                    <label
                      for="book_number"
                      class="block text-sm font-medium text-gray-700"
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
                    <label
                      for="remarks"
                      class="block text-sm font-medium leading-6 text-gray-900"
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
              <button
                @click="closeModel"
                type="reset"
                class="text-sm font-semibold lesding-6 text-gray-900"
              >
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
        </div>
      </Model>
    </Teleport>

    <div
      id="table"
      class="relative max-w-screen overflow-x-hidden shadow-md sm:rounded-md"
    >
      <table class="w-full text-sm text-left">
        <thead class="text-sm text-gray-300 uppercase bg-gray-800">
          <tr>
            <th class="px-3 py-3 border-r">
              <div class="font-semibold text-center">Book ID</div>
            </th>
            <th class="px-3 py-3 border-r">
              <div class="font-semibold text-center">Title</div>
            </th>
            <th class="px-3 py-3 border-r">
              <div class="font-semibold text-center">Author</div>
            </th>
            <th class="px-3 py-3 border-r">
              <div class="font-semibold text-center">ISBN</div>
            </th>
            <th class="px-3 py-3 border-r">
              <div class="font-semibold text-center">Edition</div>
            </th>
            <th class="px-3 py-3 border-r">
              <div class="font-semibold text-center">Publication</div>
            </th>
            <th class="px-3 py-3 border-r">
              <div class="font-semibold text-center">Publish Year</div>
            </th>
            <th class="px-3 py-3 border-r">
              <div class="font-semibold text-center">Pages</div>
            </th>
            <th class="px-3 py-3 border-r">
              <div class="font-semibold text-center">Price</div>
            </th>
            <th class="px-3 py-3 border-r">
              <div class="font-semibold text-center">Bill Number</div>
            </th>
            <th class="px-3 py-3 border-r">
              <div class="font-semibold text-center">Bill Date</div>
            </th>
            <th class="px-3 py-3 border-r">
              <div class="font-semibold text-center">Class Number</div>
            </th>
            <th class="px-3 py-3 border-r">
              <div class="font-semibold text-center">Book Number</div>
            </th>

            <th class="px-3 py-3 border-r">
              <div class="font-semibold text-center">Description</div>
            </th>
            <th class="px-3 py-3 border-r">
              <div class="font-semibold text-center">Availabilty</div>
            </th>
            <th class="px-2 py-3 border-r">
              <div class="font-semibold text-center">Action</div>
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
          <tr
            v-if="filterBooks.length > 0"
            v-for="book in filterBooks"
            class="bg-white border-b border-gray-200 hover:bg-gray-300"
            :key="book.book_id"
          >
            <td class="px-4 py-3 border-r bg-gray-400">
              <div class="text-center text-lg font-bold">{{ book.book_id }}</div>
            </td>
            <td class="px-4 py-3 border-r">
              <div class="text-center text-lg">{{ book.title }}</div>
            </td>
            <td class="px-4 py-3 border-r">
              <div class="text-center">{{ book.author }}</div>
            </td>
            <td class="px-4 py-3 border-r">
              <div class="text-center">{{ book.isbn }}</div>
            </td>
            <td class="px-4 py-3 border-r">
              <div class="text-center">{{ book.edition }}</div>
            </td>
            <td class="px-4 py-3 border-r">
              <div class="text-center">{{ book.publication }}</div>
            </td>
            <td class="px-4 py-3 border-r">
              <div class="text-center">{{ book.publication_year }}</div>
            </td>
            <td class="px-4 py-3 border-r">
              <div class="text-center">{{ book.pages }}</div>
            </td>
            <td class="px-4 py-3 border-r">
              <div class="text-center">{{ book.price }}</div>
            </td>
            <td class="px-4 py-3 border-r">
              <div class="text-center">{{ book.bill_number }}</div>
            </td>
            <td class="px-4 py-3 border-r">
              <div class="text-center">{{ book.bill_date }}</div>
            </td>
            <td class="px-4 py-3 border-r">
              <div class="text-center">{{ book.class_number }}</div>
            </td>
            <td class="px-4 py-3 border-r">
              <div class="text-center">{{ book.book_number }}</div>
            </td>

            <td class="px-4 py-3 border-r">
              <div class="text-center">{{ book.description }}</div>
            </td>
            <td class="px-4 py-3 border-r">
              <!-- <div class="text-center">{{ book.quantity }}</div> -->
              <div class="text-center" v-if="book.quantity > 0">Available</div>
              <div class="text-center" v-else>Not Available</div>
            </td>
            <td class="py-3 border-r">
              <div class="flex">
                <button
                  @click="
                    isEdit = true;
                    openModel(book.book_id);
                  "
                  class="text-gray-700 hover:bg-gray-700 hover:text-white font-bold py-2 px-2 rounded-md"
                >
                  Edit
                </button>

                <button
                  @click.prevent="deleteBook(book.book_id)"
                  class="text-red-700 hover:bg-red-700 hover:text-white font-bold py-2 px-2 rounded-md"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="!loading && !filterBooks.length">
            <td colspan="16">
              <div class="text-center text-3xl font-serif italic my-10">
                No Books Found
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>
