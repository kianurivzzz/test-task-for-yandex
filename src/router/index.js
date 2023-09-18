import { createRouter, createWebHistory } from "vue-router";

const routes = [
  // Common pages
  {
    path: "/",
    component: () => import("@/components/DefaultLayout.vue"),
    children: [
      {
        path: "/",
        name: "About",
        component: () => import("@/views/About.vue"),
      },
      {
        path: "/task",
        name: "Task",
        component: () => import("@/views/Task.vue"),
      },
      {
        path: "/:pathMatch(.*)*",
        name: "notFound",
        component: () => import("@/views/NotFound.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
