import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "base content",
    component: () => import("@/pages/baseView.vue"),
    // alias: process.env.BASE_URL,
  },
  {
    path: "/country/:id",
    props: true,
    component: () => import("@/components/views/countryView.vue"),
  },
  {
    path: "",
    component: () => import("@/pages/baseView.vue"),
  },
];
// console.log(process.env);
const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes,
});
export default router;
