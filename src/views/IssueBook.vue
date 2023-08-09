<script setup>
import { ref } from "vue";
import { supabase } from "@/supabaseClient.js";
const bookId = ref("");
const student_id = ref("");

const issueBook = async () => {
  try {
    //checking book
    const { data: bookData, error: bookError } = await supabase
      .from("books")
      .select("book_id")
      .eq("book_id", bookId.value);
    if (bookError) throw bookError;
    if (bookData.length === 0) {
      alert("Book  not found");
      bookId.value = "";
      student_id.value = "";
      return;
    }
    //checking book availability
    const { data, error } = await supabase
      .from("books")
      .select("quantity")
      .eq("book_id", bookId.value);
    if (error) throw error;
    if (data[0].quantity === 0) {
      alert("Book is not available");
      bookId.value = "";
      student_id.value = "";
      return;
    }
    //checking student id
    const { data: studentData, error: studentError } = await supabase
      .from("students")
      .select("student_id")
      .eq("student_id", student_id.value);
    if (studentError) throw studentError;
    if (studentData.length === 0) {
      alert("Student not found");
      bookId.value = "";
      student_id.value = "";
      return;
    }
    //checking students book limit 3 whose status is not returned
    const { data: limitData, error: limitError } = await supabase
      .from("transaction")
      .select("transaction_id")
      .eq("student_id", student_id.value)
      .is("return_date", null);
    if (limitError) throw limitError;
    if (limitData.length >= 3) {
      alert("Student has reached the limit of 3 books");
      bookId.value = "";
      student_id.value = "";
      return;
    }

    //issue book
    const { data: issueData, error: issueError } = await supabase
      .from("transaction")
      .insert([
        {
          book_id: bookId.value,
          student_id: student_id.value,
          transaction_date: new Date(),
        },
      ]);
    if (issueError) throw issueError;
    //update book availability
    const { data: updateData, error: updateError } = await supabase
      .from("books")
      .update({ quantity: 0 })
      .eq("book_id", bookId.value);
    if (updateError) throw updateError;
    alert("Book issued successfully");
    bookId.value = "";
    student_id.value = "";
  } catch (error) {
    console.log(error);
  }
};
</script>
<template>
  <div class="w-xl flex justify-center items-center">
    <form @submit.prevent="issueBook()">
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
          <div class="mt-10 grid grid-colos-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label for="bookId" class="block text-sm font-medium text-gray-700"
                >Book Id</label
              >
              <div class="mt-2">
                <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                >
                  <input
                    v-model="bookId"
                    type="text"
                    name="bookId"
                    id="bookId"
                    required
                    class="block flex-1 border-1 border-gray-900 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Book Id"
                  />
                </div>
              </div>
            </div>
            <div class="sm:col-span-3">
              <label for="student_id" class="block text-sm font-medium text-gray-700"
                >Student Id</label
              >
              <div class="mt-2">
                <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                >
                  <input
                    v-model="student_id"
                    type="text"
                    name="student_id"
                    id="student_id"
                    required
                    class="block flex-1 border-1 border-gray-900 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Student Id"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button type="reset" class="text-sm font-semibold leading-6 text-gray-900">
          Reset
        </button>
        <button
          type="submit"
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Issue Book
        </button>
      </div>
    </form>
  </div>
</template>
