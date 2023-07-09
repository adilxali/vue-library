import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { supabase } from "@/supabaseClient";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { requireAuth: true },

      children: [
        {
          path: "",
          name: "dashboard",
          component: () => import("../views/DashboardView.vue"),
        },
        {
          path: "books",
          name: "books",
          component: () => import("../views/BooksView.vue"),
          meta:[{booksData:[]}],
          beforeEnter: fetchBooksData,
        },

        {
          path: "addbook",
          name: "addbook",
          component: () => import("../views/AddBookView.vue"),
        },
        {
          path: "issuebook",
          name: "issuebook",
          component: () => import("../views/IssueBook.vue"),
        },
        {
          path: "students",
          name: "students",
          component: () => import("../views/StudentsView.vue"),
          meta:[{studentsData:[]}],
          beforeEnter: fetchStudentsData,
        },
        {
          path: "regstd",
          name: "registerstudent",
          component: () => import("../views/RegisterStudent.vue"),
        },
        {
          path: "transactions",
          name: "transactions",
          component: () => import("../views/TransactionView.vue"),
          meta: {
            transactionsData: [],
            requireAuth: true,
            title: "Transactions",
            name: "Transaction",
          },
          beforeEnter: fetchTransactionsData,
         
        },
      ],
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: () => import("@/components/NotFound.vue"),
    },
    {
      path: "/404/:resource",
      name: "404-resource",
      component: () => import("@/components/NotFound.vue"),
    },
    {
      path: "/newtwork-error",
      name: "network-error",
      component: () => import("@/views/NetworkError.vue"),
    },
    //
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      meta: { title: "Login" },
    },
    
  ],
  linkActiveClass: "active",
  linkExactActiveClass: "active",
});
async function fetchBooksData(to, from, next) {
  try {
    NProgress.start();
    const { data, error } = await supabase
    .from("books")
    .select()
    .order("book_id", { ascending: true });
    if (error) throw error;
    to.meta.booksData = data;
    next();
    
  } catch (error) {
    console.log(error);
    next({ name: "network-error" });
  } finally {
    NProgress.done();
  }
};

async function fetchStudentsData(to, from, next) {
  try {
    NProgress.start();
    const { data, error } = await supabase

      .from("students")
      .select()
      .order("student_id", { ascending: true });
    if (error) throw error;
    to.meta.studentsData = data;
    
    next();
  } catch (error) {
    console.log(error);
    next({ name: "network-error" });
  } finally {
    NProgress.done();
  }
};

async function fetchTransactionsData(to, from, next) {
  try {
    NProgress.start();
    const { data, error } = await supabase
      .from("transaction")
      .select(`*, students:student_id(name, course),books:book_id(title, author)`)
      .order("transaction_id", { ascending: true });
    if (error) throw error;
    to.meta.transactionsData = data;
    next();
  } catch (error) {
    console.log(error);
    
    next({ name: "network-error" });
    console.log(error);
  } finally {
    NProgress.done();
  }
};


router.beforeEach((to, from, next) => {
  const isAuthenticated = JSON.parse(localStorage.getItem("token"));
NProgress.start();
  if (to.name !== "login" && !isAuthenticated) {
    next({ name: "login" });
  } else if (to.name !== "home" && isAuthenticated) {
    document.title = to.name;
    next();
    NProgress.done();
  } else 
  next();
  NProgress.done();
});

export default router;
