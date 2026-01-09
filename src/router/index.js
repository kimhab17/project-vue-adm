import Login from "@/authentication/Login.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import ArticleCreateVue from "@/views/article/ArticleCreateVue.vue";
import ArticleListView from "@/views/article/ArticleListView.vue";
import DashboardView from "@/views/DashboardView.vue";
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import ArticlePreviewView from "@/views/article/ArticlePreviewView.vue";
import ArticleEdit from "@/views/article/ArticleEdit.vue";
import CategoryView from "@/views/category/CategoryView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import ForbddenView from "@/views/ForbddenView.vue";
import ACreatorView from "@/views/profile/aCreatorView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: DashboardLayout,
      children: [
        {
          path: "",
          name: "dashboard",
          component: DashboardView,
          meta: { title: "Dashboard" },
        },
        {
          path: "article",
          name: "article",
          children: [
            {
              path: "",
              name: "article.index",
              component: ArticleListView,
              meta: { title: "Aricle-List" },
            },
            {
              path: "create",
              name: "article.create",
              component: ArticleCreateVue,
              meta: { title: "Aricle-Create" },
            },
            {
              path: ":id",
              name: "article.detail",
              component: ArticlePreviewView,
              meta: { title: "Article-detail" },
            },
            {
              path: "edit/:id",
              name: "edit.article",
              component: ArticleEdit,
              meta: { title: "Edit-Article" },
            },
          ],
        },
        {
          path: "category",
          name: "category",
          component: CategoryView,
          meta: { title: "Category" },
        },
        {
          path: "creator/:id",
          name: "creator",
          component: ACreatorView,
          meta: { title: "Creator" },
        },
      ],
      linkActiveClass: "active btn btn-primary text-light",
    },
    {
      path: "/login",
      component: Login,
      name: "login",
      meta: { title: "Login" },
    },
    { path: "/:pathMatch(.*)*", component: NotFoundView },
    ,
    {
      path: "/403",
      name: "page.403",
      component: ForbddenView,
      meta: { title: "403 Forbidden" },
    },
  ],
});

router.beforeEach(async (to) => {
  // console.log("to", to.name);
  const authStore = useAuthStore();
  document.title = to.meta.title ? to.meta.title + " - My Admin" : "My Admin";

  // protech (ka pea pel ke vai rout derect)
  if (authStore.token && !authStore.user) {
    try {
      await authStore.fetchProfile();
    } catch (e) {
      authStore.logout();
      return { name: "login" };
    }
  }

  // protech pii login kom oy vai rout tv dashboard trov ka login sen
  if (!authStore.isAuthenticate && to.name !== "login") {
    return { name: "login" };
  }

  // keapea when yg have token and profile ot oy ke vai rout to login
  if (authStore.isAuthenticate && to.name === "login") {
    // alert();
    return { name: "dashboard" };
  }
  return true;
});

export default router;
