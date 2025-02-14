// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import DashBoard from "../views/DashBoard.vue";
import User from '../views/user/index.vue'
import Info from '../views/info/index.vue'
import Select from '../views/select/index.vue'
import Test from '../views/test/index.vue'
import Store from '../views/store/index.vue'
import Details from '../views/info/details.vue'
import OutStore from '../views/store/outStore.vue'
import InStore from '../views/store/inStore.vue'
import { getToken } from "../utils/auth"; // 访问缓存的用户名

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
  },
  
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashBoard,
    meta: { requiresAuth: true },
    children: [
      {
        path: "info",
        name: "Info",
        component: Info,
        meta: { requiresAuth: true },
      },
      {
        path: "test",
        name: "Test",
        component: Test,
        meta: { requiresAuth: true },
      },
      {
        path: "store",
        name: "Store",
        component: Store,
        meta: { requiresAuth: true },
      },
      {
        path: "select",
        name: "Select",
        component: Select,
        meta: { requiresAuth: true },
      },
      {
        path: "user",
        name: "User",
        component: User,
        meta: { requiresAuth: true },
      },
      
      
    ],
  },

  {
    path: "/",
    redirect: "/dashboard",
  },

  {
    path: "/details",
    name: "Details",
    component: Details,
    meta: { requiresAuth: true },
  },
  {
    path: "/outstore",
    name: "OutStore",
    component: OutStore,
    meta: { requiresAuth: true },
  },
  {
    path: "/instore",
    name: "InStore",
    component: InStore,
    meta: { requiresAuth: true },
  },
  
 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 导航守卫
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!getToken(); // 根据缓存判断是否登录

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login"); // 未登录重定向到登录页
  } else {
    next(); // 允许访问
  }
});

export default router;
