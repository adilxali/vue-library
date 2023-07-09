<script setup>
import { ref } from "vue";
import { supabase } from "@/supabaseClient.js";
import { useRouter } from "vue-router";

const router = useRouter();
const name = ref("");
const email = ref("");
const mobile = ref("");
const age = ref("");
const course = ref("");
const year = ref("");
const gender = ref("");
const loading = ref(true);
//create student id based on the course and year
const createStudentId = () => {
  const courseCode = course.value.toUpperCase();
  const yearCode = year.value.slice(2, 4);
  const randomCode = Math.floor(Math.random() * 1000);
  const studentId = `${courseCode}${yearCode}${randomCode}`;
  return studentId;
};
const addStd = async () => {
  try {
    loading.value = true;
    const { data, error } = await supabase.from("students").insert([
      {
        student_id: createStudentId(),
        name: name.value,
        email: email.value,
        mobile: mobile.value,
        year: year.value,
        age: age.value,
        gender: gender.value,
        course: course.value,
      },
    ]);
    if (error) throw error;
    console.log(data);
  } catch (error) {
    console.log(error.message);
  } finally {
    loading.value = false;
    router.push({ name: "students" });
  }
};
</script>
<template>
  <div
    class="mx-auto flex justify-start mt-2 w-full sm:w-1/2 sm:justify-center sm:items-center"
  >
    <form @submit.prevent="addStd()" class="flex flex-col w-full sm:justify-center">
      <div class="flex flex-col mb-1">
        <label for="name" class="mb-1">Name:</label>

        <input
          v-model="name"
          type="text"
          id="name"
          name="name"
          class="w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          required
        />
      </div>
      <div class="flex flex-col mb-1 sm:flex-row sm:justify-between sm:items-center">
        <div class="flex flex-col">
          <label for="email" class="mb-1">Email:</label>
          <input
            v-model="email"
            type="email"
            id="email"
            name="email"
            class="w-full sm:w-60 rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required
          />
        </div>

        <div class="flex flex-col mb-1">
          <label for="mobile" class="mb-1">Mobile:</label>
          <input
            v-model="mobile"
            type="text"
            id="mobile"
            name="mobile"
            class="w-full sm:w-60 rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required
          />
        </div>
      </div>

      <div class="flex flex-col mb-1">
        <label for="age" class="mb-1">Age:</label>
        <input
          v-model="age"
          type="text"
          id="age"
          name="age"
          class="w-full sm:w-60 rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          required
        />
      </div>
      <div class="flex flex-col mb-1">
        <label for="student_course" class="mb-1">Student Course:</label>
        <select
          v-model="course"
          id="student_course"
          name="student_course"
          class="w-full sm:w-60 rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          required
        >
          <option value="">Select Course</option>
          <option value="BSc">BSc</option>
          <option value="BA">BA</option>
          <option value="BCom">BCom</option>
        </select>
      </div>

      <div class="flex flex-col mb-1">
        <label for="year" class="mb-1">Year:</label>
        <input
          v-model="year"
          type="text"
          id="year"
          name="year"
          class="w-full sm:w-60 rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          required
        />
      </div>
      <div class="flex items-center mb-2">
        <label for="gender" class="mr-1"> Gender: </label>
        <input
          v-model="gender"
          type="radio"
          name="gender"
          id="gender"
          class="mx-1"
          value="Male"
        /><span class="mr-2">Male</span>
        <input
          v-model="gender"
          type="radio"
          name="gender"
          id="gender"
          class="mx-1"
          value="Female"
        />Female
      </div>
      <div class="flex justify-end">
        <button
          type="reset"
          class="flex w-[100px] mx-2 justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-gray-200 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
        >
          Reset
        </button>

        <button
          type="submit"
          class="flex w-[100px] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          disabled="loading"
        >
          Register
        </button>
      </div>
    </form>
  </div>
</template>
