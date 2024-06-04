import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/country",
    name: "base content",
    component: () => import("@/pages/baseView.vue"),
    alias: "/",
  },
  {
    path: "/country/:id",
    props: true,
    component: () => import("@/components/views/countryView.vue"),
    // props: true,
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  // history: createWebHistory(),
  routes,
});
export default router;
