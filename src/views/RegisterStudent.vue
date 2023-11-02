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
const loading = ref(false);
const years = ref([2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029]);
//create student id based on the course and year
const createStudentId = () => {
  const courseCode = course.value.toUpperCase();
  const yearCode = year.value.toString().slice(2, 4);
  const randomCode = Math.floor(Math.random() * 100);
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
    alert("Student Added Successfully");
    loading.value = false;
    router.push({ name: "students" });
  }
};
</script>
<template>
  <div
    class="sm:mx-auto flex justify-start mt-2 w-7xl mx-10 sm:w-1/2 sm:justify-center sm:items-center"
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
          <option value="BBA">BBA</option>
          <option value="BCA">BCA</option>
          <option value="BCom">BCom</option>
          <option value="MCom">MCom</option>
        </select>
      </div>

      <div class="flex flex-col mb-1">
        <label for="year" class="mb-1">Year:</label>

        <select
          name="year"
          id="year"
          v-model="year"
          class="w-full sm:w-60 rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <!-- loop till 2030 from 2020 -->
          <option value="">Select Year</option>
          <option v-for="i in 10" :key="i" :value="i + 2020">{{ i + 2020 }}</option>
        </select>
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
          :disabled="loading"
        >
          <span v-if="loading"
            ><svg
              aria-hidden="true"
              class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              /></svg
          ></span>
          <span v-else>Register</span>
        </button>
      </div>
    </form>
  </div>
</template>
